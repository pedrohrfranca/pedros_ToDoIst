// PRODUTIVIDADE

document.addEventListener('DOMContentLoaded', function() {
    const contadorAtividades = document.getElementById('contador-atividades');
    const container = document;

    function atualizarContador() {
        let totalAtividades = document.querySelectorAll('.atividades-atrasadas .checkbox, .atividades-hoje .checkbox, .atividades-embreve .checkbox').length;
        let atividadesFeitas = document.querySelectorAll('.atividades-atrasadas .checkbox:checked, .atividades-hoje .checkbox:checked, .atividades-embreve .checkbox:checked').length;

        contadorAtividades.textContent = `${atividadesFeitas}/${totalAtividades}`;
    }

    container.addEventListener('change', function(event) {
        if (event.target.matches('.atividades-atrasadas .checkbox, .atividades-hoje .checkbox, .atividades-embreve .checkbox')) {
            atualizarContador();
        }
    });

    atualizarContador(); 
});