const API_BASE_URL = "http://localhost:3000/api";
function obterToken() {
  return localStorage.getItem("token");
}

async function requisicaoApi(endpoint, { method = "GET", body = null } = {}) {
  const token = obterToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const opcoes = { method, headers };
  if (body !== null) {
    opcoes.body = JSON.stringify(body);
  }

  const resposta = await fetch(`${API_BASE_URL}${endpoint}`, opcoes);
  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.error || dados?.mensagem || `Erro HTTP ${resposta.status}`);
  }

  return dados;
}