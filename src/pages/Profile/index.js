/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { ProfileContainer } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { GetUser } from "../../services/userService";
import { OrdersTab } from "./OrdersTab";

export function Profile() {
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState({});

  const userid = user.decodedToken.nameid;

  useEffect(() => {
    _getUser();
  }, []);

  const _getUser = () => {
    GetUser(userid).then(resp => {
      const [date,] = new Date(resp.data.birthDate).toLocaleString().split(" ");
      resp.data.birthDate = date;
      setUserInfo(resp.data);
      console.log(resp.data);
    },
    (error) => {

    })
  }


  

  return (
    <ProfileContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container py-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Perfil</h1>

          <Tab.Container id="left-tabs-example" defaultActiveKey="orders">
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
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="input-email">E-mail</label>
                        <input
                          disabled
                          type="email"
                          className="form-control"
                          id="input-email"
                          value={userInfo.email}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="input-name">Nome Completo</label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          id="input-name"
                          value={userInfo.name}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-genre">Sexo</label>
                        <select
                          id="input-genre"
                          className="form-control"
                          disabled
                          value={userInfo.genre}
                        >
                          <option value="">Selecione o sexo...</option>
                          <option value="M">
                            Masculino
                          </option>
                          <option value="F">Feminino</option>
                          <option value="X">Prefiro não informar</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-cpf">CPF</label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          id="input-cpf"
                          value={userInfo.cpf}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-date">Data de Nascimento</label>
                        <input
                          disabled
                          value={userInfo.birthDate}
                          type="text"
                          className="form-control"
                          id="input-date"
                        />
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="address">
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-zipcode">CEP</label>
                        <input
                          type="text"
                          className="form-control"
                          id="input-zipcode"
                          defaultValue={userInfo.zipCode}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-8">
                        <label htmlFor="input-address">Logradouro</label>
                        <input
                          type="text"
                          className="form-control"
                          id="input-address"
                          defaultValue={userInfo.address}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-district">Bairro</label>
                        <input
                          type="text"
                          className="form-control"
                          id="input-district"
                          defaultValue={userInfo.district}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="input-city">Cidade</label>
                        <input
                          type="text"
                          className="form-control"
                          id="input-city"
                          defaultValue={userInfo.city}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-state">Estado</label>
                        <select id="input-state" className="form-control" value={userInfo.state}>
                          <option value="">Selecione o estado...</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option selected value="SP">
                            São Paulo
                          </option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-rounded-seuphone btn-seuphone-outline-black"
                    >
                      <i className="far fa-circle"></i> Atualizar Endereço
                    </button>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </form>
      </div>
    </ProfileContainer>
  );
}
