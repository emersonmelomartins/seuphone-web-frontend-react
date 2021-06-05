/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDeleteForever, MdAddCircle, MdVisibility } from "react-icons/md";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { GetAllOrders } from "../../../services/orderService";
import { formatPrice } from "../../../util/formatPrice";
import { ButtonCreate, Orders } from "../styles";

export function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    _getAllOrders();
  }, []);

  const _getAllOrders = () => {
    setLoading(true);
    GetAllOrders(1).then(
      (resp) => {
        const updatedData = resp.data.map((item) => {
          return {
            ...item,
            formattedTotal: formatPrice(item.total),
            itemQuantity: item.orderItems.length,
          };
        });
        setOrders(updatedData);
        setLoading(false);
      },
      (error) => { 
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if(typeof erro.errors === 'object') {
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
      <ButtonCreate>
        <div className="div-button">
          <Button className="button-create" variant="outline-dark">
          <MdAddCircle className="icon-button" size={20} /> Criar Pedido
      </Button>
        </div>
      </ ButtonCreate>
      {orders.length >= 1 ? (
        <Orders>
          <thead>
            <tr>
              <th>Nº Pedido</th>
              <th>Situação</th>
              <th>Qtd. Itens</th>
              <th>Total</th>
              <th>Nota Fiscal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((data, index) =>
            
            (
              <tr key={index}> 
                <td>{data.id}</td>
                <td>
                  <span>{data.orderStatus}</span>
                </td>
                <td>{data.itemQuantity} item(ns)</td>
                <td>
                  <strong>{data.formattedTotal}</strong>
                </td>
                <td>
                  <button type="button">
                    <MdVisibility size={20} />
                  </button>
                </td>
                <td>
                  <button type="button">
                    <MdModeEdit size={20} />
                  </button>
                </td>
                <td>
                  <button type="button">
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Orders>
      ) : (
        <p>Não há Pedidos de Compra de Estoque.</p>
      )}
    </>
  );
}
