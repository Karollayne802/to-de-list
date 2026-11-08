// TELA PRINCIPAL (shell): monta o menu compartilhado e exibe, no quadro,
// a página da tela escolhida (paginas/*.html). Nenhuma regra de tela fica aqui.
const quadro = document.getElementById('quadro-tela');
const TELA_INICIAL = 'tela-perfil';   // primeiro acesso: o usuário cai no Perfil
let telaAtual = null;

function trocarTela(idTela) {
    const tela = FlowMenu.TELAS.find(t => t.id === idTela);
    if (!tela) return;

    FlowMenu.marcarAtivo(idTela);
    if (idTela !== telaAtual) {
        quadro.src = tela.pagina;
        telaAtual = idTela;
    }

    try {
        sessionStorage.setItem('flowlist_aba_ativa', idTela);
    } catch (e) { }
}

// Sair da sessão (volta para tela.html)
function voltar() {
    window.location.href = 'tela.html';
}

// Pedidos vindos das páginas dentro do quadro (ver paginas/navegacao.js)
window.addEventListener('message', (e) => {
    if (e.source !== quadro.contentWindow || !e.data) return;
    if (e.data.flowlist === 'navegar') trocarTela(e.data.destino);
    if (e.data.flowlist === 'sair') voltar();
});

FlowMenu.montar('#menu-compartilhado', {
    aoNavegar: trocarTela,
    aoSair: voltar
});

// Abre a aba salva da sessão; se for a primeira vez, abre o Perfil
let inicial = TELA_INICIAL;
try {
    const salva = sessionStorage.getItem('flowlist_aba_ativa');
    if (salva && FlowMenu.TELAS.some(t => t.id === salva)) inicial = salva;
} catch (e) { }
trocarTela(inicial);
