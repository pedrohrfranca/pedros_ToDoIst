// DATA TOPO

var dataHojeElement = document.getElementById("data-hoje");

var dataAtual = new Date();

var options = { year: 'numeric', month: 'long', day: 'numeric' };
var dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);

dataHojeElement.textContent = dataFormatada;

// ABRIR ATIVIDADES

document.addEventListener("DOMContentLoaded", function () {
    const abrirAtividades = document.querySelectorAll("[id^='abrir-atividades']");
    const listaAtividades = document.querySelectorAll("[class^='lista-atividades']");

    abrirAtividades.forEach((botao, index) => {
        botao.addEventListener("click", () => {
            if (listaAtividades[index].classList.contains("hidden")) {
                listaAtividades[index].classList.remove("hidden");
            } else {
                listaAtividades[index].classList.add("hidden");
            }
        });
    });
});


// CHECKBOX

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const label = checkbox.parentElement; // O elemento pai (li) do checkbox
            if (checkbox.checked) {
                label.classList.add("riscado"); // Adicionar uma classe para riscar o texto
            } else {
                label.classList.remove("riscado"); // Remover a classe para cancelar o risco
            }
        });
    });
});
