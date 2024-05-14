const url = "https://api.escuelajs.co/api/v1/products";
const URL2 = "https://fakestoreapi.com/products";
const secaoLivros = document.querySelector("#livros");
async function buscar()
{
    try 
    {
        const requisicao = await fetch(URL2);
        const produtos = await requisicao.json();
        
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
const obj = {imagem: ["1","2"], nome: "Rafa"}
if(obj.hasOwnProperty("nome")) console.log("tem a propriedade:", obj.nome);
buscar();