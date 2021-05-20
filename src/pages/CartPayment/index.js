import React from "react";
import { CartPaymentContainer } from "./styles";

export function CartPayment() {
  return (
    <CartPaymentContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Pagamento</h1>
        </form>
      </div>
    </CartPaymentContainer>
  );
}
