import React from "react";
import { UserOrderDetailContainer } from "./styles";

export function UserOrderDetail() {
  return (
    <UserOrderDetailContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Detalhe de Pedido xx</h1>
        </form>
      </div>
    </UserOrderDetailContainer>
  );
}
