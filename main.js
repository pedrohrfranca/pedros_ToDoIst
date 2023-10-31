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

document.addEventListener("DOMContentLoaded", function () {
    const lateTasksList = document.querySelector(".atividades-atrasadas .lista-atividades");
    const todayTasksList = document.querySelector(".atividades-hoje .lista-atividades");
    const upcomingTasksList = document.querySelector(".atividades-embreve .lista-atividades");

    function addTask(description, targetList) {
        const task = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                task.classList.add("riscado");
            } else {
                task.classList.remove("riscado");
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("excluir-button");

        deleteButton.addEventListener("click", function () {
            task.remove();
        });

        task.appendChild(checkbox);
        task.appendChild(document.createTextNode(description));
        task.appendChild(deleteButton);


        targetList.appendChild(task);
    }

    const addTaskButton = document.getElementById("adicionar-tarefa");
    addTaskButton.addEventListener("click", function () {
        Swal.fire({
            title: 'Digite a descrição da tarefa:',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            confirmButtonColor: '#E0662F'
        }).then((result) => {
            if (result.isConfirmed) {
                const taskText = result.value;

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
                                addTask(taskText, lateTasksList);
                                break;
                            case 'hoje':
                                addTask(taskText, todayTasksList);
                                break;
                            case 'em breve':
                                addTask(taskText, upcomingTasksList);
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



// BUSCAR ATIVIDADE

function searchActivity() {
    const keyword = document.querySelector('.pesquisa').value.toLowerCase();
    const sections = [{
        title: "Atividades Atrasadas",
        list: document.querySelector('.atividades-atrasadas .lista-atividades')
    }, {
        title: "Fazer Hoje",
        list: document.querySelector('.atividades-hoje .lista-atividades')
    }, {
        title: "Em breve",
        list: document.querySelector('.atividades-embreve .lista-atividades')
    }];

    const results = [];
    const resultsEl = document.querySelector('.resultados-pesquisa');

    sections.forEach(section => {
        const items = section.list.children;
        for (let item of items) {
            const activityText = item.textContent.trim();
            if (activityText.toLowerCase().includes(keyword)) {
                results.push({ 
                    activity: activityText,
                    section: section.title
                });
            }
        }
    });

    if (keyword === "" || results.length === 0) {
        resultsEl.style.display = 'none';
        return;
    }

    displayResults(results);
    resultsEl.style.display = 'block'; 
}

function displayResults(results) {
    const resultsListEl = document.getElementById('searchResults');
    resultsListEl.innerHTML = ""; 

    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `${result.activity} (na lista "${result.section}")`;
        resultsListEl.appendChild(li);
    });
}

document.querySelector('.pesquisa').addEventListener('input', searchActivity);
