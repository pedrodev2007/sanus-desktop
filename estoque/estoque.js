import { buscarEstoque, reporEstoque } from "../src/requests.js";

const estoque = await buscarEstoque();
const repoEstoque = await reporEstoque();