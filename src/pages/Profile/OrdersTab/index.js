/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { Link } from "react-router-dom";
import { GetAllOrderByUser } from "../../../services/orderService";
import { formatPrice } from "../../../util/formatPrice";
import { Orders } from "../styles";

export function OrdersTab({ userid }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    _getAllOrderByUser(userid);
  }, []);

  const _getAllOrderByUser = (userid) => {
    GetAllOrderByUser(userid).then(
      (resp) => {
        const updatedData = resp.data.map((item) => {
          return {
            ...item,
            formattedTotal: formatPrice(item.total),
            itemQuantity: item.orderItems.length,
          };
        });
        setOrders(updatedData);
      },
      (error) => {}
    );
  };

  return (
    <>
      {orders.length >= 1 ? (
        <Orders>
          <thead>
            <tr>
              <th>Nº Pedido</th>
              <th>Situação</th>
              <th>Duração Contrato</th>
              <th>Qtd. Itens</th>
              <th>Total</th>
              <th>PDF Contrato</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order.id}</td>
                <td>
                  <span>{order.orderStatus}</span>
                </td>
                <td>{order.contractDuration} ano(s)</td>
                <td>{order.itemQuantity} item(ns)</td>
                <td>
                  <strong>{order.formattedTotal}</strong>
                </td>
                <td>
                  <button type="button">
                    <MdPictureAsPdf size={20} />
                  </button>
                </td>
                <td>
                  <Link to={"/user-order-detail/" + order.id}>
                    <button>
                      Ver detalhes

                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Orders>
      ) : (
        <p>Não há pedidos.</p>
      )}
    </>
  );
}
