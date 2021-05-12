import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { GetProduct } from "../services/productService";
import { useLoading } from "./useLoading";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem("@Seuphone::cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const { setLoading } = useLoading();

  const addProduct = async (productId, productQtd) => {
    setLoading(true);
    try {
      const checkProductInCart = cart.find(
        (product) => product.id === productId
      );

      // Verifica se produto já ta no carrinho
      if (!checkProductInCart) {
        const product = await GetProduct(productId).then((resp) => resp.data);

        // Verifica se produto possui estoque
        if (product.stockQuantity > 0 && product.stockQuantity >= productQtd) {
          setCart([...cart, { ...product, cartQuantity: productQtd }]);
          localStorage.setItem(
            "@Seuphone::cart",
            JSON.stringify([...cart, { ...product, cartQuantity: productQtd }])
          );

          toast.success("Produto adicionado ao carrinho com sucesso!");
          setLoading(false);
          return;
        } else {
          toast.error("Quantidade solicitada fora de estoque");
          setLoading(false);
        }
      }

      // Se o produto existir no carrinho
      if (checkProductInCart) {
        const product = await GetProduct(productId).then((resp) => resp.data);

        // Se o estoque for maior que a quantidade desejada
        if ((productQtd === 1 && product.stockQuantity > checkProductInCart.cartQuantity) 
        || (productQtd > 1 && product.stockQuantity > productQtd && product.stockQuantity > checkProductInCart.cartQuantity)) {

          const updatedCart = cart.map((cartProduct) =>
            cartProduct.id === productId
              ? {
                  ...cartProduct,
                  cartQuantity: cartProduct.cartQuantity + productQtd,
                }
              : cartProduct
          );

          setCart(updatedCart);
          localStorage.setItem("@Seuphone::cart", JSON.stringify(updatedCart));

          toast.success("Produto adicionado ao carrinho com sucesso!");
          setLoading(false);
          return;
        } else {
          toast.error("Quantidade solicitada fora de estoque");
          setLoading(false);
        }
      }
    } catch {
      toast.error("Ocorreu um erro ao adicionar produto ao carrinho.");
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const checkProductInCartIndex = cart.findIndex(
        (product) => product.id === productId
      );

      if (checkProductInCartIndex === -1) {
        toast.error("O produto a ser removido não foi encontrado.");
        return;
      }

      const updatedCart = cart.filter((product) => product.id !== productId);

      setCart(updatedCart);
      localStorage.setItem("@Seuphone::cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Ocorreu um erro ao remover um produto do carrinho.");
      return;
    }
  };

  const updateProductCartQuantity = async ({productId, productQtd}) => {
    try {
      if (productQtd < 1) {
        toast.error("Ocorreu um erro ao alterar a quantidade de produto");
        return;
      }

      const checkProductInCartIndex = cart.findIndex(
        (product) => product.id === productId
      );

      if (checkProductInCartIndex === -1) {
        toast.error("Ocorreu um erro ao alterar a quantidade de produto");
        return;
      }

      const product = await GetProduct(productId).then((resp) => resp.data);

      if (productQtd > product.stockQuantity) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const updatedCart = cart.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              cartQuantity: productQtd,
            }
          : cartProduct
      );

      setCart(updatedCart);
      localStorage.setItem("@Seuphone::cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
      return;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProductCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
