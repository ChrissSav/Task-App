package com.example.Task.dto.task;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddTaskRequest {
    @NotBlank
    @NotEmpty
    private String text;
    @NotNull
    private Long timestamp;
}
