import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { routes } from "utils/routes";

const StyledLink = styled(NavLink)`
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: #333;

  &.active {
    background-color: #333;
    color: #fff;
  }
`;

const NavigationBar = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Reeinvent - Wordify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <StyledLink to={routes.SEARCH_SYNONYMS.path}>
                {routes.SEARCH_SYNONYMS.title}
              </StyledLink>
              <StyledLink to={routes.ADD_SYNONYM.path}>
                {routes.ADD_SYNONYM.title}
              </StyledLink>
              <StyledLink to={routes.RESET_SYNONYMS.path}>
                {routes.RESET_SYNONYMS.title}
              </StyledLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavigationBar;
