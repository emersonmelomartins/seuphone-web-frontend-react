import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ProductCard } from "../../components/ProductCard";

import { GetAllProduct } from "../../services/productService";

import { ProductsContainer } from "./styles";
import { useLoading } from "../../hooks/useLoading";
import { useLocation } from "react-router";

export function Products() {
  const [products, setProducts] = useState([]);

  const { setLoading } = useLoading();

  const location = useLocation();

  useEffect(() => {
    const productName =
      new URLSearchParams(location.search).get("productName") ?? "";

    const obj = {
      productName,
    };

    _getAllProduct(obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading, location]);

  const _getAllProduct = (obj) => {
    setLoading(true);
    GetAllProduct(obj).then(
      (resp) => {
        if(resp.data.length < 1) {
          toast.warning("Não foi encontrado resultado.");
        }
        setProducts(resp.data);
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

  return (
    <ProductsContainer>
      <h4 className="mt-5">Filtro de Busca</h4>
      <button onClick={() => _getAllProduct({productName: null})}>Limpar Filtro</button>
      <div className="row">
        <div className="col-3">
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Armazenamento
                  </button>
                </h5>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body p-0">
                  <ul className="list-group">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={() => _getAllProduct({ productName: "32gb" })} style={{cursor: 'pointer'}}
                    >
                      32GB
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={() => _getAllProduct({ productName: "64gb" })} style={{cursor: 'pointer'}}
                    >
                      64GB
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "128gb" })} style={{cursor: 'pointer'}}>
                      128GB
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Cor
                  </button>
                </h5>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body p-0">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "dourado" })} style={{cursor: 'pointer'}}>
                      Dourado
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "verde" })} style={{cursor: 'pointer'}}>
                      Verde
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "cinza" })} style={{cursor: 'pointer'}}>
                      Cinza
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Modelo
                  </button>
                </h5>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div className="card-body p-0">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "iphone X" })} style={{cursor: 'pointer'}}>
                      iPhone X
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "iphone 11" })} style={{cursor: 'pointer'}}>
                      iPhone 11
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => _getAllProduct({ productName: "iphone 12" })} style={{cursor: 'pointer'}}>
                      iPhone 12
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="d-flex flex-wrap">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} productQtd={1} />
            ))}
          </div>
        </div>
      </div>
    </ProductsContainer>
  );
}
