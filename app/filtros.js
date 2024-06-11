import { exibicao } from "./exibir.js";
import { conectaAPI } from "./conectaAPI.js";
const BotoesDeFiltro = document.querySelectorAll(".nav>li>button");
const inputDePesquisa = document.querySelector(".banner__pesquisa");
const produtos = await conectaAPI.buscar();

function filtrarNome() {
    const valorBarraPesquisa = inputDePesquisa.value.toLowerCase();
    const produtosParaFiltrar = Array.from(document.querySelectorAll(".livro"));
    let paraSomar = [];
    produtosParaFiltrar.forEach(produto => {
      const tituloDoProduto = produto.querySelector(".livro__titulo").textContent.toLowerCase();
      produto.style.display = tituloDoProduto.includes(valorBarraPesquisa) || valorBarraPesquisa == "" ?
        "flex" : "none";
  
      if (produto.style.display == "flex") {
        const preco =
        {
          price: Number(produto.querySelector(".livro__preco").textContent)
        };
        paraSomar.push(preco);
      }
    }
    );
    exibicao.somaDosValores(paraSomar);
  }

  function filtrar() {
    const id = this.id;
    const categoria = this.value;
    filtrarPorCategoria(categoria);
    categoria == "disponivel" ?
      filtrarPorQuantidade() : id == "btnOrdenarPorPreco" ?
        ordenarPorPreco() : id == "btnTodos" ?
          exibicao.exibirProdutos(produtos) : filtrarPorCategoria(categoria);
  }

 async function filtrarPorCategoria(categoria) {
    const produtosDaCategoria = produtos.filter(produto => produto.category == categoria);
    exibicao.exibirProdutos(produtosDaCategoria);
  }
  
  function filtrarPorQuantidade() {

    const disponiveis = produtos.filter(produto => produto.count > 0);
    exibirProdutos(disponiveis);
  }
  
  function ordenarPorPreco() {
  
    const produtosOrdenados = [...produtos].sort((a, b) => a.price - b.price);
    exibicao.exibirProdutos(produtosOrdenados);
  }

  function adicionarOuvintes()
  {
    BotoesDeFiltro.forEach(
      botao => 
      {
          botao.addEventListener("click", filtrar);
      }
    );
    inputDePesquisa.addEventListener("input", filtrarNome);
  }

  

  export const filtragem = {adicionarOuvintes}