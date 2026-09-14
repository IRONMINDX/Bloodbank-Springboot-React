package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository);
    }

    @Test
    void signupCreatesUser() {
        UserRequest request = validRequest();
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);

        UserResponse response = userService.signup(request);

        assertEquals("Signup successful", response.getMessage());
        assertEquals(request.getEmail(), response.getEmail());
        verify(userRepository).save(org.mockito.ArgumentMatchers.any(User.class));
    }

    @Test
    void signupRejectsDuplicateEmail() {
        UserRequest request = validRequest();
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        assertThrows(DuplicateEmailException.class, () -> userService.signup(request));
    }

    @Test
    void loginReturnsSuccessForCorrectCredentials() {
        UserRequest request = validRequest();
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));

        UserResponse response = userService.login(request);

        assertEquals("Login successful", response.getMessage());
        assertEquals(request.getEmail(), response.getEmail());
    }

    @Test
    void loginRejectsIncorrectPassword() {
        UserRequest request = validRequest();
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword("different-password");
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));

        assertThrows(InvalidCredentialsException.class, () -> userService.login(request));
    }

    private UserRequest validRequest() {
        UserRequest request = new UserRequest();
        request.setEmail("user@example.com");
        request.setPassword("password123");
        return request;
    }
}
