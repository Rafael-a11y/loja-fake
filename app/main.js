import { conectaAPI } from "./conectaAPI.js";
import { exibicao } from "./exibir.js";
import { filtragem } from "./filtros.js";

let produtos = [];

async function solicitarProdutos()
{
    produtos =  await conectaAPI.buscar();
    exibicao.exibirProdutos(produtos);
}

solicitarProdutos();
filtragem.adicionarOuvintes();