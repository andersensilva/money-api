package com.example.com.api.repository.lacamento;

import com.example.com.api.dto.LancamentoEstatisticaCategoria;
import com.example.com.api.dto.LancamentoEstatisticaDia;
import com.example.com.api.dto.LancamentoEstatisticaPessoa;
import com.example.com.api.model.Lancamento;
import com.example.com.api.repository.filter.LancamentoFilter;
import com.example.com.api.repository.projection.ResumoLancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface LancamentoRepositoryQuery {

    public List<LancamentoEstatisticaCategoria> porCategoria(LocalDate mesReferencia);

    public List<LancamentoEstatisticaDia> porDia(LocalDate mesReferencia);

    public List<LancamentoEstatisticaPessoa> porPessoa(LocalDate inicio, LocalDate fim);

    public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);

    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);

}
