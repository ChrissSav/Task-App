package com.example.Task.repository;

import com.example.Task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String > {
}
