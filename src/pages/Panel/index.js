/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import { ProfileContainer } from "./styles";
import { OrdersTab } from "./OrdersTab";
import { ProductsTab } from "./ProductsTab";
import { UsersTab } from "./UsersTab";
import { ProvidersTab } from "./ProvidersTab";

export function Panel() {
  useEffect(() => {
  }, []);

  return (
    <ProfileContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <div className="bg-light p-5 mx-auto styled-form">
          <h1 className="py-2 text-uppercase">Painel Administrador</h1>

          <Tab.Container id="left-tabs-example" defaultActiveKey="users">
            <div className="row">
              <div className="col-sm-2">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="users">Usuários</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="products">Produtos</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">Pedidos</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="providers">Fornecedor</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="col-sm-10">
                <Tab.Content>
                  <Tab.Pane eventKey="users">
                    <UsersTab/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="products">
                    <ProductsTab/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="orders">
                    <OrdersTab/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="providers">
                    <ProvidersTab/>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </div>
      </div>
    </ProfileContainer>
  );
}
