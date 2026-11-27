// Lista que veio do servidor (antes eram 3 clientes inventados)
let clientes = [];
// Lista que está aparecendo agora (depois de filtrar)
let listaExibida = [];
let selectedClientId = null;

// Escreve texto na tela de forma segura
function escaparHtmlCliente(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// Pede a lista de clientes ao servidor
async function buscarClientesNoBack() {
  const resposta = await requisicaoApi("/clientes", { method: "GET" });
  return Array.isArray(resposta) ? resposta : [];
}

// Desenha a tabela
function renderClientes(data = listaExibida) {
  const tbody = document.getElementById('clientes-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #94a3b8;">Nenhum cliente encontrado</td></tr>`;
    return;
  }

  data.forEach(c => {
    const tr = document.createElement('tr');
    if (selectedClientId === c.id) tr.classList.add('selected');
    tr.onclick = () => {
      selectedClientId = selectedClientId === c.id ? null : c.id;
      renderClientes();
    };
    tr.innerHTML = `
      <td>${escaparHtmlCliente(c.nome)}</td>
      <td>${escaparHtmlCliente(c.email)}</td>
      <td>${escaparHtmlCliente(c.cpf)}</td>
      <td>${escaparHtmlCliente(c.logradouro)}</td>
      <td>${escaparHtmlCliente(c.telefone)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Busca no servidor e filtra pelo que foi digitado
async function buscarCliente() {
  const tbody = document.getElementById('clientes-table-body');
  const texto = document.getElementById('search-client-cpf')?.value.trim().toLowerCase() ?? '';

  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Carregando clientes...</td></tr>`;
  }

  try {
    clientes = await buscarClientesNoBack();

    listaExibida = clientes.filter(c =>
      !texto ||
      String(c.cpf ?? '').toLowerCase().includes(texto) ||
      String(c.nome ?? '').toLowerCase().includes(texto)
    );

    renderClientes();
  } catch (erro) {
    console.error('Erro ao consultar clientes:', erro);
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Erro: ${escaparHtmlCliente(erro.message)}</td></tr>`;
    }
  }
}

/* ---- As três funções abaixo AINDA NÃO falam com o servidor ----
   Elas só mexem na tela. Ao recarregar, tudo volta ao que está no banco. */

function salvarCliente() {
  const nome = document.getElementById('new-name').value;
  const email = document.getElementById('new-email').value;
  const cpf = document.getElementById('new-cpf').value;
  const dataNascimento = document.getElementById('new-birthday').value;
  const endereco = document.getElementById('new-address').value;
  const telefone = document.getElementById('new-telephone').value;
  const senha = document.getElementById('new-password').value;
  const aceitaOferta = document.getElementById('defaultCheck1').checked;

  if (!nome || !cpf || !email || !dataNascimento || !endereco || !telefone || !senha || !aceitaOferta) {
    alert('Preencha todos os campos.');
    return;
  }

  clientes.push({ id: Date.now(), nome, email, cpf, dataNascimento, endereco, telefone, senha, aceitaOferta });
  listaExibida = clientes;
  renderClientes();
  closeModal('modal-cadastrar');

  nome.value = '';
  email.value = '';
  cpf.value = '';
  dataNascimento.value = '';
  endereco.value = '';
  aceitaOferta.checked = false;
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

window.openModal = openModal;
window.closeModal = closeModal;
window.buscarCliente = buscarCliente;