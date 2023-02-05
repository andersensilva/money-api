package com.example.com.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.com.api.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
	
	

}
