const telaCliente = `
<header class="header-clientes">
    <h2 class="negrito" id="tituloConfig">Clientes</h2>
</header>
 <main class="main-content">
      <section class="card-screen">
        <div class="search-bar">
          <input type="text" id="search-client-cpf" placeholder="CPF DO CLIENTE...">
          <button onclick="buscarCliente()" class="btn-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
          </button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th style="width: 33.3%;">NOME</th>
                        <th style="width: 33.3%;">EMAIL</th>
                        <th style="width: 33.3%;">NÚMERO DO CPF</th>
                        <th style="width: 33.3%;">ENDEREÇO</th>
                        <th style="width: 33.3%;">TELEFONE</th>
                    </tr>
                </thead>
                <tbody id="clientes-table-body">
                </tbody>
            </table>
        </div>

        <div class="actions-right">
            <button onclick="openModal('modal-cadastrar')"class="btn-primary">CADASTRAR</button>
        </div>
    </section>
</main>
        `

function renderizarCliente() {

    document.addEventListener("click", function (event) {

        const botaoClientes = event.target.closest("#fundoClientes");

         if (botaoClientes) {
            event.preventDefault();
            renderizarElementos(telaCliente);

            if (typeof window.buscarCliente === "function") {
                window.buscarCliente();
            }
        }
    });
}

renderizarCliente()

