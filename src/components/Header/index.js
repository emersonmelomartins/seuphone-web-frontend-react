import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

import { Cart, HeaderContainer } from "./styles";
import logoImg from "../../assets/img/logo.png";
import { useCart } from "../../hooks/useCart";
import { Button, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { GetUser } from "../../services/userService";

export function Header() {
  const { cart } = useCart();
  const { signed, Logout, user } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [hasAdmin, setHasAdmin] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  const cartSize = cart.length;

  const [productField, setProductField] = useState('');

  const userId = user.decodedToken.nameid

  useEffect(() => {
    _getUser(userId)
  }, []);


  const _getUser = (userId) =>
  new Promise((resolve, reject) => {
    GetUser(userId).then(
      (resp) => {
        //  setUserInfo(resp.data);       
         resp.data.userRoles.forEach(item => console.log(item.role.roleName) === "ROLE_ADMIN" && setHasAdmin(true) || item.role.roleName === "ROLE_CLIENTE" && setHasUser(true)) 
        //  resp.data.userRoles.forEach(item => item.role.roleName === "ROLE_CLIENTE" && setHasUser(true))   
         
         console.log(hasAdmin)
         console.log(hasUser)
        resolve();
      },
      (error) => {
        reject()
      }
    );
  });

  return (
    <HeaderContainer>
      <Navbar
        className="navbar navbar-dark bg-dark text-light seuphone-background"
        collapseOnSelect
        expand={false}
      >
        <div className="container">
          <Navbar.Brand>
            <img src={logoImg} width="90px" alt="" />
            <Navbar.Toggle />
          </Navbar.Brand>

          <form className="form-inline my-2 my-lg-0 mx-auto">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar por produtos..."
              aria-label="Search"
              value={productField}
              onChange={(event) => setProductField(event.target.value)}
            />
            <Link
              className="btn btn-success btn-seuphone-outline-white btn-search"
              type="submit"
              to={`/products?productName=${productField}`}
            >
              <FiSearch size="0.9rem" />
            </Link>
          </form>

          {signed ? (
            <Dropdown>
              <Dropdown.Toggle className="btn btn-rounded-seuphone btn-seuphone-outline-white">
                Bem vindo, {user.decodedToken.unique_name.split(" ")[0]}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Meus Dados
                </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={Logout}>
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link
              className="btn btn-rounded-seuphone btn-seuphone-outline-white"
              to="/login"
            >
              Entrar / Registrar
            </Link>
          )}

          <Cart to="/cart" className="mx-3">
            <FiShoppingCart size={30} color="#FFF" />
            <div className="mx-2">
              <span>{cartSize}</span>
            </div>
          </Cart>
        </div>

        <div className="container">
          <Navbar.Collapse>
            <Nav className="mr-auto d-block">
              <Nav.Item>
                <Nav.Link eventKey="1" as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2" as={Link} to="/products">
                  Produtos
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </HeaderContainer>
  );
}
