import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Header from "./components/Header";

import Login from "./components/Login";
import Registration from "./components/Registration";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import { Toaster } from "react-hot-toast";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./Routes/Private";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import CreateCategory from "./Admin/CreateCategory";
import CreateProduct from "./Admin/CreateProduct";
import Users from "./Admin/Users";
import Order from "./user/Order";
import Profile from "./user/Profile";
import Product from "./Admin/Product";
import UpdateProduct from "./Admin/UpdateProducr";
import Search from "./Admin/Search";
import ProductDetail from "./Admin/ProductDetail";
import CartPage from "./components/CartPage";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/order" element={<Order />} />
            <Route path="user/profile" element={<Profile />} />
            {/* <Route path="admin/users" element={<Users />} /> */}
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product" element={<Product />} />
            <Route path="admin/product/:id" element={<UpdateProduct />} />

            <Route path="admin/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
