/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { ProfileContainer } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { GetUser } from "../../services/userService";
import { OrdersTab } from "./OrdersTab";
import { DataTab } from "./DataTab";
import { toast } from "react-toastify";
import { AddressTab } from "./AddressTab";
import { useLoading } from "../../hooks/useLoading";
import { useLocation } from "react-router";

export function Profile() {
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({});


  const userid = user.decodedToken.nameid;
  const urlParams =
new URLSearchParams(location.search).get("tab") ?? "";

  useEffect(() => {

    _getUser();
  }, []);

  const _getUser = () => {
    setLoading(true);
    GetUser(userid).then(
      (resp) => {
        const [date] = new Date(resp.data.birthDate)
          .toLocaleString()
          .split(" ");
        resp.data.birthDate = date;
        setUserInfo(resp.data);
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
    <ProfileContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <div className="bg-light p-5 mx-auto styled-form">
          <h1 className="py-2 text-uppercase">Perfil</h1>

          <Tab.Container id="left-tabs-example" defaultActiveKey={urlParams !== "" ? urlParams : "orders"}>
            <div className="row">
              <div className="col-sm-2">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="orders">Pedidos</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="data">Dados Pessoais</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="address">Endereço</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="col-sm-10">
                <Tab.Content>
                  <Tab.Pane eventKey="orders">
                    <OrdersTab userid={userid} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="data">
                    <DataTab userInfo={userInfo} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="address">
                    <AddressTab userInfo={userInfo} />
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
