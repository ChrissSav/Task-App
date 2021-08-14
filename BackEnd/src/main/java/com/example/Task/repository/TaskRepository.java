package com.example.Task.repository;

import com.example.Task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, String> {

    List<Task> findByCreatorId(String creatorId);

    Optional<Task> findByIdAndCreatorId(String id, String creatorId);

    Long deleteByIdAndCreatorId(String id, String creatorId);

}
