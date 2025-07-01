package com.bookbuddy.bookbuddy.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private JdbcTemplate jdbc;

    public List<Map<String, Object>> getAllBooks() {
    return jdbc.queryForList("SELECT id, title, author, genre, cover_url, download_url FROM books");
    }
}
