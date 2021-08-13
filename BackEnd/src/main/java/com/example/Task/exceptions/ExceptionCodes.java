package com.example.Task.exceptions;


public abstract class ExceptionCodes {
    public static final String NOT_VALID_PAYLOAD ="Not valid payload";
    public static final String ACCESS_DENIED = "The Token's Signature resulted invalid when verified";
    public static final String SOMETHING_WRONG = "Whoops! Something went wrong.";
    public static final String HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION = "HTTP Request Method Not Supported";
    public static final String AUTH_LOGIN_WRONG_FIELDS = "The email or password is incorrect";
    public static final String REFRESH_TOKEN_NOT_VALID = "REFRESH_TOKEN_NOT_VALID";

}
