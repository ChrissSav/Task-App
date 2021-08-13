package com.example.Task.exceptions;

public class ConflictException extends RuntimeException {

    private String msg;

    public ConflictException() {
    }

    public String getCustomMsg() {
        return msg;
    }

    public ConflictException(ExceptionCodes exceptionCodes) {
        this.msg = exceptionCodes.toString();
    }

    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(String message, Throwable cause) {
        super(message, cause);
    }

    public ConflictException(Throwable cause) {
        super(cause);
    }

    public ConflictException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
