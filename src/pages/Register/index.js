import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { RegisterContainer } from "./styles";
import { useLoading } from "../../hooks/useLoading";
import { CreateUser } from "../../services/userService";
import { cpfMask } from "../../util/cpfMask";
import { zipCodeMask } from "../../util/zipCodeMask";

export function Register() {
  const { register, setValue, getValues, handleSubmit, watch } = useForm();

  const { setLoading } = useLoading();

  const history = useHistory();

  const [validationState, setValidationState] = useState([]);
  const [cpfWithMask, setCpfWithMask] = useState("");
  const [zipCodeWithMask, setZipCodeWithMask] = useState("");

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

    if (cpfWithMask === undefined || cpfWithMask === null || cpfWithMask === "") {
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
      zipCodeWithMask === undefined ||
      zipCodeWithMask === null ||
      zipCodeWithMask === ""
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

    if (form.houseNumber === undefined || form.houseNumber === null || form.houseNumber === "") {
      hasError = true;
      validationState.houseNumber = "error";
      toast.error("Você precisa informar o número da residência.");
    }
    
    var mailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!mailPattern.test(getValues("email"))) {
      hasError = true;
      validationState.email = "error";
      toast.error("E-mail informado inválido, tente novamente.");
    }

    setValidationState(validationState);
    return hasError;
  };

  const createNewUser = (form) => {
    const obj = {
      ...form,
      cpf: cpfWithMask,
      zipCode: zipCodeWithMask
    }

    setLoading(true);
    CreateUser(obj).then(
      (resp) => {
        setLoading(false);
        toast.success("Usuário criado com sucesso!");
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
      }
    );
  };

  const onChangeCpf = (event) => {
    setCpfWithMask(cpfMask(event.target.value));
  };

  
  const onChangeZipCode = (event) => {
    setZipCodeWithMask(zipCodeMask(event.target.value));
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
                defaultValue=""
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
                // {...register("cpf")}
                type="text"
                className="form-control"
                id="cpf"
                name="cpf"
                placeholder="Ex: 123.456.789-10"
                maxLength={14}
                onChange={onChangeCpf}
                value={cpfWithMask}
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
                defaultValue=""
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
              <label htmlFor="zipCode">CEP</label>
              <input
                // {...register("zipCode")}
                type="text"
                className="form-control"
                id="zipCode"
                name="zipCode"
                maxLength="9"
                placeholder="Ex: 09112-000"
                onBlur={viacepSearch}
                value={zipCodeWithMask}
                onChange={onChangeZipCode}
                style={
                  validationState.zipcode !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
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

                        <div className="form-group col-md-2">
              <label htmlFor="houseNumber">Número</label>
              <input
                {...register("houseNumber")}
                type="text"
                className="form-control"
                id="houseNumber"
                name="houseNumber"
                placeholder="Ex: 123"
                style={
                  validationState.houseNumber !== undefined
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
              <label htmlFor="houseNumber">Número</label>
              <input
                {...register("houseNumber")}
                type="number"
                className="form-control"
                id="houseNumber"
                name="houseNumber"
                placeholder="Ex: 123"
                style={
                  validationState.houseNumber !== undefined
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
