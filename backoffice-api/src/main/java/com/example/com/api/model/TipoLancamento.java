package com.example.com.api.model;

public enum TipoLancamento {
    RECEITA("Receita"),
    DESPESA("Despesa")

    ;

    private final String descicao;

    TipoLancamento(String descicao){
        this.descicao = descicao;
    }

    public String getDescicao(){
        return descicao;
    }
}
