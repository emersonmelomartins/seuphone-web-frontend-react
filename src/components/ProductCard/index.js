import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/formatPrice";
import { ProductCardContainer } from "./styles";

export function ProductCard({ product, productQtd }) {
  const { addProduct } = useCart();

  const handleAddProduct = (id, productQtd) => {
    addProduct(id, productQtd);
  };

  return (
    <ProductCardContainer className="card product-card">
      <img src={product.image} alt={product.model} />
      <div className="card-body">
        <div className="panel-body">
          <Link to={"/products/" + product.id}>
            <h5>{product.model}</h5>
          </Link>
          <p>{product.description}</p>
          <p>{product.stockQuantity} unidade(s) disponível(eis)</p>
          <p>
            {formatPrice(product.price)}
          </p>
          <button
            onClick={() => {
              handleAddProduct(product.id, productQtd);
            }}
            className="btn btn-seuphone-outline-black btn-rounded-seuphone btn-block"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </ProductCardContainer>
  );
}
