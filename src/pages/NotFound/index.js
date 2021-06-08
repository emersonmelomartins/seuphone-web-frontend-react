import React from "react";
import { NotFoundContainer } from "./styles";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <NotFoundContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Página não encontrada</h1>
          <p>A página que você solicitou não foi encontrada.</p>
          <Link to="/">
            Voltar para home.
          </Link>
          
        </form>
      </div>
    </NotFoundContainer>
  );
}
