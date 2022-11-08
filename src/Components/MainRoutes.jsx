import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import KidsPage from "../Pages/KidsPage";
import MensPage from "../Pages/MensPage";
import SingleProduct from "../Pages/SingleProduct";
import SportsPage from "../Pages/SportsPage";
import WomensPage from "../Pages/WomensPage";
import CartPage from "../Pages/CartPage";
import WishListPage from "../Pages/WishListPage";
import LoginPage from "../Pages/LoginPage";
import CreateAccount from "../Pages/CreateAccount";
import { useSelector } from "react-redux";
import AdminPage from "../Pages/AdminPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import CheckoutPage from "../Pages/CheckoutPage";
import OrderSuccessPage from "./OrderSuccessPage";

const MainRoutes = () => {
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/mens" element={<MensPage />} />
      <Route path="/products/womens" element={<WomensPage />} />
      <Route path="/products/kids" element={<KidsPage />} />
      <Route path="/products/sports" element={<SportsPage />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route
        path="/cartpage"
        element={
          <ProtectedRoutes>
            <CartPage />
          </ProtectedRoutes>
        }
      />
      <Route path="/wishlist" element={<WishListPage />} />
      <Route
        path="/adminPage"
        element={
          <AdminProtectedRoutes>
            <AdminPage />
          </AdminProtectedRoutes>
        }
      />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/OrderPage" element={<OrderSuccessPage />} />
    </Routes>
  );
};

export default MainRoutes;
