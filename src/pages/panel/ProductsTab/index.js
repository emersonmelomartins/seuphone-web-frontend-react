/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDeleteForever, MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { GetAllProduct } from "../../../services/productService";
import { ButtonCreate, Product } from "../styles";

export function ProductsTab() {
  const [product, setProduct] = useState([]);
  const { setLoading } = useLoading();

  const obj = {
    limit: 0,
    productName: ""
  }

  useEffect(() => {
    _getAllProduct(obj);
  }, []);

  const _getAllProduct = (obj) => {
    setLoading(true);
    GetAllProduct(obj).then(
      (resp) => {
        setProduct(resp.data);
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

  return (
    <>
      <ButtonCreate>
        <div className="div-button">
          <Button className="button-create-product" variant="outline-dark">
            <MdAddCircle className="icon-button" size={20} /> Adicionar Produto
      </Button>
        </div>
      </ ButtonCreate>
      {product.length >= 1 ? (
        <Product>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nome Produto</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Qtd. Estoque</th>
              <th>Fornecedor</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {product.map((data, index) => (
              <tr key={index}>
                <td>Foto do Produto</td>
                <td>{data.id}</td>
                <td>
                  <span>{data.productName}</span>
                </td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.stockQuantity}</td>
                <td>{data.provider.companyName}</td>
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
        </Product>
      ) : (
        <p>Não há Produtos cadastrados.</p>
      )}
    </>
  );
}
