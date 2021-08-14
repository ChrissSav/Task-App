package com.example.Task.mapper;


import com.example.Task.dto.task.TaskResponse;
import com.example.Task.model.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskResponse mapToTaskResponse(Task task);

}
