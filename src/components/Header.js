import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/utenteActions";
import BarraRicerca from "./BarraRicerca";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const utenteLogin = useSelector((state) => state.utenteLogin);
  const { utenteInfo } = utenteLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Come Imparare</Navbar.Brand>
          </LinkContainer>

          <BarraRicerca />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {utenteInfo ? (
                <NavDropdown title={utenteInfo.name} id="name">
                  <LinkContainer to={`/accounts/${utenteInfo.id}`}>
                    <NavDropdown.Item>Account</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/listacorsi">
                <Nav.Link>
                  <i className="fas fa-books"></i>Corsi
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/carrello">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Carrello
                </Nav.Link>
              </LinkContainer>

              {utenteInfo && utenteInfo.is_admin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/listautenti">
                    <NavDropdown.Item>Utenti</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/listacorsi">
                    <NavDropdown.Item>Corsi</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/listaordini">
                    <NavDropdown.Item>Ordini</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
