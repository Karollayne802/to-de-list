// Tela: Perfil (roda dentro de paginas/perfil.html)
// Lê os dados salvos pelo app e preenche as estatísticas.
// Em um primeiro acesso (nada salvo ainda) tudo aparece zerado.
(function () {
    let tasks = [];
    let totalConcluidasAcumuladas = 0;

    try {
        const saved = localStorage.getItem('flowlist_tasks');
        if (saved) tasks = JSON.parse(saved);
        const savedCount = localStorage.getItem('totalTarefasConcluidas');
        totalConcluidasAcumuladas = savedCount !== null
            ? (parseInt(savedCount, 10) || 0)
            : tasks.filter(t => t.done).length;
    } catch (e) {
        tasks = [];
        totalConcluidasAcumuladas = 0;
    }

    function atualizarPerfil() {
        const total = tasks.length;
        const concluidasAtuais = tasks.filter(t => t.done).length;
        const pendentes = total - concluidasAtuais;
        const taxa = total > 0 ? Math.round((concluidasAtuais / total) * 100) : 0;

        const elTotal = document.getElementById('statTotalTarefas');
        if (elTotal) elTotal.textContent = total;

        const elPendentes = document.getElementById('statTarefasPendentes');
        if (elPendentes) elPendentes.textContent = pendentes;

        const elConcluidas = document.getElementById('statTarefasConcluidas');
        if (elConcluidas) elConcluidas.textContent = totalConcluidasAcumuladas;

        const elTaxa = document.getElementById('statTaxaConclusao');
        if (elTaxa) elTaxa.textContent = `${taxa}%`;

        const profileConcluidas = document.getElementById('profileConcluidas');
        if (profileConcluidas) {
            profileConcluidas.innerHTML = `<i class="bi bi-check2-circle me-1"></i>${totalConcluidasAcumuladas} ${totalConcluidasAcumuladas === 1 ? 'tarefa concluída' : 'tarefas concluídas'}`;
        }
    }

    atualizarPerfil();
})();
