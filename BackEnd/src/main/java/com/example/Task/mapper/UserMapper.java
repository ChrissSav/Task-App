package com.example.Task.mapper;

import com.example.Task.dto.user.UserResponse;
import com.example.Task.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse mapToUserResponse(User user);
}
