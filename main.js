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

document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('change', function (e) {
        if (e.target.classList.contains('checkbox')) {
            const task = e.target.parentElement;
            const list = task.parentElement;

            if (e.target.checked) {
                task.classList.add('riscado');
                list.appendChild(task);
            } else {
                task.classList.remove('riscado');
            }
        }
    });
});



// ADICIONAR ATIVIDADE

document.addEventListener("DOMContentLoaded", function () {
    const PRIORIDADES = {
        alta: 'Alta',
        media: 'Média',
        baixa: 'Baixa'
    };

    const lateTasksList = document.querySelector(".atividades-atrasadas .lista-atividades");
    const todayTasksList = document.querySelector(".atividades-hoje .lista-atividades");
    const upcomingTasksList = document.querySelector(".atividades-embreve .lista-atividades");

    function addTask(description, priority, targetList) {
        const task = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                task.classList.add("riscado");
                targetList.appendChild(task);
            } else {
                task.classList.remove("riscado");
            }
        });

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = `[${PRIORIDADES[priority]}] `;
        prioritySpan.classList.add(`priority-${priority}`);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("excluir-button");

        deleteButton.addEventListener("click", function () {
            task.remove();
        });

        task.appendChild(checkbox);
        task.appendChild(document.createTextNode(description));
        task.appendChild(prioritySpan);
        task.appendChild(deleteButton);

        targetList.appendChild(task);
    }

    const addTaskButton = document.getElementById("adicionar-tarefa");

    addTaskButton.addEventListener("click", async function () {
        try {
            const taskResult = await Swal.fire({
                title: 'Digite a descrição da tarefa:',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Adicionar',
                confirmButtonColor: '#E0662F'
            });

            if (taskResult.isConfirmed && taskResult.value) {
                const taskText = taskResult.value;
                
                const priorityResult = await Swal.fire({
                    title: 'Escolha a prioridade da tarefa:',
                    input: 'select',
                    inputOptions: PRIORIDADES,
                    inputPlaceholder: 'Selecione a prioridade',
                    showCancelButton: true,
                    confirmButtonText: 'Próximo',
                    confirmButtonColor: '#E0662F'
                });

                if (priorityResult.isConfirmed && priorityResult.value) {
                    const taskPriority = priorityResult.value;

                    const listResult = await Swal.fire({
                        title: "Escolha a lista: 'Atrasadas', 'Hoje' ou 'Em Breve'",
                        input: 'select',
                        inputOptions: {
                            'atrasadas': 'Atrasadas',
                            'hoje': 'Hoje',
                            'em breve': 'Em Breve'
                        },
                        inputPlaceholder: 'Selecione a lista',
                        showCancelButton: true,
                        confirmButtonText: 'Incluir',
                        confirmButtonColor: '#E0662F'
                    });

                    if (listResult.isConfirmed && listResult.value) {
                        const listName = listResult.value;
                        let targetList;
                        switch (listName) {
                            case 'atrasadas':
                                targetList = lateTasksList;
                                break;
                            case 'hoje':
                                targetList = todayTasksList;
                                break;
                            case 'em breve':
                                targetList = upcomingTasksList;
                                break;
                            default:
                                throw new Error('Lista inválida. A tarefa não foi adicionada a nenhuma lista.');
                        }
                        addTask(taskText, taskPriority, targetList);
                    }
                }
            }
        } catch (error) {
            Swal.fire('Erro', error.message, 'error');
        }
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


// PRODUTIVIDADE

document.addEventListener('DOMContentLoaded', function() {
    const carregarAtividadesBtn = document.getElementById('carregar-atividades');
    carregarAtividadesBtn.addEventListener('click', function() {
        let totalAtividades = document.querySelectorAll('.atividades-atrasadas .checkbox, .atividades-hoje .checkbox, .atividades-embreve .checkbox').length;
        let atividadesFeitas = document.querySelectorAll('.atividades-atrasadas .checkbox:checked, .atividades-hoje .checkbox:checked, .atividades-embreve .checkbox:checked').length;
        let atividadesPendentes = totalAtividades - atividadesFeitas;

        let mensagem = `Você já completou ${atividadesFeitas} de ${totalAtividades} atividades. Ainda tem ${atividadesPendentes} pendente(s)`;

        Swal.fire({
            title: 'Produtividade Diária',
            text: mensagem,
            icon: 'info',
            confirmButtonText: 'Entendido',
            customClass: {
                confirmButton: 'btn-laranja'
            }
        });        
    });
});

// AJUDA

document.getElementById("ajuda").addEventListener("click", function() {
    document.getElementById("central-ajuda").style.display = "block";
});

function fecharCentralAjuda() {
    document.getElementById("central-ajuda").style.display = "none";
}

