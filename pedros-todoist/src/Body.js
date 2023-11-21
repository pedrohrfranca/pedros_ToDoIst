import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
// Importar o Swal se necessário
import Swal from "sweetalert2";

function Body() {
  const PRIORIDADES = { alta: "Alta", media: "Média", baixa: "Baixa" };
  const [lateTasks, setLateTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  // Função para adicionar tarefa
  const addTask = async () => {
    try {
      const taskDetails = await getTaskDetailsFromUser();
      if (!taskDetails) return;

      const { description, priority, dueDate, listName } = taskDetails;
      const newTask = { description, priority, dueDate };
      if (listName === "atrasadas") {
        setLateTasks([...lateTasks, newTask]);
      } else if (listName === "hoje") {
        setTodayTasks([...todayTasks, newTask]);
      } else if (listName === "em breve") {
        setUpcomingTasks([...upcomingTasks, newTask]);
      }
    } catch (error) {
      Swal.fire("Erro", error.message, "error");
    }
  };

  // Função para obter detalhes da tarefa do usuário
  const getTaskDetailsFromUser = async () => {
    // Descrição da Tarefa
    const descriptionResult = await Swal.fire({
      title: "Digite a descrição da tarefa:",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Próximo",
      confirmButtonColor: "#E0662F",
    });
    if (!descriptionResult.isConfirmed || !descriptionResult.value) return null;
    const description = descriptionResult.value;

    // Data de Vencimento
    let dueDate = null;
    const addDateResult = await Swal.fire({
      title: "Deseja adicionar uma data de vencimento?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      confirmButtonColor: "#E0662F",
    });
    if (addDateResult.isConfirmed) {
      const dueDateResult = await Swal.fire({
        title: "Selecione a data de vencimento:",
        input: "date",
        showCancelButton: true,
        confirmButtonColor: "#E0662F",
      });
      if (dueDateResult.isConfirmed && dueDateResult.value) {
        dueDate = new Date(dueDateResult.value).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }
    }

    // Prioridade da Tarefa
    const priorityResult = await Swal.fire({
      title: "Escolha a prioridade da tarefa:",
      input: "select",
      inputOptions: PRIORIDADES,
      showCancelButton: true,
      confirmButtonText: "Próximo",
      confirmButtonColor: "#E0662F",
    });
    if (!priorityResult.isConfirmed || !priorityResult.value) return null;
    const priority = priorityResult.value;

    // Seleção da Lista
    const listResult = await Swal.fire({
      title: "Escolha a lista: 'Atrasadas', 'Hoje' ou 'Em Breve'",
      input: "select",
      inputOptions: {
        atrasadas: "Atrasadas",
        hoje: "Hoje",
        "em breve": "Em Breve",
      },
      showCancelButton: true,
      confirmButtonText: "Incluir",
      confirmButtonColor: "#E0662F",
    });
    if (!listResult.isConfirmed || !listResult.value) return null;
    const listName = listResult.value;

    return { description, dueDate, priority, listName };
  };

  // Função para remover uma tarefa
  const removeTask = (taskListSetter, index) => {
    taskListSetter((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Função para renderizar uma tarefa
  const renderTask = (task, taskListSetter, index) => (
    <li key={index}>
      <input type="checkbox" className="checkbox" />
      {task.description}
      <span className={`priority-${task.priority}`}>
        [{PRIORIDADES[task.priority]}]
      </span>
      {task.dueDate && (
        <span className="due-date"> - Vencimento: {task.dueDate}</span>
      )}
      <button
        className="excluir-button"
        onClick={() => removeTask(taskListSetter, index)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </li>
  );

  return (
    <section className="body">
      <div className="title-top">
        <h1>Suas Atividades</h1>
        <p id="data-hoje"></p>
        <p className="add-tarefas" onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} id="adicionar-tarefa" />
          Adicionar uma tarefa
        </p>
        <hr className="separator" />
      </div>

      {/* Atividades Atrasadas */}
      <div className="atividades-atrasadas">
        <h2>
          <FontAwesomeIcon id="abrir-atividades" icon={faArrowDown} />
          Atividades Atrasadas
        </h2>
        <ul className="lista-atividades">
          {lateTasks.map((task, index) =>
            renderTask(task, setLateTasks, index)
          )}
        </ul>
      </div>

      {/* Atividades de Hoje */}
      <div className="atividades-hoje">
        <h2>
          <FontAwesomeIcon id="abrir-atividades" icon={faArrowDown} />
          Fazer Hoje
        </h2>
        <ul className="lista-atividades">
          {todayTasks.map((task, index) =>
            renderTask(task, setTodayTasks, index)
          )}
        </ul>
      </div>

      {/* Atividades Em Breve */}
      <div className="atividades-embreve">
        <h2>
          <FontAwesomeIcon id="abrir-atividades" icon={faArrowDown} />
          Em breve
        </h2>
        <ul className="lista-atividades">
          {upcomingTasks.map((task, index) =>
            renderTask(task, setUpcomingTasks, index)
          )}
        </ul>
      </div>
    </section>
  );
}

export default Body;
