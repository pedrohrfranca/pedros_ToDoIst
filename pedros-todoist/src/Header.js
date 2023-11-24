// Header.js
import React, { useState } from "react";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
// CSS
import "./style.css";
import "./CSS/header.css";
import "./CSS/body.css";

function Header() {
  const [ajudaVisivel, setAjudaVisivel] = useState(false);

  function abrirCentralAjuda() {
    setAjudaVisivel(true); // Isso deve mostrar a central de ajuda
  }

  function fecharCentralAjuda() {
    setAjudaVisivel(false); // Isso deve esconder a central de ajuda
  }

  return (
    <>
      <header className="header">
        <div className="logo-pesquisa">
          <FontAwesomeIcon icon={faListCheck} id="logo" />
          <input
            type="search"
            className="pesquisar"
            placeholder="Buscar uma Atividade.."
          />
        </div>
        <div className="lado-direito">
          <ul className="produtividade-ajuda">
            <li className="produtividade">
              <span className="label">Sua Produtividade: </span>
              <span id="contador-atividades">0/0</span>
            </li>
            <li className="ajuda" onClick={abrirCentralAjuda}>
              <span className="label">Ajuda </span>
              <FontAwesomeIcon icon={faQuestion} className="interrogacao" />
            </li>
          </ul>
        </div>
      </header>

      {/* CENTRAL AJUDA */}
      {ajudaVisivel && ( // Renderiza a central de ajuda apenas se ajudaVisivel for true
        <div
          id="central-ajuda"
          style={{ display: ajudaVisivel ? "block" : "none" }}
        >
          <h2>Central de Ajuda</h2>
          <p>Olá! Precisa de uma mãozinha para usar Pedro's ToDoIst?</p>
          <p>Aqui estão algumas dicas rápidas:</p>
          <ul>
            <li>
              <strong>Adicionar Tarefas:</strong> Clique no botão "+ Adicionar"
              para criar uma nova tarefa. Digite os detalhes e selecione
              "Salvar".
            </li>
            <li>
              <strong>Produtividade</strong> Clique sobre a "Bateria" para saber
              quantas Tarefas já foram feitas e quantas ainda faltam para serem
              concluídas.
            </li>
            <li>
              <strong>Concluir e Deletar Tarefas:</strong> Assim que completar
              uma tarefa, clique no ícone de "check" ao lado dela para marcá-la
              como concluída. Para deletar uma tarefa é só clicar no "Lixeira"
              ao lado direito da tarefa
            </li>
            <li>
              <strong>Organizar Tarefas:</strong> Use as categorias ou etiquetas
              para organizar suas tarefas por projetos, prioridades ou como
              preferir.
            </li>
            <li>
              <strong>Buscar Atividade:</strong> Clique no campo "Procurar uma
              Atividade" e descreva sua atividade para encontrá-la
            </li>
          </ul>
          <p>
            Se você tiver perguntas específicas ou encontrar algum problema, por
            favor, entre em contato conosco através do "pedrof_bh@hotmail.com"
            ou acesse nossa seção de Perguntas Frequentes (FAQ).
          </p>
          <p>
            Obrigado por escolher o Pedro's ToDoIst para organizar seu dia a
            dia!
          </p>
          <button onClick={() => fecharCentralAjuda()}>Fechar</button>
        </div>
      )}
    </>
  );
}

export default Header;
