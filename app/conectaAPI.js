
const url = "https://fakestoreapi.com/products";
async function buscar() {
  try {
    const requisicao = await fetch(url);
    const produtos = await requisicao.json();

    return produtos;
  }
  catch (erro) {
    console.log("Erro ao carregar produtos:", erro);
  }
}

export const conectaAPI = { buscar };

