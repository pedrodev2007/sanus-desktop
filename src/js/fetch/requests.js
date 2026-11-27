const API_URL = "https://sanus-backend.onrender.com/api";

async function cadastrarProduto(produto, token) {
    const resposta = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    });
    const dados = await resposta.json();
    if (!resposta.ok) {
        throw new Error(dados.error || "Não foi possível cadastrar o produto.");
    }
    return dados;
}

async function cadastrarProdutoImagem(id, foto, token) {
    const formulario = new FormData();
    formulario.append("foto", foto);

    const resposta = await fetch(`${API_URL}/cadastro/produto/imagem?id=${encodeURIComponent(id)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formulario
    });
    const dados = await resposta.json();
    if (!resposta.ok) {
        throw new Error(dados.error || "Não foi possível cadastrar a imagem.");
    }
    return dados;
}
