//Fetch para vendas
const API_URL = process.env.API_URL;

export async function buscarVendas(){
    const response = await fetch(`${API_URL}/api/vendas`);
    if(!response.ok) throw new Error("Erro ao buscar vendas");
    return response.json();
}

//Fetch para estoque
export async function buscarEstoque(){
    const response = await fetch(`${API_URL}/api/estoque`);
    if(!response.ok) throw new Error("Erro ao buscar estoque");
    return response.json();
}

export async function reporEstoque({ id_Fornecedor, total_Compra, itens }) {
    const token = sessionStorage.getItem("token");

    if (!token) throw new Error("Faça login antes de repor o estoque!")
    const response = await fetch(`${API_URL}/estoque/repor`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_Fornecedor, total_Compra, itens }),
    });

    if (!response.ok) throw new Error("Erro ao repor estoque");
    return response.json();
}