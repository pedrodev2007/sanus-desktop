if (window.lucide) {
  lucide.createIcons();
}

async function buscarVendasNoBack() {
  const resposta = await requisicaoApi("/vendas", { method: "GET" });

  if (Array.isArray(resposta)) return resposta;
  if (Array.isArray(resposta?.vendas)) return resposta.vendas;
  return [];
}

function formatarMoeda(valor) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return String(valor ?? "");
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderHistorico(lista) {
  const tbody = document.getElementById("historico-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!lista.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center;">Nenhuma venda encontrada.</td>
      </tr>
    `;
    return;
  }

  for (const venda of lista) {
    // Ajuste os nomes das propriedades abaixo caso a sp_ViewVendas use outro nome de coluna
    const valor = venda.valor ?? venda.total ?? venda.valor_Pago ?? 0;
    const cpf = venda.cpf ?? venda.cpf_cliente ?? venda.documento ?? "";
    const relatorio =
      venda.relatorio ??
      venda.nfe ??
      venda.referencia ??
      venda.canal_Venda ??
      "";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatarMoeda(valor)}</td>
      <td>${cpf}</td>
      <td>${relatorio}</td>
    `;
    tbody.appendChild(tr);
  }
}

async function buscarHistorico() {
  const cpfFiltro = document.getElementById("filter-cpf")?.value.trim().toLowerCase() ?? "";
  const enderecoFiltro = document.getElementById("filter-address")?.value.trim().toLowerCase() ?? "";
  const tbody = document.getElementById("historico-table-body");

  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center;">Carregando dados do servidor...</td>
      </tr>
    `;
  }

  try {
    const vendas = await buscarVendasNoBack();

    const filtradas = vendas.filter((item) => {
      const cpfItem = String(item.cpf ?? item.cpf_cliente ?? item.documento ?? "").toLowerCase();
      const enderecoItem = String(item.endereco ?? item.endereco_cliente ?? "").toLowerCase();

      const matchCpf = !cpfFiltro || cpfItem.includes(cpfFiltro);
      const matchEndereco = !enderecoFiltro || enderecoItem.includes(enderecoFiltro);

      return matchCpf && matchEndereco;
    });

    renderHistorico(filtradas);
  } catch (erro) {
    console.error("Erro ao consultar histórico de vendas:", erro);
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center;">Erro: ${erro.message}</td>
        </tr>
      `;
    }
  }
}

window.buscarHistorico = buscarHistorico;