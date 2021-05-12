import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginContainer } from "./styles";

import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";
import { Alert } from "react-bootstrap";

export function Login() {
  const { register, getValues } = useForm();
  const history = useHistory();
  const { Authenticate, signed } = useAuth();

  useEffect(() => {
    signed && history.push("/");
  }, [history, signed]);

  function handleSubmit() {
    const form = getValues();
    Authenticate(form);
  }
  return (
    <LoginContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Faça seu login</h1>
          <div className="form-group">
            <label htmlFor="email">Usuário</label>
            <input
              {...register("email")}
              defaultValue=""
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Ex: joao.silva@gmail.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              defaultValue=""
              {...register("password")}
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="*******"
            />
          </div>
          <Alert variant="success">
            <p>Usuário para testes</p>
            <span>Login: bob.brown@gmail.com</span>
            <br />
            <span>Senha: 654321</span>
          </Alert>
          {/* POSSÍVEL FUNÇÃO "LEMBRAR LOGIN" */}
          {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div> */}
          <ul className="p-0 my-1">
            <li>
              <a href="/register">Novo cadastro</a>
            </li>
            <li>
              <a href="/">Esqueci minha senha</a>
            </li>
          </ul>

          <button
            type="button"
            className="btn btn-seuphone-outline-black btn-block btn-rounded-seuphone"
            id="btn-login"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </form>
      </div>
    </LoginContainer>
  );
}
