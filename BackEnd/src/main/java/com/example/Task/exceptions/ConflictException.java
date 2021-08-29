package com.example.Task.exceptions;

import lombok.Data;

@Data
public class ConflictException extends RuntimeException {

    private String msg;
    private ExceptionCodes exceptionCode;

    public ConflictException() {
    }

    public ConflictException(ExceptionCodes exceptionCode) {
        this.exceptionCode = exceptionCode;
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
