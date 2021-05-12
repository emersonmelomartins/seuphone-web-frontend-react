import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

import { ProductCard } from "../../components/ProductCard";

import { GetAllProduct } from "../../services/productService";

import { ProductsContainer } from "./styles";
import { base64Image } from "../../assets/base64test";
import { useLoading } from "../../hooks/useLoading";

export function Products() {
  const [products, setProducts] = useState([]);

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    GetAllProduct().then(resp => {
      setProducts(resp.data);
      setLoading(false);
    },
    (error) => {
      toast.error("Ocorreu um erro ao carregar os produtos!");
      setLoading(false);
    });
  }, [setLoading]);

  return (
    <ProductsContainer>
      <h4 className="mt-5">Filtro de Busca</h4>
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
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      32GB
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      64GB
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      128GB
                      <span className="badge badge-primary badge-pill">1</span>
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
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Dourado
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Verde
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Space Gray
                      <span className="badge badge-primary badge-pill">1</span>
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
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      iPhone 7
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      iPhone XR
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      iPhone 12
                      <span className="badge badge-primary badge-pill">1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="d-flex flex-wrap">
            
            {products.map(product => (
              <ProductCard key={product.id} product={{...product, image: base64Image}} productQtd={1} />
            ))}
            
          </div>
        </div>
      </div>
    </ProductsContainer>
  );
}
