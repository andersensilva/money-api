package com.example.com.api.dto;

import com.example.com.api.model.Pessoa;
import com.example.com.api.model.TipoLancamento;

import java.math.BigDecimal;

public class LancamentoEstatisticaPessoa {

    private TipoLancamento tipo;

    private Pessoa pessoa;

    private BigDecimal total;

    public LancamentoEstatisticaPessoa(TipoLancamento tipo, Pessoa pessoa, BigDecimal total) {
        this.tipo = tipo;
        this.pessoa = pessoa;
        this.total = total;
    }

}
