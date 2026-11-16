function renderizarElementos(htmlPagina) {
    const coluna = document.getElementById("colunaAcoes")

    if(coluna){
        coluna.innerHTML = htmlPagina;

        if(document.documentElement.classList.contains("fundo-escuro")) {
            const tabelaEstoque = document.getElementById("tabelaEstoque");
            const barraPesquisa = document.getElementById("inputCodigoBarras");

            const pesquisaHistorico = document.getElementById("buscaHistorico");
            const caixaOpcaoHistorico = document.getElementById("caixaOpcao");
            const cpfTabelaHistorico = document.getElementById("cpfTabela");
            const valorTabelaHistorico = document.getElementById("valorTabela");
            const relatorioTabelaHistorico = document.getElementById("relatorioTabela");

            if(tabelaEstoque) {
                tabelaEstoque.classList.toggle("fundo-escuro")
            }
            if(barraPesquisa) {
                barraPesquisa.classList.toggle("fundo-escuro")
            }
            if(pesquisaHistorico) {
                pesquisaHistorico.classList.toggle("fundo-escuro");
            }
            if(caixaOpcaoHistorico) {
                caixaOpcaoHistorico.classList.toggle("fundo-escuro");
                console.log(caixaOpcaoHistorico);
            }
            if(cpfTabelaHistorico) {
                cpfTabelaHistorico.classList.toggle("fundo-escuro");
            }
            if(valorTabelaHistorico) {
                valorTabelaHistorico.classList.toggle("fundo-escuro");
            }
            if(relatorioTabelaHistorico) {
                relatorioTabelaHistorico.classList.toggle("fundo-escuro");
            }
            
        }
    }
}