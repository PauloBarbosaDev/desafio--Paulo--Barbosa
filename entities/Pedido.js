class Pedido {
  #listaDeitens;

  constructor(listaDeitens) {
    this.listaDeitens = listaDeitens;
  }

  somaTotal() {
    const soma = this.listaDeitens.reduce(
      (total, valorAtual) =>
        total.produto.valor * total.quantidade +
        valorAtual.produto.valor * valorAtual.quantidade
    );
    return soma;
  }

  pagamentoComDesconto(formaDePagamento) {
    const msg = this.validaItens();
    //Valida itens
    if (typeof msg === 'string' && msg !== '') return msg;

    const VALOR_PORCENTAGEM = 5;
    const valorDesconto = (VALOR_PORCENTAGEM / 100) * this.somaTotal();
    const calculoPorcentagem = this.somaTotal() - valorDesconto;
    return formaDePagamento === 'dinheiro'
      ? `R$ ${calculoPorcentagem.toFixed(2).replace('.', ',')}`
      : `R$ ${this.somaTotal().toFixed(2).replace('.', ',')}`;
  }

  pagamentoComAcrescimo(formaDePagamento) {
    const msg = this.validaItens();
    //Valida itens
    if (typeof msg === 'string' && msg !== '') return msg;
    const VALOR_PORCENTAGEM = 3;
    const valorDesconto = (VALOR_PORCENTAGEM / 100) * this.somaTotal();
    const calculoPorcentagem = this.somaTotal() + valorDesconto;
    return formaDePagamento === 'credito'
      ? `R$ ${calculoPorcentagem.toFixed(2).replace('.', ',')}`
      : this.somaTotal().toFixed(2).replace('.', ',');
  }

  verificaItemExtra() {
    const itens = this.listaDeitens.filter(
      valor => valor.produto.descricao.includes('extra') === false
    );

    const itensExtra = this.listaDeitens.filter(valor =>
      valor.produto.descricao.includes('extra')
    );

    const itensCombos = this.listaDeitens.filter(valor =>
      valor.produto.codigo.includes('combo')
    );

    if (
      (itensExtra.length > 0 && itensCombos.length > 0) ||
      (itensExtra.length > 0 && itens.length <= 0)
    ) {
      return true;
    }
    return false;
  }

  verificaCarrinhoVazio() {
    return this.listaDeitens.length === 0;
  }

  verificaItem() {
    return this.listaDeitens.some(
      valor => valor.produto.codigo === '' || valor.produto.codigo === undefined
    );
  }

  validaItens() {
    if (this.verificaItemExtra()) {
      return 'Item extra não pode ser pedido sem o principal';
    } else if (this.verificaCarrinhoVazio()) {
      return `Não há itens no carrinho de compra!`;
    } else if (this.verificaItem()) {
      return `Item inválido!`;
    }
    return '';
  }
}

export { Pedido };
