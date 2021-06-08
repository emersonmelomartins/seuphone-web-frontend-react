import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ForgotPasswordContainer } from "./styles";

import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";
import { ResetUserPassword } from "../../services/userService";
import { toast } from "react-toastify";
import { useLoading } from "../../hooks/useLoading";

export function ForgotPassword() {
  const { register, getValues, handleSubmit } = useForm();
  const history = useHistory();
  const { signed } = useAuth();
  const {setLoading} = useLoading();

  useEffect(() => {
    signed && history.push("/");
  }, [history, signed]);

  function onSubmit() {
    const form = getValues();

    setLoading(true);
    ResetUserPassword(form).then(resp => {
       setLoading(false);
      toast.success("Sua senha foi redefinida com sucesso, verifique seu e-mail.");
      history.push("/login");
    },
    (error) => {
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === "object") {
              Object.values(erro.errors).forEach((e) => {
                toast.error(e[0]);
              });
            } else {
              toast.error(erro);
            }
          } else {
            toast.error("Não foi possível carregar os dados.");
          }
        } catch (e) {
          toast.error("Ocorreu um erro interno.");
        }
      });
  }
  return (
    <ForgotPasswordContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="py-2 text-uppercase">Esqueci minha senha</h1>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
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

          <button
          type="submit"
            className="btn btn-seuphone-outline-black btn-block btn-rounded-seuphone"
            id="btn-login"
          >
            Recuperar Senha
          </button>
        </form>
      </div>
    </ForgotPasswordContainer>
  );
}
