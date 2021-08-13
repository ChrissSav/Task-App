package com.example.Task.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponse<T> {

    private String status = "success";
    private T data = null;
    private String error = null;

    public BaseResponse(boolean status) {
        setStatus(status);
    }

    public void setStatus(boolean status) {
        this.status = status ? "success" : "error";
    }

}