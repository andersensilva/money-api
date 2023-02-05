package com.example.com.api.model;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import javax.annotation.Generated;
import java.math.BigDecimal;
import java.time.LocalDate;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Lancamento.class)
public abstract class Lancamento_ {

    public static volatile SingularAttribute<Lancamento, Long> codigo;
    public static volatile SingularAttribute<Lancamento, String> observacao;
    public static volatile SingularAttribute<Lancamento, TipoLancamento> tipo;
    public static volatile SingularAttribute<Lancamento, LocalDate> dataPagamento;
    public static volatile SingularAttribute<Lancamento, Pessoa> pessoa;
    public static volatile SingularAttribute<Lancamento, LocalDate> dataVencimento;
    public static volatile SingularAttribute<Lancamento, Categoria> categoria;
    public static volatile SingularAttribute<Lancamento, BigDecimal> valor;
    public static volatile SingularAttribute<Lancamento, String> descricao;

}
