import { conectaAPI } from "./conectaAPI.js";

const valorDeTodosOsProdutos = document.querySelector("#valor");
const secaoLivros = document.querySelector("#livros");

async function exibirProdutos(produtos) {
    let maximoDeCaracteres = 300;
    secaoLivros.innerHTML = "";
    produtos.forEach(produto => {
        secaoLivros.innerHTML +=
            `
      <div class="livro">
      <img class="livro__imagens" src="${produto.image}"
        alt="Capa do livro O Retorno do Cangaceiro JavaScript+" />
      <h2 class="livro__titulo">
        ${produto.title}
      </h2>
      <p class="livro__descricao">${produto.description.length > maximoDeCaracteres ?
                produto.description.substring(0, maximoDeCaracteres + 1) + "..." : produto.description}</p>
      <p class="livro__preco" id="preco">${produto.price}</p>
      <span class="tag">${produto.category}</span>
      <button class="livro__botao-adicionar-ao-carrinho">Adicionar ao carrinho de compras</button>
      
    </div>
      `;
    });
    somaDosValores(produtos);
}

function somaDosValores(produtos) {
    const acumulo = produtos.reduce((acumulador, produto) => { return acumulador + produto.price }, 0)
        .toFixed(2).replace(".", ",");
    valorDeTodosOsProdutos.innerHTML = acumulo;
}



export const exibicao = {somaDosValores, exibirProdutos};