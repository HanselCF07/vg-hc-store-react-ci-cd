import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import BrowseGames from "./pages/BrowseGames/BrowseGames";
import Support from "./pages/Support/Support";
import News from "./pages/News/News";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProductDetail from "./components/ProductDetail/ProductDetail";

import PrivateRoute from "./components/Route/PrivateRoute";
import PublicRoute from "./components/Route/PublicRoute";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import './Main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <Account />
                  </PrivateRoute>
                }
              />
              <Route path="/cart" element={ <Cart/> } />
              <Route path="/browse-games" element={ <BrowseGames/> } />
              <Route path="/support" element={ <Support/> } />
              <Route path="/news" element={ <News/> } />
              <Route path="/wishlist" element={ <Wishlist/> } />
              <Route path="/product-detail/:publicId" element={ <ProductDetail/> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
