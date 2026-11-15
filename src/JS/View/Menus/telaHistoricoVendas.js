const telaHistoricoVenda = `
    <header class="header-historico">
        <h2 class="negrito" id="tituloConfig">Histórico</h2>
    </header>

    <main>
      <section>
        <div class="filter-box">
          <span class="filter-title">FILTRAGEM</span>
          <div class="filter-inputs">
            <label class="checkbox-label">
              <input type="checkbox" id="filter-registered">
              <span>Cliente cadastrado no sistema?</span>
            </label>
            <input type="text" id="filter-cpf" placeholder="CPF DO CLIENTE...">
            <input type="text" id="filter-address" placeholder="ENDEREÇO DO CLIENTE...">
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 33.3%;">VALOR</th>
                <th style="width: 33.3%;">NÚMERO DO CPF</th>
                <th style="width: 33.3%;">RELATÓRIO</th>
              </tr>
            </thead>
            <tbody id="historico-table-body">
              <!-- Preenchido via JavaScript -->
            </tbody>
          </table>
        </div>

        <div class="actions-right">
          <button onclick="buscarHistorico()" class="btn-primary">BUSCAR</button>
        </div>
      </section>
    </main>
`

function renderizarHistoricoVenda() {

    document.addEventListener("click", function (event) {

        const botaoHistoricoVenda = event.target.closest("#fundoHistorico");

        if (botaoHistoricoVenda) {
            console.log("oi")
            event.preventDefault()
            renderizarElementos(telaHistoricoVenda)
        }
    });
}

renderizarHistoricoVenda();