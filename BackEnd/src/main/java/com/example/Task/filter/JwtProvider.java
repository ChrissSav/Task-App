package com.example.Task.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Task.exceptions.ConflictException;
import com.example.Task.exceptions.ExceptionCodes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class JwtProvider {


    @Value("${JWT_ACCESS_EXPIRATION_TIME}")
    private int accessTokenExpiration;
    @Value("${JWT_REFRESH_EXPIRATION_TIME}")
    private int refreshTokenExpiration;
    @Value("${JWT_ACCESS_TOKEN_SECRET}")
    private String accessTokenSecret;
    @Value("${JWT_REFRESH_TOKEN_SECRET}")
    private String refreshTokenSecret;


    public String generateRefreshToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(refreshTokenSecret.getBytes());
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(Date.from(Instant.now().plusSeconds(refreshTokenExpiration)))
                .sign(algorithm);
    }

    public String generateAccessToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(accessTokenSecret.getBytes());
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(Date.from(Instant.now().plusSeconds(accessTokenExpiration)))
                .sign(algorithm);
    }


    public String verifyRefreshTokenReturnEmail(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(refreshTokenSecret.getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getSubject();
        }catch (Exception ex){
            throw new ConflictException(ExceptionCodes.REFRESH_TOKEN_NOT_VALID);
        }
    }

    public String verifyAccessTokenReturnEmail(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(accessTokenSecret.getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getSubject();
        }catch (Exception ex){
            throw new ConflictException(ExceptionCodes.REFRESH_TOKEN_NOT_VALID);
        }
    }
}
