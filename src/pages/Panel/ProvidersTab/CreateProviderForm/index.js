/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../../hooks/useLoading";
import { CreateProvider } from "../../../../services/providerService";
import { zipCodeMask } from "../../../../util/zipCodeMask";
import { cnpjMask } from "../../../../util/cnpjMask";
import { ProfileContainer } from "../../styles";

export function CreateProviderForm() {
  const { register, setValue, handleSubmit, watch } = useForm();
  const { setLoading } = useLoading();
  const history = useHistory();
  const [validationState, setValidationState] = useState([]);
  const [cnpjWithMask, setCnpjWithMask] = useState("");
  const [zipCodeWithMask, setZipCodeWithMask] = useState("");

  useEffect(() => {
  }, []);

  async function viacepSearch(event) {
    const valor = event.target.value;
    var cep = valor.replace(/\D/g, "");

    if (cep !== "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        setValue("city", "...");
        setValue("district", "...");
        setValue("address", "...");
        setValue("state", "...");

        const response = await axios.get(
          "https://viacep.com.br/ws/" + cep + "/json/"
        );

        const viacep = response.data;

        setValue("city", viacep.localidade);
        setValue("district", viacep.bairro);
        setValue("address", viacep.logradouro);
        setValue("state", viacep.uf);
      } else {
        toast.error("Cep inválido!");
      }
    }
  }

  const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.companyName === undefined || form.companyName === null || form.companyName === "") {
      hasError = true;
      validationState.companyName = "error";
      toast.error("Você precisa informar o nome fantasia.");
    }

    if (
      form.cnpj === undefined ||
      form.cnpj === null ||
      form.cnpj === ""
    ) {
      hasError = true;
      validationState.cnpj = "error";
      toast.error("Você precisa informar o Cnpj.");
    }

    if (zipCodeWithMask === undefined || zipCodeWithMask === null || zipCodeWithMask === "") {
      hasError = true;
      validationState.zipCode = "error";
      toast.error("Você precisa informar o CEP.");
    }

    if (form.address === undefined || form.address === null || form.address === "") {
      hasError = true;
      validationState.address = "error";
      toast.error("Você precisa informar o logradouro.");
    }

    if (
      form.houseNumber === undefined ||
      form.houseNumber === null ||
      form.houseNumber === ""
    ) {
      hasError = true;
      validationState.houseNumber = "error";
      toast.error("Você precisa informar o número do estabelecimento.");
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

    if (
      form.city === undefined ||
      form.city === null ||
      form.city === ""
    ) {
      hasError = true;
      validationState.city = "error";
      toast.error("Você precisa informar a cidade.");
    }

    if (
      form.state === undefined ||
      form.state === null ||
      form.state === ""
    ) {
      hasError = true;
      validationState.state = "error";
      toast.error("Você precisa informar o estado.");
    }

    setValidationState(validationState);
    return hasError;
  };

  const createNewProvider = (form) => {
    setLoading(true);

    let data = {
      ...form,
      zipCode: zipCodeWithMask
    }

    CreateProvider(data).then(
      (resp) => {
        setLoading(false);
        toast.success("Fornecedor cadastrado com sucesso!");
        history.push('/panel')
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

  const onChangeCnpj = (event) => {
    setCnpjWithMask(cnpjMask(event.target.value));
  };

  const onChangeZipCode = (event) => {
    setZipCodeWithMask(zipCodeMask(event.target.value));
  };

  function onSubmit(form) {
    if (!validationBeforeCreate()) {
      createNewProvider(form);
    }
  }

  return (
    <ProfileContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <div className="bg-light p-5 mx-auto styled-form">

          <h1 className="py-2 text-uppercase">Cadastro de Fornecedor</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 mx-auto"
          >
            <br />
            <h4>Informações do Fornecedor</h4>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="companyName">Nome Fantasia</label>
                <input
                  {...register("companyName")}
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  placeholder="Ex: Apple LTDA."
                  style={
                    validationState.companyName !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  {...register("cnpj")}
                  type="cnpj"
                  className="form-control"
                  id="cnpj"
                  name="cnpj"
                  maxLength="18"
                  placeholder="Ex: 00.623.904/0001-73"
                  value={cnpjWithMask}
                  onChange={onChangeCnpj}
                  style={
                    validationState.cnpj !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <br />

            <br />
            <h4>Endereço</h4>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="zipCode">CEP</label>
                <input
                  {...register("zipCode")}
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="zipCode"
                  size="10"
                  maxLength="9"
                  defaultValue=""
                  placeholder="Ex: 09112-000"
                  onBlur={viacepSearch}
                  value={zipCodeWithMask}
                  onChange={onChangeZipCode}
                  style={
                    validationState.zipCode !== undefined
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

            <Link to="/panel">
              <button
                className="btn btn-outline-danger btn-rounded-seuphone"
              >
                <i className="far fa-circle"></i> Voltar
          </button>
            </Link>
          </form>

        </div>
      </div>
    </ProfileContainer>

  );
}
