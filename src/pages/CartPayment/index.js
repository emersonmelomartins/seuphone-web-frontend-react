/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Cards from "react-credit-cards";
import { useAuth } from "../../hooks/useAuth";
import "react-credit-cards/es/styles-compiled.css";

import { CartPaymentContainer } from "./styles";
import { useLoading } from "../../hooks/useLoading";
import { GetUser } from "../../services/userService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ProductTable } from "../Cart/styles";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/formatPrice";

export function CartPayment() {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [contractDuration, setContractDuration] = useState("");

  const { register } = useForm();

  const { cart } = useCart();

  const formattedCart = cart.map((product) => ({
    ...product,
    price: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.cartQuantity),
  }));

  const total = cart.reduce((acc, product) => {
    acc += product.price * product.cartQuantity;
    return acc;
  }, 0);

  const { user } = useAuth();
  const { setLoading } = useLoading();

  const [userInfo, setUserInfo] = useState({});

  const userid = user.decodedToken.nameid;

  useEffect(() => {
    _getUser();
  }, []);

  const _getUser = () => {
    setLoading(true);
    GetUser(userid).then(
      (resp) => {
        const [date] = new Date(resp.data.birthDate)
          .toLocaleString()
          .split(" ");
        resp.data.birthDate = date;

        console.log(resp.data);
        setUserInfo(resp.data);
        setLoading(false);
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

          <div className="row">
            <div className="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Seu endereço atual:</h5>
                  <p style={{ lineHeight: "10px" }}>
                    Logradouro: {userInfo.address}
                  </p>
                  <p style={{ lineHeight: "10px" }}>
                    Bairro: {userInfo.district}
                  </p>
                  <p style={{ lineHeight: "10px" }}>
                    Número: {userInfo.houseNumber}
                  </p>
                  <p style={{ lineHeight: "10px" }}>Cidade: {userInfo.city}</p>
                  <p style={{ lineHeight: "10px" }}>Estado: {userInfo.state}</p>
                  <a href="/" class="card-link">
                    Atualizar endereço
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="contractDuration">
                  <h5>Duração Contrato</h5>
                </label>
                <select
                  id="contractDuration"
                  name="contractDuration"
                  {...register("contractDuration")}
                  onChange={(event) => setContractDuration(event.target.value)}
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
                value="creditCard"
                onClick={(event) => setPaymentMethod(event.target.value)}
              />
              <Form.Check
                inline
                label="Carnê"
                name="group1"
                type="radio"
                id="inline-radio-2"
                value="paymentBooklet"
                onClick={(event) => setPaymentMethod(event.target.value)}
              />
            </div>
          </div>

          {paymentMethod === "paymentBooklet" ? (
            <p className="p-5">
              Seu carnê será gerado após a finalização do pedido.
            </p>
          ) : paymentMethod === "creditCard" ? (
            <div className="row mt-3">
              <div className="col-sm-4 mt-4">
                <Cards
                  cvc={cvc}
                  expiry={expiry}
                  focused={focus}
                  name={name}
                  number={number}
                />
              </div>

              <div className="col-sm-8">
                <div className="form-row">
                  <div className="form-group col-sm-8">
                    <label htmlFor="number">Número do Cartão</label>
                    <input
                      type="number"
                      className="form-control"
                      id="number"
                      name="number"
                      placeholder="1234 5678 9101 1121"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      // style={
                      //   validationState.address !== undefined
                      //     ? { border: "1px solid red" }
                      //     : {}
                      // }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="name">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Emerson M Martins"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      // style={
                      //   validationState.address !== undefined
                      //     ? { border: "1px solid red" }
                      //     : {}
                      // }
                    />
                  </div>

                  <div className="form-group col-sm-2">
                    <label htmlFor="expiry">Validade</label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiry"
                      name="expiry"
                      placeholder="01/02"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      // style={
                      //   validationState.address !== undefined
                      //     ? { border: "1px solid red" }
                      //     : {}
                      // }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-sm-3">
                    <label htmlFor="cvc">Cód Segurança</label>
                    <input
                      type="number"
                      className="form-control"
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      // style={
                      //   validationState.address !== undefined
                      //     ? { border: "1px solid red" }
                      //     : {}
                      // }
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="p-5">
              Selecione uma das opções acima para prosseguir com o pagamento.
            </p>
          )}

          <div className="form-row my-3">
            <div className="form-group col-md-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Resumo do Pedido:</h5>
                  <ProductTable>
                    <thead>
                      <tr>
                        <th aria-label="product image" />
                        <th>Produto</th>
                        <th>Qtd.</th>
                        <th>Subtotal</th>
                        <th aria-label="delete icon" />
                      </tr>
                    </thead>
                    <tbody>
                      {formattedCart.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <img src={product.image} alt="" />
                          </td>
                          <td>
                            <strong>{product.description}</strong>
                            <span>{product.price}</span>
                          </td>
                          <td>{product.cartQuantity}</td>
                          <td>
                            <strong>{product.subTotal}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </ProductTable>

                  <br />
                  <footer>
                    <p style={{ color: "#999", fontWeight: "bold" }}>
                      Duração -{" "}
                      {contractDuration === ""
                        ? "N/A"
                        : `${contractDuration} ano(s)`}
                    </p>
                    <p style={{ color: "#999", fontWeight: "bold" }}>
                      Tipo de Pagamento -{" "}
                      {paymentMethod === "creditCard"
                        ? "Cartão de Crédito"
                        : paymentMethod === "paymentBooklet" && "Carnê"}
                    </p>
                    <p style={{ color: "#999", fontWeight: "bold" }}>
                      Qtd. Parcelas -{" "}
                      {Number(contractDuration) === 1
                        ? `12x ${formatPrice(total / 12)}`
                        : Number(contractDuration) === 2
                        ? `24x ${formatPrice(total / 24)}`
                        : "N/A"}
                    </p>
                    <p
                      style={{
                        color: "#222",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      TOTAL - {formatPrice(total)}
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </div>

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
