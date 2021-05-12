import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { RegisterContainer } from "./styles";

import { CreateUser } from "../../services/userService";

export function Register() {
  const { register, setValue, handleSubmit, watch } = useForm();

  const [validationState, setValidationState] = useState([]);

  async function viacepSearch(event) {
    const valor = event.target.value;
    var cep = valor.replace(/\D/g, "");

    if (cep !== "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        setValue("city", "...");
        setValue("district", "...");
        setValue("address", "...");

        const response = await axios.get(
          "https://viacep.com.br/ws/" + cep + "/json/"
        );

        const viacep = response.data;

        setValue("city", viacep.localidade);
        setValue("district", viacep.bairro);
        setValue("address", viacep.logradouro);
      } else {
        toast.error("Cep inválido!");
      }
    }
  }

  const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.email === undefined || form.email === null || form.email === "") {
      hasError = true;
      validationState.email = "error";
      toast.error("Você precisa informar o e-mail.");
    }

    if (
      form.password === undefined ||
      form.password === null ||
      form.password === ""
    ) {
      hasError = true;
      validationState.password = "error";
      toast.error("Você precisa informar a senha.");
    }

    if (form.name === undefined || form.name === null || form.name === "") {
      hasError = true;
      validationState.name = "error";
      toast.error("Você precisa informar o nome.");
    }

    if (form.cpf === undefined || form.cpf === null || form.cpf === "") {
      hasError = true;
      validationState.cpf = "error";
      toast.error("Você precisa informar o cpf.");
    }

    if (
      form.birthdate === undefined ||
      form.birthdate === null ||
      form.birthdate === ""
    ) {
      hasError = true;
      validationState.birthdate = "error";
      toast.error("Você precisa informar a data de nascimento.");
    }

    if (
      form.zipcode === undefined ||
      form.zipcode === null ||
      form.zipcode === ""
    ) {
      hasError = true;
      validationState.zipcode = "error";
      toast.error("Você precisa informar o cep.");
    }

    if (
      form.address === undefined ||
      form.address === null ||
      form.address === ""
    ) {
      hasError = true;
      validationState.address = "error";
      toast.error("Você precisa informar o logradouro.");
    }

    if (
      form.district === undefined ||
      form.district === null ||
      form.district === ""
    ) {
      hasError = true;
      validationState.district = "error";
      toast.error("Você precisa informar o bairro.");
    }

    if (form.city === undefined || form.city === null || form.city === "") {
      hasError = true;
      validationState.city = "error";
      toast.error("Você precisa informar a cidade.");
    }

    if (form.state === undefined || form.state === null || form.state === "") {
      hasError = true;
      validationState.state = "error";
      toast.error("Você precisa informar o estado.");
    }

    setValidationState(validationState);
    return hasError;
  };

  const createNewUser = (form) => {
    CreateUser(form).then(
      (resp) => {
        toast.success("Usuário criado com sucesso!");
      },
      (error) => {
        toast.error(error.response.data.title);
      }
    );
  };

  function onSubmit(form) {
    if (!validationBeforeCreate()) {
      createNewUser(form);
    }
  }

  return (
    <RegisterContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-light p-5 mx-auto"
        >
          <h1 className="py-2 text-uppercase">Novo Cadastro</h1>

          <br />
          <h4>Informações de Login</h4>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">E-mail</label>
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ex: seuemail@email.com"
                style={
                  validationState.email !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Senha</label>
              <input
                {...register("password")}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="*******"
                style={
                  validationState.password !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="*******"
                style={
                  validationState.confirmPassword !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <br />
          <h4>Informações Pessoais</h4>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Nome Completo</label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Ex: João da Silva"
                style={
                  validationState.name !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="genre">Sexo</label>
              <select
                id="genre"
                name="genre"
                {...register("genre")}
                className="form-control"
              >
                <option value="">Selecione o sexo...</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="X">Prefiro não informar</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="cpf">CPF</label>
              <input
                {...register("cpf")}
                type="text"
                className="form-control"
                id="cpf"
                name="cpf"
                placeholder="Ex: 123.456.789-10"
                style={
                  validationState.cpf !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="birthdate">Data de Nascimento</label>
              <input
                {...register("birthdate")}
                type="date"
                className="form-control"
                id="birthdate"
                name="birthdate"
                style={
                  validationState.birthdate !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <br />
          <h4>Endereço</h4>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="zipcode">CEP</label>
              <input
                {...register("zipcode")}
                type="text"
                className="form-control"
                id="zipcode"
                name="zipcode"
                size="10"
                maxLength="9"
                defaultValue=""
                placeholder="Ex: 09112-000"
                onBlur={viacepSearch}
                style={
                  validationState.zipcode !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="address">Logradouro</label>
              <input
                {...register("address")}
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Ex: Rua Machado de Assis"
                style={
                  validationState.address !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="district">Bairro</label>
              <input
                {...register("district")}
                type="text"
                className="form-control"
                id="district"
                name="district"
                placeholder="Ex: Bota Fogo"
                style={
                  validationState.district !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="city">Cidade</label>
              <input
                {...register("city")}
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Ex: Mauá"
                style={
                  validationState.city !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="state">Estado</label>
              <select
                id="state"
                name="state"
                {...register("state")}
                className="form-control"
                style={
                  validationState.state !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              >
                <option value="">Selecione o estado...</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-outline-success btn-rounded-seuphone"
          >
            <i className="far fa-circle"></i> Cadastrar
          </button>
          <Link
            className="btn btn-outline-danger btn-rounded-seuphone"
            to="/login"
          >
            <i className="far fa-times-circle"></i> Cancelar
          </Link>
        </form>
      </div>
    </RegisterContainer>
  );
}
