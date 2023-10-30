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
            const label = checkbox.parentElement;
            if (checkbox.checked) {
                label.classList.add("riscado");
            } else {
                label.classList.remove("riscado");
            }
        });
    });
});


// ADICIONAR TAREFA

document.addEventListener("DOMContentLoaded", function() {
    const addTaskButton = document.getElementById("adicionar-tarefa");
    const lateTasksList = document.querySelector(".atividades-atrasadas .lista-atividades");
    const todayTasksList = document.querySelector(".atividades-hoje .lista-atividades");
    const upcomingTasksList = document.querySelector(".atividades-embreve .lista-atividades");

    addTaskButton.addEventListener("click", function() {
        Swal.fire({
            title: 'Digite a descrição da tarefa:',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Adicionar', // Personaliza o texto do botão
            confirmButtonColor: '#E0662F',   // Personaliza a cor de fundo do botão        
        }).then((result) => {
            if (result.isConfirmed) {
                const taskText = result.value;
                const task = document.createElement("li");
                task.innerHTML = `<input class="checkbox" type="checkbox">${taskText}`;

                Swal.fire({
                    title: "Escolha a lista: 'Atrasadas', 'Hoje' ou 'Em Breve'",
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Incluir',
                    confirmButtonColor: '#E0662F'
                }).then((listResult) => {
                    if (listResult.isConfirmed) {
                        const listName = listResult.value.toLowerCase();
                        switch (listName) {
                            case 'atrasadas':
                                lateTasksList.appendChild(task);
                                break;
                            case 'hoje':
                                todayTasksList.appendChild(task);
                                break;
                            case 'em breve':
                                upcomingTasksList.appendChild(task);
                                break;
                            default:
                                alert("Lista inválida. A tarefa não foi adicionada a nenhuma lista.");
                        }
                    }
                });
            }
        });
    });
});
