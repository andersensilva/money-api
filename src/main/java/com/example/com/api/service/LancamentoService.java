package com.example.com.api.service;

import com.example.com.api.model.Lancamento;
import com.example.com.api.model.Pessoa;
import com.example.com.api.repository.LancamentoRepository;
import com.example.com.api.repository.PessoaRepository;
import com.example.com.api.service.exception.PessoaInexistenteOuInativaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LancamentoService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private LancamentoRepository lancamentoRepository;

    public Lancamento salva(Lancamento lancamento){
        Pessoa pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo()).get();
        if (pessoa == null || pessoa.isInativos()) {
            throw new PessoaInexistenteOuInativaException();
        }

        return lancamentoRepository.save(lancamento);
    }
}
