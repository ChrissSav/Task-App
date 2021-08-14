package com.example.Task.repository;

import com.example.Task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String > {

    List<Task> findByCreatorId(String creatorId);

    Long deleteByIdAndCreatorId(String id,String creatorId);

}
