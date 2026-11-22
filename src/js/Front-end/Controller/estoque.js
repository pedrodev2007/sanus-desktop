async function buscarEstoqueNoBack() {
  const resposta = await requisicaoApi("/estoque", { method: "GET" });

  if (Array.isArray(resposta)) return resposta;
  if (Array.isArray(resposta?.estoque)) return resposta.estoque;
  return [];
}

function escaparHtml(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function formatarMoedaEstoque(valor) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return escaparHtml(valor);
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderEstoque(lista) {
  const tbody = document.getElementById("estoque-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!lista.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center;">Nenhum produto encontrado.</td>
      </tr>
    `;
    return;
  }

  for (const item of lista) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escaparHtml(item.cod_barras)}</td>
      <td>${escaparHtml(item.nome)}</td>
      <td>${escaparHtml(item.qnt)}</td>
      <td>${escaparHtml(item.lote)}</td>
      <td>${formatarMoedaEstoque(item.valor_Unitario)}</td>
      <td></td>
    `;
    tbody.appendChild(tr);
  }
}

async function buscarEstoque() {
  const codigoFiltro =
    document.getElementById("inputCodigoBarras")?.value.trim().toLowerCase() ?? "";
  const tbody = document.getElementById("estoque-table-body");

  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center;">Carregando dados do servidor...</td>
      </tr>
    `;
  }

  try {
    const estoque = await buscarEstoqueNoBack();

    const filtrados = estoque.filter((item) =>
      !codigoFiltro || String(item.cod_Barras ?? "").toLowerCase().includes(codigoFiltro)
    );

    renderEstoque(filtrados);
  } catch (erro) {
    console.error("Erro ao consultar estoque:", erro);
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center;">Erro: ${escaparHtml(erro.message)}</td>
        </tr>
      `;
    }
  }
}

// O formulário é criado dinamicamente, então uso delegação de evento.
// Sem o preventDefault, o botão BUSCAR recarregaria a página.
document.addEventListener("submit", (event) => {
  if (event.target.closest("#estoque-search-forms")) {
    event.preventDefault();
    buscarEstoque();
  }
});

window.buscarEstoque = buscarEstoque;