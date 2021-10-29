package com.example.Task.controller;


import com.example.Task.dto.BaseResponse;
import com.example.Task.dto.auth.*;
import com.example.Task.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/register")
    public BaseResponse<AuthenticationResponse> registerUser(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
        AuthenticationResponse user = authService.register(userRegisterRequest);
        BaseResponse<AuthenticationResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(user);
        return baseResponse;
    }

    @PostMapping("/login")
    public BaseResponse<AuthenticationResponse> saveUser(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        AuthenticationResponse user = authService.login(userLoginRequest);
        BaseResponse<AuthenticationResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(user);
        return baseResponse;
    }

    @PostMapping("/token-refresh")
    public BaseResponse<AccessRefreshTokenResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        AccessRefreshTokenResponse accessRefreshTokenResponse = authService.refreshToken(refreshTokenRequest.getRefreshToken());
        BaseResponse<AccessRefreshTokenResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(accessRefreshTokenResponse);
        return baseResponse;
    }
}
