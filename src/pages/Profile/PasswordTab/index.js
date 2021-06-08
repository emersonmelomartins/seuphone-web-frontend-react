import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { UpdateUserPassword } from "../../../services/userService";

export function PasswordTab({ userInfo }) {
  const { register, handleSubmit, watch } = useForm();
  const { setLoading } = useLoading();

  const [validationState, setValidationState] = useState([]);


   const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.oldPassword === undefined || form.oldPassword === null || form.oldPassword === "") {
      hasError = true;
      validationState.oldPassword = "error";
      toast.error("Você precisa informar sua senha atual.");
    }

    if (form.newPassword === undefined || form.newPassword === null || form.newPassword === "") {
      hasError = true;
      validationState.newPassword = "error";
      toast.error("Você precisa informar sua nova senha.");
    }

    if (form.confirmNewPassword === undefined || form.confirmNewPassword === null || form.confirmNewPassword === "") {
      hasError = true;
      validationState.confirmNewPassword = "error";
      toast.error("Você precisa informar a confirmação da sua nova senha.");
    }

    setValidationState(validationState);
    return hasError;
  };

    const updateUserPassword = (form) => {
    const obj = {
      ...form,
      userid: userInfo.id
    }

    console.log(obj);

    setLoading(true);
    UpdateUserPassword(obj).then(
      (resp) => {
        setLoading(false);
        toast.success("Senha alterada com sucesso!");
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
      }
    );
  };

  
  function onSubmit(form) {
    if (!validationBeforeCreate()) {
      updateUserPassword(form);
    }
  }

  return (
    <>
      <form
      onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="oldPassword">Senha Atual</label>
            <input
              {...register("oldPassword")}
              type="password"
              className="form-control"
              id="oldPassword"
              name="oldPassword"
              placeholder="*******"
              style={
                validationState.oldPassword !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              {...register("newPassword")}
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="*******"
              style={
                validationState.newPassword !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="confirmNewPassword">Confirmar Nova Senha</label>
            <input
              {...register("confirmNewPassword")}
              type="password"
              className="form-control"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="*******"
              style={
                validationState.confirmNewPassword !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-rounded-seuphone btn-seuphone-outline-black"
        >
          <i className="far fa-circle"></i> Atualizar Senha
        </button>
      </form>
    </>
  );
}
