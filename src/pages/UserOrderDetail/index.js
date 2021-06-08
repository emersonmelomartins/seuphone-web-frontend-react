/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetOrder } from "../../services/orderService";
import { formatPrice } from "../../util/formatPrice";
import { UserOrderDetailContainer, ProductTable } from "./styles";

export function UserOrderDetail() {
  const params = useParams();

  const [order, setOrder] = useState({});

  const id = params.id;

  useEffect(() => {
    GetOrder(id).then((resp) => {
      const [day, month, year] = new Date(resp.data.creationDate)
        .toLocaleDateString()
        .split("/");
      const creationDate = new Date(year, month, day).toLocaleDateString();
      const finalDate = new Date(
        Number(year) + resp.data.contractDuration,
        month,
        day
      ).toLocaleDateString();
      setOrder({ ...resp.data, creationDate, finalDate });
    });
  }, []);
  return (
    <UserOrderDetailContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Detalhe de Pedido {id}</h1>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="orderStatus">Situação</label>
              <input
                type="text"
                className="form-control"
                id="orderStatus"
                name="orderStatus"
                size="10"
                maxLength="9"
                value={order.orderStatus}
                disabled
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="paymentMethod">Método de pagamento</label>
              <input
                type="text"
                className="form-control"
                id="paymentMethod"
                name="paymentMethod"
                value={order.paymentMethod}
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="contractDuration">Duração do contrato</label>
              <input
                type="text"
                className="form-control"
                id="contractDuration"
                name="contractDuration"
                value={order.contractDuration}
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="creationDate">Data de Início</label>
              <input
                type="text"
                className="form-control"
                id="creationDate"
                name="creationDate"
                value={order.creationDate}
                disabled
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="finalDate">Data Final</label>
              <input
                // {...register("finalDate")}
                type="text"
                className="form-control"
                id="finalDate"
                name="finalDate"
                value={order.finalDate}
                disabled
              />
            </div>

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
                              <span>
                                {formatPrice(orderItem.product.price)}
                              </span>
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
          </div>
        </form>
      </div>
    </UserOrderDetailContainer>
  );
}
