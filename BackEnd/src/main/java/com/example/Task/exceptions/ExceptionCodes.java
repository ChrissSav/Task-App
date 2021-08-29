package com.example.Task.exceptions;



public enum ExceptionCodes {
    NOT_VALID_PAYLOAD("NOT_VALID_PAYLOAD","NOT_VALID_PAYLOAD  el"),
    ACCESS_DENIED ( "The Token's Signature resulted invalid when verified","The Token's Signature resulted invalid when verified  el"),
    SOMETHING_WRONG ( "Whoops! Something went wrong.","Whoops! Something went wrong.  el"),
    HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION ( "HTTP Request Method Not Supported","HTTP Request Method Not Supported  el"),
    AUTH_LOGIN_WRONG_FIELDS ( "The email or password is incorrect","The email or password is incorrect   el"),
    REFRESH_TOKEN_NOT_VALID ( "REFRESH_TOKEN_NOT_VALID","REFRESH_TOKEN_NOT_VALID  el"),
    TIMESTAMP_INCORRECT ( "TIMESTAMP_INCORRECT","TIMESTAMP_INCORRECT  el"),
    TASK_NOT_FOUND ( "TASK_NOT_FOUND","TASK_NOT_FOUND  el"),
    EMAIL_ALREADY_EXIST ( "EMAIL_ALREADY_EXIST","EMAIL_ALREADY_EXIST  el");

    private final String en;
    private final String el;

    ExceptionCodes( String en,String el) {
        this.el = el;
        this.en = en;
    }

    public String getEn(){
        return en;
    }

    public String getEl(){
        return el;
    }
}
