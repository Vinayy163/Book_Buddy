package com.bookbuddy.bookbuddy.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookbuddy.bookbuddy.service.BookService;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService service;

    @GetMapping
    public List<Map<String, Object>> getBooks() {
        return service.getAllBooks();
    }
}
