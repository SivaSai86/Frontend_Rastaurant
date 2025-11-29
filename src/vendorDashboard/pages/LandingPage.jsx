import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import AllProducts from "../components/AllProducts";
import UserDetail from "../components/UserDetail";
import Welcome from "../components/Welcome";
import "../components/styles/landingPage.css";

const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [firmId, setFirmId] = useState(null);

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowWelcome(false);
    setShowAddProduct(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowWelcome(false);
    setShowAddProduct(false);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowUserDetail(true);
    setShowAllProducts(true);
  };

  const showAddFirmHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAddFirm(true);
  };

  const showAddProductHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowAddProduct(true);
  };

  const showAllProductsHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowUserDetail(false);
    setShowWelcome(false);
    setShowAllProducts(true);
  };

  const showUserDetailHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false);
    setShowWelcome(false);
    setShowUserDetail(true);
  };

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(true);
  };

  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
        />
        <div className="collectionSection">
          <SideBar
            showAddFirmHandler={showAddFirmHandler}
            showAddProductHandler={showAddProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showUserDetailHandler={showUserDetailHandler}
          />
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showLogin && <Login showWelcomeHandler={handleLoginSuccess} />}
          {showAddFirm && <AddFirm setFirmId={setFirmId} />}
          {showAddProduct && <AddProduct firmId={firmId} />}
          {showAllProducts && <AllProducts firmId={firmId} />}
          {showUserDetail && <UserDetail />}
          {showWelcome && <Welcome />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
