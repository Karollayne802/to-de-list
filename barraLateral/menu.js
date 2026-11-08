// MENU COMPARTILHADO (barra lateral)
// Um único lugar para editar o menu. Para criar uma nova tela:
//   1) crie o html dela em paginas/
//   2) adicione UMA linha na lista TELAS abaixo
//
// Uso (na principal.html):
//   <div id="menu-compartilhado"></div>
//   FlowMenu.montar('#menu-compartilhado', { ativo: 'tela-perfil', aoNavegar: id => ..., aoSair: () => ... });
const FlowMenu = (() => {
    const svg = (conteudo) =>
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
        `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${conteudo}</svg>`;

    // id da tela -> página html que é exibida na principal
    const TELAS = [
        {
            id: 'tela-inicio', rotulo: 'Início', pagina: 'paginas/inicio.html',
            icone: svg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>')
        },
        {
            id: 'tela-tarefas', rotulo: 'Minhas tarefas', pagina: 'paginas/tarefas.html',
            icone: svg('<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>')
        },
        {
            id: 'tela-calendario', rotulo: 'Calendário', pagina: 'paginas/calendario.html',
            icone: svg('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>')
        },
        {
            id: 'tela-perfil', rotulo: 'Perfil', pagina: 'paginas/perfil.html',
            icone: svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>')
        }
    ];

    const ICONE_SAIR = svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>');

    let raiz = null;

    function marcarAtivo(idTela) {
        if (!raiz) return;
        raiz.querySelectorAll('.menu-itens .menu-item').forEach(item => {
            item.classList.toggle('ativo', item.getAttribute('data-target') === idTela);
        });
    }

    function montar(seletor, opcoes = {}) {
        raiz = typeof seletor === 'string' ? document.querySelector(seletor) : seletor;
        if (!raiz) return;

        raiz.innerHTML = `
        <aside class="menu-lateral">
            <div class="menu-marca">
                <span class="marca-icone">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </span>
                <span class="marca-nome">FlowList</span>
            </div>

            <nav class="menu-itens">
                ${TELAS.map(t => `
                <a href="#" class="menu-item" id="nav-${t.id.replace('tela-', '')}" data-target="${t.id}">
                    ${t.icone}
                    ${t.rotulo}
                </a>`).join('')}
            </nav>

            <a href="#" id="botaoSair" class="menu-item">
                ${ICONE_SAIR}
                Sair
            </a>
        </aside>`;

        raiz.querySelectorAll('.menu-itens .menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (opcoes.aoNavegar) opcoes.aoNavegar(item.getAttribute('data-target'));
            });
        });

        raiz.querySelector('#botaoSair').addEventListener('click', (e) => {
            e.preventDefault();
            if (opcoes.aoSair) opcoes.aoSair();
        });

        marcarAtivo(opcoes.ativo);
    }

    return { TELAS, montar, marcarAtivo };
})();
