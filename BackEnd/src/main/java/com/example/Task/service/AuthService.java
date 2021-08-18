package com.example.Task.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Task.dto.auth.AccessRefreshTokenResponse;
import com.example.Task.dto.auth.AuthenticationResponse;
import com.example.Task.dto.auth.UserLoginRequest;
import com.example.Task.dto.auth.UserRegisterRequest;
import com.example.Task.exceptions.ConflictException;
import com.example.Task.exceptions.ExceptionCodes;
import com.example.Task.mapper.UserMapper;
import com.example.Task.model.User;
import com.example.Task.repository.UserRepository;
import com.example.Task.util.Statics;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public AuthenticationResponse register(UserRegisterRequest registerRequest) {

        Optional<User> userOptional = userRepository.findByEmail(registerRequest.getEmail());

        if (userOptional.isPresent()) {
            throw new ConflictException(ExceptionCodes.EMAIL_ALREADY_EXIST);
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user = userRepository.save(user);

        return AuthenticationResponse.builder()
                .accessToken(generateAccessToken(user.getEmail()))
                .refreshToken(generateRefreshToken(user.getEmail()))
                .accountInfo(userMapper.mapToUserResponse(user))
                .build();
    }


    public AuthenticationResponse login(UserLoginRequest loginRequest) {
        Authentication authentication = authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User currentUser = getCurrentUser();
        return AuthenticationResponse.builder()
                .accessToken(generateAccessToken(currentUser.getEmail()))
                .accountInfo(userMapper.mapToUserResponse(currentUser))
                .refreshToken(generateRefreshToken(currentUser.getEmail()))
                .build();
    }


    public AccessRefreshTokenResponse refreshToken(String refreshTokenRequest) {
        if (refreshTokenRequest.length() > 0) {
            try {
                Algorithm algorithm = Algorithm.HMAC256(Statics.REFRESH_TOKEN_SECRET.getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshTokenRequest);
                String email = decodedJWT.getSubject();
                User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User name not found - " + email));
                AccessRefreshTokenResponse accessRefreshTokenResponse = new AccessRefreshTokenResponse();
                accessRefreshTokenResponse.setAccessToken(generateAccessToken(user.getEmail()));
                accessRefreshTokenResponse.setRefreshToken(refreshTokenRequest);
                return accessRefreshTokenResponse;
            } catch (Exception exception) {
                throw new ConflictException(ExceptionCodes.REFRESH_TOKEN_NOT_VALID);
            }
        } else {
            throw new ConflictException(ExceptionCodes.REFRESH_TOKEN_NOT_VALID);
        }
    }

    public String generateRefreshToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(Statics.REFRESH_TOKEN_SECRET.getBytes());
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000)) // 30 minutes
                .sign(algorithm);
    }

    public String generateAccessToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(Statics.ACCESS_TOKEN_SECRET.getBytes());
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) // 10 minutes
                .sign(algorithm);
    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
