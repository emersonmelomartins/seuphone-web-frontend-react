import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { ProductDetailContainer } from "./styles";
import { GetProduct } from "../../services/productService";

import { base64Image } from "../../assets/base64test";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { useLoading } from "../../hooks/useLoading";

export function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [qtd, setQtd] = useState(1);

  const { addProduct } = useCart();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    GetProduct(id).then((resp) => {
      setProduct({
        ...resp.data,
        price: resp.data.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      });
      setLoading(false);
    },
    (error) => {
      toast.error("Não foi possível obter os dados deste produto.");
      setLoading(false);
    });
  }, [id, setLoading]);

  const handleAddProduct = (id, productQtd) => {
    addProduct(id, productQtd);
  }

  return (
    <ProductDetailContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <form className="bg-light p-5 mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <img src={base64Image} width="80%" alt="" />
                </div>
                <div class="pro-img-list">
                  <a href="/">
                    <img src={base64Image} width="20%" alt="" />
                  </a>
                  <a href="/">
                    <img src={base64Image} width="20%" alt="" />
                  </a>
                  <a href="/">
                    <img src={base64Image} width="20%" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 text-left">
                <h1 className="text-uppercase">{product.model}</h1>
                <p style={{ color: "gray" }}>Cód: {product.id}</p>

                <label style={{ color: "gray" }}>Descrição:</label>
                <p>{product.description}</p>

                <label style={{ color: "gray" }}>Preço:</label>
                <p style={{ fontSize: "28px" }}>
                  <sup style={{ fontSize: "16px" }}>R$</sup>
                  <span style={{ color: "#3242CD" }}> {product.price}</span>
                </p>

                <label htmlFor="">Quantidade</label>
                <p>
                  <input
                    type="number"
                    defaultValue={qtd}
                    onChange={(event) => setQtd(Number(event.target.value))}
                    style={{ width: "50px", height: '40px', fontSize: '18px' }}
                    className="mr-3"
                  />

                  <button
                    type="button"
                    className="btn btn-seuphone-outline-black btn-rounded-seuphone"
                    onClick={() => handleAddProduct(product.id, qtd)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ProductDetailContainer>
  );
}
