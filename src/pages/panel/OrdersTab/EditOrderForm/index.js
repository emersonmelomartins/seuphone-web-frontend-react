/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { useLoading } from "../../../../hooks/useLoading";
import { GetOrder, UpdateOrderStatus } from "../../../../services/orderService";
import { formatPrice } from "../../../../util/formatPrice";
import { ProductTable } from "../../../Cart/styles";
import { EditOrderContainer } from "./styles";

export function EditOrderForm() {
  const params = useParams();
  const history = useHistory();

  const { register, setValue, handleSubmit, watch } = useForm();
  const { setLoading } = useLoading();

  const [validationState, setValidationState] = useState([]);

  const [order, setOrder] = useState({});
  const [orderType, setOrderType] = useState(0);
  const [orderStatus, setOrderStatus] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const id = params.id;

  const isNew = !id ? true : false;

  useEffect(() => {
    if (!isNew) {
      setDisabled(true);
      _getOrder();
    }
  }, []);

  const _getOrder = () => {
    setLoading(true);
    GetOrder(id).then(
      (resp) => {
        const [day, month, year] = new Date(resp.data.creationDate)
          .toLocaleDateString()
          .split("/");
        const creationDate = new Date(year, month, day).toLocaleDateString();
        const finalDate = new Date(
          Number(year) + resp.data.contractDuration,
          month,
          day
        ).toLocaleDateString();

        switch (resp.data.orderStatus) {
          case "Aguardando":
            setValue("orderStatus", 0);
            break;
          case "Recebido":
            setValue("orderStatus", 1);
            break;
          case "Cancelado":
            setValue("orderStatus", 2);
            break;
          default:
            setValue("");
        }

        switch (resp.data.paymentMethod) {
          case "Cartão de Crédito":
            setValue("paymentMethod", 1);
            break;
          case "Carnê":
            setValue("paymentMethod", 2);
            break;
          default:
            setValue("");
        }

        switch (resp.data.orderType) {
          case "Entrada":
            setValue("orderType", 1);
            break;
          case "Saída":
            setValue("orderType", 2);
            break;
          default:
            setValue("");
        }

        setValue("contractDuration", resp.data.contractDuration);

        setOrder({ ...resp.data, creationDate, finalDate });
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

  // const _getAllProducts = () => {

  // }

  const updateOrderStatus = (form) => {
    setLoading(true);

    const obj = {
      id,
      orderStatus: Number(form.orderStatus),
    };

    console.log(obj);

    UpdateOrderStatus(obj).then(
      (resp) => {
        setLoading(false);
        toast.success("Situação da ordem de pedido atualizada com sucesso!");
        history.push("/panel");
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

  const validationBeforeUpdate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (
      form.orderStatus === undefined ||
      form.orderStatus === null ||
      form.orderStatus === ""
    ) {
      hasError = true;
      validationState.orderStatus = "error";
      toast.error("Você precisa informar a situação.");
    }

    setValidationState(validationState);
    return hasError;
  };

  function onSubmit(form) {
    if (!validationBeforeUpdate()) {
      !isNew ? updateOrderStatus(form) : console.log(form);
    }
  }

  return (
    <EditOrderContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-light p-5 mx-auto"
        >
          <h1 className="py-2 text-uppercase">Detalhe de Pedido {id}</h1>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="orderStatus">Situação</label>
              <select
                id="orderStatus"
                name="orderStatus"
                className="form-control"
                {...register("orderStatus")}
                onChange={(event) => setOrderStatus(Number(event.target.value))}
                style={
                  validationState.orderStatus !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              >
                <option value="">Selecione a situação...</option>
                <option value="0">Aguardando</option>
                <option value="1">Recebido</option>
                <option value="2">Cancelado</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="paymentMethod">Método de Pagamento</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="form-control"
                {...register("paymentMethod")}
                disabled={disabled}
                onChange={(event) => setPaymentMethod(Number(event.target.value))}
                style={
                  validationState.paymentMethod !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              >
                <option value="">Selecione o método...</option>
                <option value="1">Cartão de Crédito</option>
                <option value="2">Carnê</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="orderType">Tipo de Pedido</label>
              <select
                id="orderType"
                name="orderType"
                className="form-control"
                {...register("orderType")}
                disabled={disabled}
                onChange={(event) => setOrderType(Number(event.target.value))}
                style={
                  validationState.orderType !== undefined
                    ? { border: "1px solid red" }
                    : {}
                }
              >
                <option value="">Selecione o tipo...</option>
                <option value="1">Entrada</option>
                <option value="2">Saída</option>
              </select>
            </div>

            {orderType === 2 && (
              <div className="form-group col-md-4">
                <label htmlFor="contractDuration">Duração do contrato</label>
                <select
                  id="contractDuration"
                  name="contractDuration"
                  className="form-control"
                  {...register("contractDuration")}
                  disabled={disabled}
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
            )}
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="creationDate">Data de Início</label>
              <input
                type="text"
                className="form-control"
                id="creationDate"
                name="creationDate"
                value={
                  !isNew ? order.creationDate : new Date().toLocaleDateString()
                }
                disabled
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="finalDate">Data Final</label>
              <input
                type="text"
                className="form-control"
                id="finalDate"
                name="finalDate"
                value={!isNew ? order.finalDate : "Aguardando duração..."}
                disabled
              />
            </div>
          </div>

          {!isNew ? (
            <div className="form-row">
              <div className="form-group col-md-4">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-rounded-seuphone"
                >
                  <i className="far fa-circle"></i> Atualizar
                </button>
              </div>
            </div>
          ) : (
            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="product">Produtos</label>
                <select
                  id="product"
                  name="product"
                  className="form-control"
                  {...register("product")}
                  style={
                    validationState.product !== undefined
                      ? { border: "1px solid red" }
                      : {}
                  }
                >
                  <option value="">Selecione o produto...</option>
                </select>
              </div>

              <div className="form-group col-md-3">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-rounded-seuphone"
                  style={{ marginTop: "31px" }}
                >
                  <i className="far fa-circle"></i> Adicionar
                </button>
              </div>
            </div>
          )}

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
                    {order.orderItems &&
                      order.orderItems.map((orderItem) => (
                        <tr key={orderItem.product.id}>
                          <td>
                            <img src={orderItem.product.image} alt="" />
                          </td>
                          <td>
                            <strong>{orderItem.product.description}</strong>
                            <span>{formatPrice(orderItem.product.price)}</span>
                          </td>
                          <td>{orderItem.quantity}</td>
                          <td>
                            <strong>{formatPrice(orderItem.subTotal)}</strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </ProductTable>

                <br />
                <footer>
                  <p style={{ color: "#999", fontWeight: "bold" }}>
                    Qtd. Parcelas -{" "}
                    {Number(order.contractDuration) === 1
                      ? `12x ${formatPrice(order.total / 12)}`
                      : Number(order.contractDuration) === 2
                      ? `24x ${formatPrice(order.total / 24)}`
                      : "N/A"}
                  </p>
                  <p
                    style={{
                      color: "#222",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    TOTAL - {formatPrice(order.total)}
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </form>
      </div>
    </EditOrderContainer>
  );
}
