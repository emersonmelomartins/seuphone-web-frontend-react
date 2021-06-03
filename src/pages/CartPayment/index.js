/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Cards from "react-credit-cards";
import { useAuth } from "../../hooks/useAuth";
import { FiCheckCircle } from "react-icons/fi";
import "react-credit-cards/es/styles-compiled.css";

import { CartPaymentContainer } from "./styles";
import { useLoading } from "../../hooks/useLoading";
import { GetUser } from "../../services/userService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ProductTable } from "../Cart/styles";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/formatPrice";
import { CreateOrder } from "../../services/orderService";
import { useHistory } from "react-router";

export function CartPayment() {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [validationState, setValidationState] = useState([]);
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [contractDuration, setContractDuration] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [succeededPayment, setSucceededPayment] = useState(false);
  const [orderId, setOrderId] = useState("");

  const formattedCart = cart.map((product) => ({
    ...product,
    price: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.cartQuantity),
  }));

  const total = cart.reduce((acc, product) => {
    acc += product.price * product.cartQuantity;
    return acc;
  }, 0);

  const cartSize = cart.length;

  const userid = user.decodedToken.nameid;

  useEffect(() => {
    _getUser();
    cartSize < 1 && !succeededPayment && history.push("/");
  }, []);

  const _getUser = () => {
    setLoading(true);
    GetUser(userid).then(
      (resp) => {
        const [date] = new Date(resp.data.birthDate)
          .toLocaleString()
          .split(" ");
        resp.data.birthDate = date;

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

  const validationBeforeCreate = (obj) => {
    let hasError = false;
    let validationState = {};

    if (
      obj.contractDuration === undefined ||
      obj.contractDuration === null ||
      obj.contractDuration === "" ||
      obj.contractDuration === 0
    ) {
      hasError = true;
      validationState.contractDuration = "error";
      toast.error("Você precisa selecionar a duração do contrato.");
    }

    if (
      obj.paymentMethod === undefined ||
      obj.paymentMethod === null ||
      obj.paymentMethod === "" ||
      obj.paymentMethod === 0
    ) {
      hasError = true;
      validationState.paymentMethod = "error";
      toast.error("Você precisa selecionar o método de pagamento.");
    }

    if (obj.paymentMethod === 1 && number === "") {
      hasError = true;
      validationState.number = "error";
      toast.error("Você precisa inserir o número.");
    }

    if (obj.paymentMethod === 1 && name === "") {
      hasError = true;
      validationState.name = "error";
      toast.error("Você precisa inserir o nome.");
    }

    if (obj.paymentMethod === 1 && expiry === "") {
      hasError = true;
      validationState.expiry = "error";
      toast.error("Você precisa inserir a validade.");
    }

    if (obj.paymentMethod === 1 && cvc === "") {
      hasError = true;
      validationState.cvc = "error";
      toast.error("Você precisa inserir o cód. segurança.");
    }

    setValidationState(validationState);
    return hasError;
  };

  const onSubmit = () => {
    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.cartQuantity,
      subTotal: item.price * item.cartQuantity,
    }));

    const obj = {
      userId: Number(userid),
      creationDate: new Date(),
      orderStatus: 0,
      contractDuration: Number(contractDuration),
      paymentMethod: Number(paymentMethod),
      orderItems,
      total,
      orderType: 2
    };

    if (!validationBeforeCreate(obj)) {
      setLoading(true);
      CreateOrder(obj).then(
        (resp) => {
          setLoading(false);
          setSucceededPayment(true);
          setOrderId(resp.data.id);
          setCart([]);
          localStorage.removeItem("@Seuphone::cart");
          toast.success("Seu pedido foi criado com sucesso!");
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
    }
  };
  return (
    <CartPaymentContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          {!succeededPayment ? (
            <>
              <h1 className="py-2 text-uppercase">Pagamento</h1>

              <div className="row">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Seu endereço atual:</h5>
                      <p style={{ lineHeight: "10px" }}>
                        Logradouro: {userInfo.address}
                      </p>
                      <p style={{ lineHeight: "10px" }}>
                        Bairro: {userInfo.district}
                      </p>
                      <p style={{ lineHeight: "10px" }}>
                        Número: {userInfo.houseNumber}
                      </p>
                      <p style={{ lineHeight: "10px" }}>
                        Cidade: {userInfo.city}
                      </p>
                      <p style={{ lineHeight: "10px" }}>
                        Estado: {userInfo.state}
                      </p>
                      <a href="/profile?tab=address" className="card-link">
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
                      onChange={(event) =>
                        setContractDuration(event.target.value)
                      }
                      className="form-control"
                      defaultValue=""
                      style={
                        validationState.contractDuration !== undefined
                          ? { border: "1px solid red" }
                          : {}
                      }
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
                    value="1"
                    onClick={(event) => setPaymentMethod(event.target.value)}
                    style={
                      validationState.paymentMethod !== undefined
                        ? { border: "1px solid red" }
                        : {}
                    }
                  />
                  <Form.Check
                    inline
                    label="Carnê"
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                    value="2"
                    onClick={(event) => setPaymentMethod(event.target.value)}
                    style={
                      validationState.paymentMethod !== undefined
                        ? { border: "1px solid red" }
                        : {}
                    }
                  />
                </div>
              </div>

              {paymentMethod === "2" ? (
                <p className="p-5">
                  Seu carnê será gerado após a finalização do pedido.
                </p>
              ) : paymentMethod === "1" ? (
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
                          maxLength={16}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          style={
                            validationState.number !== undefined
                              ? { border: "1px solid red" }
                              : {}
                          }
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
                          style={
                            validationState.name !== undefined
                              ? { border: "1px solid red" }
                              : {}
                          }
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
                          style={
                            validationState.expiry !== undefined
                              ? { border: "1px solid red" }
                              : {}
                          }
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
                          style={
                            validationState.cvc !== undefined
                              ? { border: "1px solid red" }
                              : {}
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="p-5">
                  Selecione uma das opções acima para prosseguir com o
                  pagamento.
                </p>
              )}

              <div className="form-row my-3">
                <div className="form-group col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Resumo do Pedido:</h5>
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
                          {
                          paymentMethod === "1"
                            ? "Cartão de Crédito"
                            : paymentMethod === "2" 
                            ? "Carnê" 
                            : "N/A"
                            }
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
                    type="submit"
                    className="btn btn-seuphone-outline-black btn-block btn-rounded-seuphone"
                    id="btn-login"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="content p-5 text-center">
              <FiCheckCircle size={80} color={"#4BB543"} />
              <h1 className="mb-4">Tudo pronto!</h1>
              <h2 className="mb-4">O número do seu pedido é: {orderId}</h2>
              <div>
                <p>Seu pedido foi concluído com sucesso!</p>
                <p>
                  Assim que o pagamento for aprovado, trabalharemos para dar o
                  próximo passo e você receber seu pedido!
                </p>

                <br />
                <div>
                  <a href="/">Voltar para home</a>
                  <br />
                  <a href="/profile">Voltar para meus pedidos</a>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </CartPaymentContainer>
  );
}
