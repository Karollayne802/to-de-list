// Navegação entre telas, usado por todas as páginas dentro de paginas/.
// A tela principal (principal.html) é quem troca a página exibida;
// aqui a página só "pede" para ir a outra tela.
//
// Ids válidos: 'tela-inicio' | 'tela-tarefas' | 'tela-calendario' | 'tela-perfil'
function trocarTela(idTela) {
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({ flowlist: 'navegar', destino: idTela }, '*');
    }
}

// Sair da sessão (a principal volta para tela.html)
function voltar() {
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({ flowlist: 'sair' }, '*');
    } else {
        window.location.href = 'tela.html';
    }
}
