
const URL2 = "https://fakestoreapi.com/products";
const secaoLivros = document.querySelector("#livros");
const BotoesDeFiltro = document.querySelectorAll(".nav>li>button");
const inputDePesquisa = document.querySelector(".banner__pesquisa");
let produtos = [];
async function buscar()
{
    try 
    {
        const requisicao = await fetch(URL2);
        produtos = await requisicao.json();
        
        exibirProdutos(produtos);
    }
    catch(erro)
    {
        console.log("Erro ao carregar produtos:",erro);
    }
}

function exibirProdutos(produtos)
{   
  let maximoDeCaracteres = 300;
  secaoLivros.innerHTML = "";
  produtos.forEach(produto =>
  {   
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
      <button class="livro__botao">Adicionar ao carrinho de compras</button>
      
    </div>
      `;
  });
}

function filtrar()
{
  const id = this.id;
  const categoria =  this.value;
  filtrarPorCategoria(categoria);
  categoria == "disponivel" ? 
    filtrarPorQuantidade() : id == "btnOrdenarPorPreco" ? 
      ordenarPorPreco() : id == "btnTodos" ? 
        exibirProdutos(produtos) : filtrarPorCategoria(categoria);
}

function filtrarPorCategoria(categoria)
{
  const produtosDaCategoria = produtos.filter(produto => produto.category == categoria);
  exibirProdutos(produtosDaCategoria);
}

function filtrarPorQuantidade()
{
    const disponiveis = produtos.filter(produto => produto.count > 0);
    console.log(disponiveis)
    exibirProdutos(disponiveis);
}

function ordenarPorPreco()
{
  
  const produtosOrdenados = [...produtos].sort((a, b) => a.price - b.price);
  exibirProdutos(produtosOrdenados);
}

function filtrarNome(evento)
{
  const valorBarraPesquisa = inputDePesquisa.value.toLowerCase();
  const produtosParaFiltrar = document.querySelectorAll(".livro");
  produtosParaFiltrar.forEach(produto => 
    {
      const tituloDoProduto = produto.querySelector(".livro__titulo").textContent.toLowerCase();
      console.log(tituloDoProduto)
      produto.style.display = 
        tituloDoProduto.includes(valorBarraPesquisa) || valorBarraPesquisa == "" ?
          "flex" : "none";
    }
  )
}

buscar();

inputDePesquisa.addEventListener("input", filtrarNome);

BotoesDeFiltro.forEach(botao =>
  {
    botao.addEventListener("click", filtrar)
  }
);