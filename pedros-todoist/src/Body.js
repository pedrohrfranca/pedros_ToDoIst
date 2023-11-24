import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
// Importar o Swal
import Swal from "sweetalert2";

function Body() {
  const PRIORIDADES = { alta: "Alta", media: "Média", baixa: "Baixa" };
  const [lateTasks, setLateTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  // Função para adicionar tarefa - Function add.activities
  const addTask = async () => {
    try {
      const taskDetails = await getTaskDetailsFromUser();
      if (!taskDetails) return;

      const { description, priority, dueDate, listName } = taskDetails;
      const newTask = { description, priority, dueDate, completed: false };
      if (listName === "atrasadas") {
        setLateTasks([...lateTasks, newTask]);
        setShowLateTasks(true);
      } else if (listName === "hoje") {
        setTodayTasks([...todayTasks, newTask]);
        setShowTodayTasks(true);
      } else if (listName === "em breve") {
        setUpcomingTasks([...upcomingTasks, newTask]);
        setShowUpcomingTasks(true);
      }
    } catch (error) {
      Swal.fire("Erro", error.message, "error");
    }
  };

  // Função para obter detalhes da tarefa do usuário - Function to get details from users
  const getTaskDetailsFromUser = async () => {
    // Descrição da Tarefa - task description
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

    // Prioridade da Tarefa - Task priority
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

    // Seleção da Lista - List selection
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

  // Função para remover uma tarefa - Function remove task
  const removeTask = (taskListSetter, index) => {
    taskListSetter((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Função para renderizar uma tarefa - Function to render a task
  const renderTask = (task, taskListSetter, index) => (
    <li key={index} className={task.completed ? "task-completed" : ""}>
      <input
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(taskListSetter, index)}
      />
      <span className={task.completed ? "description-completed" : ""}>
        {task.description}
      </span>
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

  // FUNÇAO PARA ESCONDER LISTA - Function to hide list

  const [showLateTasks, setShowLateTasks] = useState(false);
  const [showTodayTasks, setShowTodayTasks] = useState(false);
  const [showUpcomingTasks, setShowUpcomingTasks] = useState(false);

  const toggleLateTasks = () => setShowLateTasks((prev) => !prev);
  const toggleTodayTasks = () => setShowTodayTasks((prev) => !prev);
  const toggleUpcomingTasks = () => setShowUpcomingTasks((prev) => !prev);

  // FUNÇAO MARCAR TAREFA CONCLUIDA - Function to CHECK activity done

  const toggleTaskCompletion = (taskListSetter, index) => {
    taskListSetter((prevTasks) => {
      return prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  };

  // Ordenar Atividades feitas no final da lista - Checked activities at the end of the list

  useEffect(() => {
    setLateTasks((prevTasks) => reorderByCompletion(prevTasks));
    setTodayTasks((prevTasks) => reorderByCompletion(prevTasks));
    setUpcomingTasks((prevTasks) => reorderByCompletion(prevTasks));
  }, [lateTasks, todayTasks, upcomingTasks]);

  const reorderByCompletion = (tasks) => {
    const uncompletedTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    return [...uncompletedTasks, ...completedTasks];
  };

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
          <FontAwesomeIcon
            onClick={toggleLateTasks}
            id="abrir-atividades"
            icon={faArrowDown}
          />
          Atividades Atrasadas
        </h2>
        {showLateTasks && (
          <ul className="lista-atividades">
            {lateTasks.map((task, index) =>
              renderTask(task, setLateTasks, index)
            )}
          </ul>
        )}
      </div>

      {/* Atividades de Hoje */}
      <div className="atividades-hoje">
        <h2>
          <FontAwesomeIcon
            onClick={toggleTodayTasks}
            id="abrir-atividades"
            icon={faArrowDown}
          />
          Fazer Hoje
        </h2>
        {showTodayTasks && (
          <ul className="lista-atividades">
            {todayTasks.map((task, index) =>
              renderTask(task, setTodayTasks, index)
            )}
          </ul>
        )}
      </div>

      {/* Atividades Em Breve */}
      <div className="atividades-embreve">
        <h2>
          <FontAwesomeIcon
            onClick={toggleUpcomingTasks}
            id="abrir-atividades"
            icon={faArrowDown}
          />
          Em breve
        </h2>
        {showUpcomingTasks && (
          <ul className="lista-atividades">
            {upcomingTasks.map((task, index) =>
              renderTask(task, setUpcomingTasks, index)
            )}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Body;
