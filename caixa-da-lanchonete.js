import { Produto } from './entities/Produto.js';
import { ItensPedido } from './entities/ItensPedido.js';
import { Pedido } from './entities/Pedido.js';

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (metodoDePagamento === '' || metodoDePagamento === undefined) {
      return console.log('Forma de pagamento inválida!');
    } else if (itens.listaDeitens.length === 0) {
      return console.log(`Quantidade inválida!`);
    } else {
      if (metodoDePagamento === 'dinheiro') {
        return console.log(itens.pagamentoComDesconto(metodoDePagamento));
      } else if (metodoDePagamento === 'credito') {
        return console.log(itens.pagamentoComAcrescimo(metodoDePagamento));
      } else if (metodoDePagamento === 'debito') {
        return console.log(
          `R$ ${itens.somaTotal().toFixed(2).replace('.', ',')}`
        );
      }
    }
  }
}

//Formas de pagamento
const formasDePagamento = ['dinheiro', 'debito', 'credito'];
const metodoDePagamento = formasDePagamento[2]; // Valor maior que 2 dará erro de pagamento
//Cria os produtos
const cafe = new Produto('cafe', 'Café ', 3.0);
const chantily = new Produto('chantily', 'Chantily (extra do Café)', 1.5);
const suco = new Produto('suco', 'Suco Natural ', 6.2);
const sanduiche = new Produto('sanduiche', 'Sanduíche', 6.5);
const queijo = new Produto('queijo', 'Queijo (extra do Sanduíche)', 2);
const salgado = new Produto('salgado', 'Salgado', 1.5);
const combo1 = new Produto('combo1', '1 Suco e 1 Sanduíche', 9.5);
const combo2 = new Produto('combo2', '1 Café e 1 Sanduíche', 7.5);
//Cria os itens do pedido
const item = new ItensPedido(cafe, 1);
const item2 = new ItensPedido(chantily, 1);
//Cria o pedido
const itens = new Pedido([item, item2]);
//Chama método da classe
new CaixaDaLanchonete().calcularValorDaCompra(metodoDePagamento, itens);

export { CaixaDaLanchonete };
