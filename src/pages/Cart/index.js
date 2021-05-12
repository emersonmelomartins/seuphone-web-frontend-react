import React from "react";
import { CartContainer, ProductTable, Total } from "./styles";

import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import { useCart } from "../../hooks/useCart";

import { base64Image } from "../../assets/base64test";
import { formatPrice } from "../../util/formatPrice";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, removeProduct, updateProductCartQuantity } = useCart();
  const cartSize = cart.length;

  const formattedCart = cart.map((product) => ({
    ...product,
    price: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.cartQuantity),
  }));

  const total = formatPrice(
    cart.reduce((acc, product) => {
      acc += product.price * product.cartQuantity;
      return acc;
    }, 0)
  );

  function handleProductIncrement(product) {
    const incrementProductCart = {
      productId: product.id,
      productQtd: product.cartQuantity + 1,
    };
    updateProductCartQuantity(incrementProductCart);
  }

  function handleProductDecrement(product) {
    const decrementProductCart = {
      productId: product.id,
      productQtd: product.cartQuantity - 1,
    };
    updateProductCartQuantity(decrementProductCart);
  }

  function handleRemoveProduct(id) {
    removeProduct(id);
  }

  return (
    <CartContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Carrinho</h1>

          {cartSize <= 0 ? (
            <>
              <p>Não há produtos em seu carrinho.</p>
              <Link to="/products">Ir para produtos</Link>
            </>
          ) : (
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
                {formattedCart.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={base64Image} alt="" />
                    </td>
                    <td>
                      <strong>{product.model}</strong>
                      <span>{product.price}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          type="button"
                          disabled={product.cartQuantity <= 1}
                          onClick={() => handleProductDecrement(product)}
                        >
                          <MdRemoveCircleOutline size={20} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          value={product.cartQuantity}
                        />
                        <button
                          type="button"
                          onClick={() => handleProductIncrement(product)}
                        >
                          <MdAddCircleOutline size={20} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <strong>{product.subTotal}</strong>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductTable>
          )}

          <footer>
            <button
              type="button"
              className="btn btn-seuphone-outline-black btn-rounded-seuphone"
            >
              Ir para próximo passo
            </button>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </form>
      </div>
    </CartContainer>
  );
}
