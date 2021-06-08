/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { MdPictureAsPdf } from "react-icons/md";
import { Link } from "react-router-dom";
import { GetAllOrderByUser, GetOrderPDF } from "../../../services/orderService";
import { formatPrice } from "../../../util/formatPrice";
import { Orders } from "../styles";
import { useLoading } from "../../../hooks/useLoading";
import { toast } from "react-toastify";

export function OrdersTab({ userid }) {
  const { setLoading } = useLoading();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    _getAllOrderByUser(userid);
  }, []);

  const _getAllOrderByUser = (userid) => {
    setLoading(true);
    GetAllOrderByUser(userid).then(
      (resp) => {
        setLoading(false);
        const updatedData = resp.data.map((item) => {
          return {
            ...item,
            formattedTotal: formatPrice(item.total),
            itemQuantity: item.orderItems.length,
          };
        });
        setOrders(updatedData);
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

  const _getOrderPDF = (id) => {
    setLoading(true);
    GetOrderPDF(id).then(
      (resp) => {
        setLoading(false);
        const file = new Blob([resp.data], { type: "application/pdf" });

        const fileURL = URL.createObjectURL(file);

        saveAs(fileURL, `seuphone-pedido-${id}.pdf`);
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
                  <button type="button" onClick={() => _getOrderPDF(order.id)}>
                    <MdPictureAsPdf size={20} />
                  </button>
                </td>
                <td>
                  <Link to={"/user-order-detail/" + order.id}>
                    <button>Ver detalhes</button>
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
