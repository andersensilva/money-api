package com.example.com.api.service;

import com.example.com.api.model.Pessoa;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import com.example.com.api.repository.PessoaRepository;

import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public Pessoa atualizar(Pessoa pessoa, Long codigo){
        Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);

        BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo");
        return pessoaRepository.save(pessoaSalva);
    }

    public Pessoa atualizarAtivo(Long codigo, Boolean ativo){
        Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
        pessoaSalva.setAtivo(ativo);
        pessoaRepository.save(pessoaSalva);
        return pessoaSalva;
    }

    public Pessoa buscarPessoaPeloCodigo(Long codigo){
        Pessoa pessoaSalva = pessoaRepository.findById(codigo).get();
        if (pessoaSalva == null) {
            throw new EmptyResultDataAccessException(1);
        }
        return pessoaSalva;
    }
}
