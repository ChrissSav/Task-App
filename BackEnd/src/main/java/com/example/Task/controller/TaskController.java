package com.example.Task.controller;


import com.example.Task.dto.BaseResponse;
import com.example.Task.dto.task.AddTaskRequest;
import com.example.Task.dto.task.TaskResponse;
import com.example.Task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;


    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public BaseResponse<TaskResponse> registerTask(@Valid @RequestBody AddTaskRequest addTaskRequest) {
        TaskResponse task = taskService.addTaskToUser(addTaskRequest);
        BaseResponse<TaskResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(task);
        return baseResponse;
    }

    @GetMapping("")
    public BaseResponse<List<TaskResponse>> usersTasks() {
        List<TaskResponse> tasks = taskService.usersTasks();
        BaseResponse<List<TaskResponse>> baseResponse = new BaseResponse<>();
        baseResponse.setData(tasks);
        return baseResponse;
    }


    @PutMapping("")
    public BaseResponse<TaskResponse> updateTask(@Valid @RequestParam("task_id") String taskId,
                                                 @Valid @RequestParam("reminder") boolean reminder) {
        TaskResponse task = taskService.updateTask(taskId, reminder);
        BaseResponse<TaskResponse> baseResponse = new BaseResponse<>();
        baseResponse.setData(task);
        return baseResponse;
    }

    @DeleteMapping("/{task_id}")
    public BaseResponse<String> deleteTask(@Valid @PathVariable("task_id") String taskId) {
        taskService.deleteTask(taskId);
        BaseResponse<String> baseResponse = new BaseResponse<>();
        baseResponse.setData("success deletion");
        return baseResponse;
    }
}
