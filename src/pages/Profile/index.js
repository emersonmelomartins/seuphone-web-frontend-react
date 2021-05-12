import React from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { Tab, Nav } from "react-bootstrap";
import { ProfileContainer, Orders } from "./styles";

export function Profile() {
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
                    <Orders>
                      <thead>
                        <tr>
                          <th>Nº Pedido</th>
                          <th>Situação</th>
                          <th>Duração Contrato</th>
                          <th>Total</th>
                          <th>PDF Contrato</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1123</td>
                          <td>
                            <span className="text-warning">Processando</span>
                          </td>
                          <td>2 anos</td>
                          <td>
                            <strong>R$ 9.999,99</strong>
                          </td>
                          <td>
                            <button type="button">
                              <MdPictureAsPdf size={20} />
                            </button>
                          </td>
                          <td>
                            <button type="button">Ver detalhes</button>
                          </td>
                        </tr>
                        <tr>
                          <td>1124</td>
                          <td>
                            <span className="text-success">Em andamento</span>
                          </td>
                          <td>2 anos</td>
                          <td>
                            <strong>R$ 9.999,99</strong>
                          </td>
                          <td>
                            <button type="button">
                              <MdPictureAsPdf size={20} />
                            </button>
                          </td>
                          <td>
                            <button type="button">Ver detalhes</button>
                          </td>
                        </tr>
                        <tr>
                          <td>1125</td>
                          <td>
                            <span className="text-danger">Cancelado</span>
                          </td>
                          <td>2 anos</td>
                          <td>
                            <strong>R$ 9.999,99</strong>
                          </td>
                          <td>
                            <button type="button">
                              <MdPictureAsPdf size={20} />
                            </button>
                          </td>
                          <td>
                            <button type="button">Ver detalhes</button>
                          </td>
                        </tr>
                      </tbody>
                    </Orders>
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
                          value="seuemail@email.com"
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
                          value="João da Silva"
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
                        >
                          <option value="">Selecione o sexo...</option>
                          <option selected value="M">
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
                          value="123.456.789-10"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-date">Data de Nascimento</label>
                        <input
                          disabled
                          value="1995-06-05"
                          type="date"
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
                          size="10"
                          maxLength="9"
                          defaultValue=""
                          value="09112-000"
                          // onBlur={pesquisacep}
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
                          value="Rua Machado de Assis"
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
                          value="Bota Fogo"
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="input-city">Cidade</label>
                        <input
                          type="text"
                          className="form-control"
                          id="input-city"
                          value="Mauá"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="input-state">Estado</label>
                        <select id="input-state" className="form-control">
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
