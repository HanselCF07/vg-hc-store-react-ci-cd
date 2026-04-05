import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

import styles from "./NavBar.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import shoppingCartLogo from '../../assets/images/ShoppingCartWhiteLogo.png'

export default function NavBar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleSignIn = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
    // navigate("/");
  };

  const handleShoppingCart = () => {
    window.location.href = "/cart";
  };

  return (
    <Navbar expand="lg" className={styles.customNavbar} data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/" className="ms-4">
          <img
            src="../../../logo-hc-store.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
          {' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-1 me-1">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Discover
            </NavLink>
          </Nav>
          <Nav className="ms-1 me-1">
            <NavLink to="/browse-games" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Browse Games
            </NavLink>
          </Nav>

          <Nav className="ms-1 me-1">
            <NavLink to="/support" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Support
            </NavLink>
          </Nav>

          <Nav className="ms-1 me-auto">
            <NavLink to="/news" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              News
            </NavLink>
          </Nav>

          <Nav className="ms-auto me-3">
            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <i className="bi bi-cart-plus"></i> Cart ({cart.length})
            </NavLink>
          </Nav>

          <Nav className="me-4">
            {user ? (
              <Navbar.Text >
                <DropdownButton 
                    title={user.name}
                    variant={`btn text-white ${styles.userBtn}`}
                >
                  <Dropdown.Item eventKey="1" href="/account" className={`text-white ${styles.signDropdownItem}`}>
                      Account
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" href="/wishlist" className={`text-white ${styles.signDropdownItem}`}>
                      Wishlist
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="3" className={`text-white ${styles.signDropdownItem}`} onClick={handleLogout}>
                      Sign Out
                  </Dropdown.Item>
                </DropdownButton>
              </Navbar.Text>
            ) : (
              <Navbar.Text>
                <Button as="input" variant={`btn text-white ${styles.signInBtn}`} type="submit" value="Sign in" onClick={handleSignIn} />
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}