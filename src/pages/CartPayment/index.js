import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import { CartPaymentContainer } from "./styles";

export function CartPayment() {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "number":
        setNumber(value);
        break;
      case "name":
        setName(value);
        break;
      case "expiry":
        setExpiry(value);
        break;
      case "cvc":
        setCvc(value);
        break;
      default:
        break;
    }
  };

  return (
    <CartPaymentContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Pagamento</h1>

          <div className="form-row">
            <div className="form-group col-md-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Resumo do Pedido:</h5>
                  xxx
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Seu endereço atual:</h5>
                  <p style={{ lineHeight: "10px" }}>Rua: Tal</p>
                  <p style={{ lineHeight: "10px" }}>Bairro: Aquele</p>
                  <p style={{ lineHeight: "10px" }}>Endereço: Logo ali</p>
                  <p style={{ lineHeight: "10px" }}>Número: 888</p>
                  <p style={{ lineHeight: "10px" }}>Cidade: São Paulo</p>
                  <p style={{ lineHeight: "10px" }}>Estado: SP</p>
                  <a href="/" class="card-link">
                    Atualizar endereço
                  </a>
                </div>
              </div>

            </div>

            <div className="col-sm-6">
<div className="form-group">
              <label htmlFor="genre"><h5>Duração Contrato</h5></label>
              <select
                id="genre"
                name="genre"
                // {...register("genre")}
                className="form-control"
                defaultValue=""
              >
                <option value="">Selecione a duração...</option>
                <option value="1">1 ano</option>
                <option value="2">2 anos</option>
              </select>
            </div>
            </div>

          </div>


          <div className="row mt-3">
            <div className="col-sm-12 text-center">
              <h5>Tipo de pagamento</h5>
          <Form.Check
            inline
            label="Cartão de Crédito"
            name="group1"
            type="radio"
            id="inline-radio-1"
            value="yes"
            // onClick={(event) => setTerms(event.target.value)}
          />
          <Form.Check
            inline
            label="Boleto"
            name="group1"
            type="radio"
            id="inline-radio-2"
            value="no"
            // onClick={(event) => setTerms(event.target.value)}
          />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-6">
              <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
              />
            </div>
            <div className="col-sm-6">
              <input
                type="number"
                name="number"
                placeholder="Número do Cartão"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type="text"
                name="name"
                placeholder="Nome"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Validade"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type="text"
                name="cvc"
                placeholder="Cvc"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>

          <br />
          <br />

          <div className="row">
            <div className="col-sm-12">
              <button
                type="button"
                className="btn btn-seuphone-outline-black btn-block btn-rounded-seuphone"
                id="btn-login"
                // onClick={handleSubmit}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </form>
      </div>
    </CartPaymentContainer>
  );
}
