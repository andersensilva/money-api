package com.example.com.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.com.api.model.Pessoa;
import org.springframework.data.jpa.repository.Query;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>  {

    public Page<Pessoa> findByNomeContaining(String nome, Pageable pageable);

}
