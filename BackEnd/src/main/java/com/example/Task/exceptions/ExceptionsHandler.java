package com.example.Task.exceptions;

import com.example.Task.dto.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;


@ControllerAdvice
@Slf4j
public class ExceptionsHandler {

    @ExceptionHandler(value = {ConflictException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public BaseResponse<Object> handleApiException(HttpServletRequest request, ConflictException conflictException) {
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(getExceptionMessage(conflictException.getExceptionCode(), request));
        return baseResponse;
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpServletRequest request) {
        log.error(ex.getMessage());
        FieldError fieldError = ex.getBindingResult().getFieldError();
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(getExceptionMessage(ExceptionCodes.NOT_VALID_PAYLOAD, request));
        if (fieldError != null)
            baseResponse.setError(fieldError.getField() + ", " + fieldError.getDefaultMessage());
        return baseResponse;

    }


    @ExceptionHandler(value = {HttpMessageNotReadableException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMethodArgumentNotValid(HttpMessageNotReadableException ex, HttpServletRequest request) {
        log.error(ex.getMessage());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(getExceptionMessage(ExceptionCodes.NOT_VALID_PAYLOAD, request));
        return baseResponse;
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleConstraintViolationExceptions(ConstraintViolationException ex) {
        log.error(ex.getMessage());
        String exceptionResponse = String.format("Invalid input parameters: %s", ex.getMessage());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(exceptionResponse);
        return baseResponse;
    }

    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        log.error(ex.getMessage());
        String exception = String.format("%s, invalid input parameter", ex.getName());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(exception);
        return baseResponse;

    }


    @ExceptionHandler(value = {MissingServletRequestParameterException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        log.error(ex.getMessage());
        String exception = String.format("%s, invalid input parameter", ex.getParameterName());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(exception);
        return baseResponse;

    }

    @ExceptionHandler(value = {BadCredentialsException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public BaseResponse<Object> handleBadCredentialsException(BadCredentialsException ex, HttpServletRequest request) {
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(getExceptionMessage(ExceptionCodes.AUTH_LOGIN_WRONG_FIELDS, request));
        return baseResponse;

    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public BaseResponse<Object> handle(HttpRequestMethodNotSupportedException ex) {
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(ExceptionCodes.HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION.getEl() + " Method: " + ex.getMethod());
        return baseResponse;
    }


    @ExceptionHandler(Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public BaseResponse<Object> handle(Exception ex, HttpServletRequest request, HttpServletResponse response) {
        log.error(ex.getMessage());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(getExceptionMessage(ExceptionCodes.SOMETHING_WRONG, request));
        return baseResponse;
    }


    public static String getExceptionMessage(ExceptionCodes exceptionCode, HttpServletRequest request) {
        if ("el".equals(request.getHeader("language"))) {
            return exceptionCode.getEl();
        } else {
            return exceptionCode.getEn();
        }
    }

}
