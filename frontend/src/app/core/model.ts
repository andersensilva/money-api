export class Pessoa{
  codigo: number;
  nome: string;
  ativo = true;
  endereco= new Endereco();
}

export class Categoria{
  codigo: number;
  nome: string;
}


export class Lancamento{
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa= new Pessoa();
  categoria= new Categoria();
}

export class Endereco{
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: number;
  cidade: string;
  estado: string;
}
