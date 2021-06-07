/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../../hooks/useLoading";
import { CreateProduct } from "../../../../services/productService";
import { GetAllProviders } from "../../../../services/providerService";
import { ProfileContainer } from "../../styles";

export function CreateProductForm() {
  const { register, handleSubmit, watch } = useForm();
  const { setLoading } = useLoading();
  const history = useHistory();
  const [validationState, setValidationState] = useState([]);
  const [providers, setProviders] = useState([]);
  const [imageProduct, setImageProduct] = useState("");

  useEffect(() => {
    _getAllProviders()
  }, []);

  const _getAllProviders = () => {
    setLoading(true);
    GetAllProviders().then(
      (resp) => {
        setProviders(resp.data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === 'object') {
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

  const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.productName === undefined || form.productName === null || form.productName === "") {
      hasError = true;
      validationState.productName = "error";
      toast.error("Você precisa informar um nome para o produto.");
    }

    if (form.description === undefined || form.description === null || form.description === "") {
      hasError = true;
      validationState.description = "error";
      toast.error("Você precisa informar uma descrição.");
    }

    if (form.model === undefined || form.model === null || form.model === "") {
      hasError = true;
      validationState.model = "error";
      toast.error("Você precisa informar um modelo.");
    }

    if (form.color === undefined || form.color === null || form.color === "") {
      hasError = true;
      validationState.color = "error";
      toast.error("Você precisa informar uma cor.");
    }

    if (form.storage === undefined || form.storage === null || form.storage === "") {
      hasError = true;
      validationState.storage = "error";
      toast.error("Você precisa informar uma mémoria.");
    }

    if (form.price === undefined || form.price === null || form.price === "") {
      hasError = true;
      validationState.price = "error";
      toast.error("Você precisa informar um preço do produto.");
    }

    if (imageProduct === undefined || imageProduct === null || imageProduct === "") {
      hasError = true;
      validationState.image = "error";
      toast.error("Você precisa inserir uma Foto do produto.");
    }

    if (form.providerId === undefined || form.providerId === null || form.providerId === "" || form.providerId === 0) {
      hasError = true;
      validationState.providerId = "error";
      toast.error("Você precisa informar um fornecedor.");
    }


    setValidationState(validationState);
    return hasError;
  };

  const onUploadImage = (event) => {
    let file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = function (evt) {
      var b64 = reader.result;

      setImageProduct(b64);

    };
    reader.readAsDataURL(file);
  };

  const createNewProduct = (form) => {
    setLoading(true);

    let data = {
      productName: form.productName,
      description: form.description,
      model: form.model,
      color: form.color,
      storage: form.storage,
      price: form.price,
      stockQuantity: 0,
      image: imageProduct,
      providerId: form.providerId
    }

    CreateProduct(data).then(
      (resp) => {
        setLoading(false);
        toast.success("Produto criado com sucesso!");
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

  function onSubmit(form) {
    if (!validationBeforeCreate()) {
      createNewProduct(form);
    }
  }

  return (
    <ProfileContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <div className="bg-light p-5 mx-auto styled-form">

          <h1 className="py-2 text-uppercase">Criar Produto</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 mx-auto"
          >
            <br />
            <h4>Informações do Produto</h4>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="productName">Nome do Produto</label>
                <input
                  {...register("productName")}
                  type="text"
                  className="form-control"
                  id="productName"
                  name="productName"
                  placeholder="Ex: Iphone X PRO MAX"
                  style={
                    validationState.productName !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="description">Descrição</label>
                <input
                  {...register("description")}
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Ex: Iphone X - Azul - 64GB"
                  style={
                    validationState.description !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="model">Modelo</label>
                <input
                  {...register("model")}
                  type="text"
                  className="form-control"
                  id="model"
                  name="model"
                  placeholder="Ex: Iphone X"
                  style={
                    validationState.model !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="color">Cor</label>
                <input
                  {...register("color")}
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  placeholder="Ex: Preto"
                  style={
                    validationState.color !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="storage">Memória</label>
                <select
                  id="storage"
                  name="storage"
                  {...register("storage")}
                  className="form-control"
                  defaultValue=""
                  style={
                    validationState.storage !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                >
                  <option value="">Selecione a Memória...</option>
                  <option value="16GB">16 Gb</option>
                  <option value="32GB">32 Gb</option>
                  <option value="64GB">64 Gb</option>
                  <option value="126GB">128 Gb</option>
                  <option value="256GB">256 Gb</option>
                  <option value="512GB">512 Gb</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="price">Preço</label>
                <input
                  {...register("price")}
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  step="0.01"
                  placeholder="Ex: 5999.99"
                  style={
                    validationState.price !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="image">Foto do Produto</label>
                <input
                  {...register("image")}
                  type="file"
                  id="image"
                  name="image"
                  onChange={onUploadImage}
                  accept=".png,.jpg,.jpeg"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="providerId">Fornecedor</label>
                <select
                  id="providerId"
                  name="providerId"
                  {...register("providerId")}
                  className="form-control"
                  style={
                    validationState.providerId !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                >
                  <option value="">Selecione o Fornecedor...</option>
                  {providers.map((data, index) => (
                    <option key={index} value={data.id}>{data.companyName}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-success btn-rounded-seuphone"
            >
              <i className="far fa-circle"></i> Criar
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
