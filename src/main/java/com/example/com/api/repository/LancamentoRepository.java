package com.example.com.api.repository;

import com.example.com.api.model.Lancamento;
import com.example.com.api.repository.lacamento.LancamentoRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery {
}
