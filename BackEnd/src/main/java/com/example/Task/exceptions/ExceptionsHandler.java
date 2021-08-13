package com.example.Task.exceptions;

import com.example.Task.dto.BaseResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
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
public class ExceptionsHandler {

    Logger log = LogManager.getLogger(ExceptionsHandler.class);

    @ExceptionHandler(value = {ConflictException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public BaseResponse<Object> handleApiException(ConflictException conflictException) {
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(conflictException.getCustomMsg());
        return baseResponse;
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        log.error(ex);
        FieldError fieldError = ex.getBindingResult().getFieldError();
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(ExceptionCodes.NOT_VALID_PAYLOAD);
        if (fieldError != null)
            baseResponse.setError(fieldError.getField() + ", " + fieldError.getDefaultMessage());
        return baseResponse;

    }


    @ExceptionHandler(value = {HttpMessageNotReadableException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMethodArgumentNotValid(HttpMessageNotReadableException ex) {
        log.error(ex);
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(ExceptionCodes.NOT_VALID_PAYLOAD + ", HttpMessageNotReadableException");
        return baseResponse;
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleConstraintViolationExceptions(ConstraintViolationException ex) {
        log.error(ex);
        String exceptionResponse = String.format("Invalid input parameters: %s", ex.getMessage());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(exceptionResponse);
        return baseResponse;
    }

    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        log.error(ex);
        String exception = String.format("%s, invalid input parameter", ex.getName());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(exception);
        return baseResponse;

    }


    @ExceptionHandler(value = {MissingServletRequestParameterException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public BaseResponse<Object> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        log.error(ex);
        String exception = String.format("%s, invalid input parameter", ex.getParameterName());
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(exception);
        return baseResponse;

    }

    @ExceptionHandler(value = {BadCredentialsException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    public BaseResponse<Object> handleBadCredentialsException(BadCredentialsException ex) {
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(ExceptionCodes.AUTH_LOGIN_WRONG_FIELDS);
        return baseResponse;

    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public BaseResponse<Object> handle(HttpRequestMethodNotSupportedException ex) {
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(ExceptionCodes.HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION + " Method: " + ex.getMethod());
        return baseResponse;
    }


    @ExceptionHandler(Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public BaseResponse<Object> handle(Exception ex, HttpServletRequest request, HttpServletResponse response) {
        log.error(ex);
        BaseResponse<Object> baseResponse = new BaseResponse<>(false);
        baseResponse.setError(ExceptionCodes.SOMETHING_WRONG);
        return baseResponse;
    }


}
