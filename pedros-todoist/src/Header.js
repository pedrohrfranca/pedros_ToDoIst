// Header.js
import React from "react";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
// CSS
import "./style.css";
import "./CSS/header.css";

function Header() {
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
            <li className="ajuda">
              <span className="label">Ajuda </span>
              <FontAwesomeIcon icon={faQuestion} className="interrogacao" />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
