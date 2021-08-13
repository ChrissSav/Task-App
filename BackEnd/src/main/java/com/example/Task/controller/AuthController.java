package com.example.Task.controller;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Task.dto.BaseResponse;
import com.example.Task.dto.auth.AuthenticationResponse;
import com.example.Task.dto.auth.UserLoginRequest;
import com.example.Task.dto.auth.UserRegisterRequest;
import com.example.Task.model.Task;
import com.example.Task.model.User;
import com.example.Task.service.AuthService;
import com.example.Task.service.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final UserDetailsServiceImpl userService;
    private final AuthService authService;


    @PostMapping("/register")
    public BaseResponse<AuthenticationResponse> registerUser(@Valid  @RequestBody UserRegisterRequest userRegisterRequest) {
        AuthenticationResponse user = authService.register(userRegisterRequest);
        BaseResponse<AuthenticationResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(user);
        return baseResponse;
    }

    @PostMapping("/login")
    public BaseResponse<AuthenticationResponse> saveUser(@Valid  @RequestBody UserLoginRequest userLoginRequest) {
        AuthenticationResponse user = authService.login(userLoginRequest);
        BaseResponse<AuthenticationResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(user);
        return baseResponse;
    }

  /*  @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);
                String access_token = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) // 10 minutes
                        .withIssuer(request.getRequestURL().toString())
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }*/
}
