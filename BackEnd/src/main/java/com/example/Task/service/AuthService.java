package com.example.Task.service;


import com.example.Task.dto.auth.AccessRefreshTokenResponse;
import com.example.Task.dto.auth.AuthenticationResponse;
import com.example.Task.dto.auth.UserLoginRequest;
import com.example.Task.dto.auth.UserRegisterRequest;
import com.example.Task.exceptions.ConflictException;
import com.example.Task.exceptions.ExceptionCodes;
import com.example.Task.filter.JwtProvider;
import com.example.Task.mapper.UserMapper;
import com.example.Task.model.User;
import com.example.Task.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final JwtProvider jwtProvider;


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
                .accessToken(jwtProvider.generateAccessToken(user.getEmail()))
                .refreshToken(jwtProvider.generateRefreshToken(user.getEmail()))
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
                .accessToken(jwtProvider.generateAccessToken(currentUser.getEmail()))
                .accountInfo(userMapper.mapToUserResponse(currentUser))
                .refreshToken(jwtProvider.generateRefreshToken(currentUser.getEmail()))
                .build();
    }


    public AccessRefreshTokenResponse refreshToken(String refreshToken) {
        if (refreshToken.length() > 0) {
            try {
                String email = jwtProvider.verifyRefreshTokenReturnEmail(refreshToken);
                User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User name not found - " + email));
                AccessRefreshTokenResponse accessRefreshTokenResponse = new AccessRefreshTokenResponse();
                accessRefreshTokenResponse.setAccessToken(jwtProvider.generateAccessToken(user.getEmail()));
                accessRefreshTokenResponse.setRefreshToken(refreshToken);
                return accessRefreshTokenResponse;
            } catch (Exception exception) {
                throw new ConflictException(ExceptionCodes.REFRESH_TOKEN_NOT_VALID);
            }
        } else {
            throw new ConflictException(ExceptionCodes.REFRESH_TOKEN_NOT_VALID);
        }
    }



    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
