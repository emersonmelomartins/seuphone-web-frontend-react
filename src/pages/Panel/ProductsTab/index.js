/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDeleteForever, MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import {  DeleteProduct, GetAllProductAdmin } from "../../../services/productService";
import { ButtonCreate, Product } from "../styles";
import confirmService from "../../../components/confirmDialog";

export function ProductsTab() {
  const [product, setProduct] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    _getAllProduct();
  }, []);

  const _getAllProduct = () => {
    setLoading(true);
    GetAllProductAdmin().then(
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

  const showDeleteDialog = async (id) => {
    let props = {}

    const result = await confirmService.show(props);
    if (result) {
      DeleteProduct(id).then(
        (data) => {
          toast.success("Produto deletado com sucesso!");
          let tbl = product.filter(
            (c) => !(c.id === id)
          );
          setProduct(tbl);
        },
        (error) => {
          toast.error("Não foi possível deletar os dados.");
        }
      );
    }
  };

  return (
    <>
    <h5>Produtos</h5>
      <ButtonCreate>
        <div className="div-button">
          <Link to="/panel/create-product">
            <Button className="button-create-product" variant="outline-dark">
              <MdAddCircle className="icon-button" size={20} /> Adicionar Produto
            </Button>
          </Link>
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
                <td> <img className="img-product" src={data.image} alt={data.model} /></td>
                <td>{data.id}</td>
                <td>
                  <span>{data.productName}</span>
                </td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.stockQuantity}</td>
                <td>{data.provider.companyName}</td>
                <td>
                  <Link to={"/panel/update-product/" + data.id}>
                  <button type="button">
                    <MdModeEdit size={20} />
                  </button>
                  </Link>
                </td>
                <td>
                  <button type="button" onClick={() =>
                    showDeleteDialog(data.id)
                  }>
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
