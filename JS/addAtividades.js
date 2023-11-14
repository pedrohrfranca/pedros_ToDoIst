// ADICIONAR ATIVIDADE

document.addEventListener("DOMContentLoaded", function () {
    const PRIORIDADES = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };

    const lateTasksList = document.querySelector(".atividades-atrasadas .lista-atividades");
    const todayTasksList = document.querySelector(".atividades-hoje .lista-atividades");
    const upcomingTasksList = document.querySelector(".atividades-embreve .lista-atividades");

    function addTask(description, priority, dueDate, targetList) {
        const task = createTaskElement(description, priority, dueDate);
        targetList.appendChild(task);
    }

    function createTaskElement(description, priority, dueDate) {
        const task = document.createElement("li");
        task.appendChild(createCheckbox(task));
        task.appendChild(document.createTextNode(description));
        task.appendChild(createDueDateSpan(dueDate));
        task.appendChild(createPrioritySpan(priority));
        task.appendChild(createDeleteButton(task));

        return task;
    }

    function createCheckbox(task) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("change", () => toggleTaskCompletion(task, checkbox));
        return checkbox;
    }

    function toggleTaskCompletion(task, checkbox) {
        checkbox.checked ? task.classList.add("riscado") : task.classList.remove("riscado");
    }

    function createPrioritySpan(priority) {
        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = `[${PRIORIDADES[priority]}] `;
        prioritySpan.classList.add(`priority-${priority}`);
        return prioritySpan;
    }

    function createDeleteButton(task) {
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("excluir-button");
        deleteButton.addEventListener("click", () => task.remove());
        return deleteButton;
    }

    function createDueDateSpan(dueDate) {
        const dueDateSpan = document.createElement("span");
        if (dueDate) {
            dueDateSpan.textContent = `  -> Vencimento: ${dueDate} `;
            dueDateSpan.classList.add("due-date");
        }
        return dueDateSpan;
    }

    const addTaskButton = document.getElementById("adicionar-tarefa");
    addTaskButton.addEventListener("click", handleAddTaskClick);

    async function handleAddTaskClick() {
        try {
            const taskDetails = await getTaskDetailsFromUser();
            if (taskDetails) {
                const { description, priority, dueDate, listName } = taskDetails;
                const targetList = getListByName(listName);
                addTask(description, priority, dueDate, targetList);
            }
        } catch (error) {
            Swal.fire('Erro', error.message, 'error');
        }
    }

    //PROMPTS
    async function getTaskDetailsFromUser() {
        
        const descriptionResult = await Swal.fire({
            title: 'Digite a descrição da tarefa:',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Próximo',
            confirmButtonColor: '#E0662F'
        });
        if (!descriptionResult.isConfirmed || !descriptionResult.value) return null;
        const description = descriptionResult.value;
    
        
        let dueDate = null;
        const addDateResult = await Swal.fire({
            title: 'Deseja adicionar uma data de vencimento?',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#E0662F'
        });
        if (addDateResult.isConfirmed) {
            const dueDateResult = await Swal.fire({
                title: 'Selecione a data de vencimento:',
                input: 'date',
                inputPlaceholder: 'Data de Vencimento',
                showCancelButton: true,
                confirmButtonColor: '#E0662F'
            });
            if (dueDateResult.isConfirmed && dueDateResult.value) {
                dueDate = new Date(dueDateResult.value).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        }
    
        
        const priorityResult = await Swal.fire({
            title: 'Escolha a prioridade da tarefa:',
            input: 'select',
            inputOptions: PRIORIDADES,
            inputPlaceholder: 'Selecione a prioridade',
            showCancelButton: true,
            confirmButtonText: 'Próximo',
            confirmButtonColor: '#E0662F'
        });
        if (!priorityResult.isConfirmed || !priorityResult.value) return null;
        const priority = priorityResult.value;
    
        
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
        if (!listResult.isConfirmed || !listResult.value) return null;
        const listName = listResult.value;
    
        return { description, dueDate, priority, listName };
    }
    

    function getListByName(listName) {
        switch (listName) {
            case 'atrasadas': return lateTasksList;
            case 'hoje': return todayTasksList;
            case 'em breve': return upcomingTasksList;
            default: throw new Error('Lista inválida. A tarefa não foi adicionada a nenhuma lista.');
        }
    }
});

