package com.example.Task.service;


import com.example.Task.dto.task.AddTaskRequest;
import com.example.Task.dto.task.TaskResponse;
import com.example.Task.exceptions.ConflictException;
import com.example.Task.exceptions.ExceptionCodes;
import com.example.Task.mapper.TaskMapper;
import com.example.Task.model.Task;
import com.example.Task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final AuthService authService;
    private final TaskMapper taskMapper;


    public TaskResponse addTaskToUser(AddTaskRequest addTaskRequest) {
        //Check timestamp
        String time = addTaskRequest.getTimestamp().toString();
        if (time.length() != 10 && time.length() != 13)
            throw new ConflictException(ExceptionCodes.TIMESTAMP_INCORRECT);

        if (time.length() == 13)
            addTaskRequest.setTimestamp(addTaskRequest.getTimestamp() / 1000);

        Task newTask = new Task();
        newTask.setCreator(authService.getCurrentUser());
        newTask.setTimestamp(addTaskRequest.getTimestamp());
        newTask.setText(addTaskRequest.getText());
        newTask.setReminder(addTaskRequest.isReminder());
        return taskMapper.mapToTaskResponse(taskRepository.save(newTask));
    }


    public List<TaskResponse> usersTasks() {
        List<Task> tasks = taskRepository.findByCreatorId(authService.getCurrentUser().getId());
        return tasks.stream().map(taskMapper::mapToTaskResponse).collect(Collectors.toList());
    }

    @Transactional
    public void deleteTask(String taskId) {
        if (taskRepository.deleteByIdAndCreatorId(taskId, authService.getCurrentUser().getId()) == 0)
            throw new ConflictException(ExceptionCodes.TASK_NOT_FOUND);
    }
}
