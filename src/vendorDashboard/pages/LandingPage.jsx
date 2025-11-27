import React, { useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";

import "../components/styles/landingPage.css";
const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
  };

  const showAddFirmHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddProduct(false);
    setShowAddFirm(true);
  };

  const showAddProductHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(true);
  };

  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showAddFirmHandler={showAddFirmHandler}
          showAddProductHandler={showAddProductHandler}
        />
        <div className="collectionSection">
          <SideBar
            showAddFirmHandler={showAddFirmHandler}
            showAddProductHandler={showAddProductHandler}
          />
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showLogin && <Login />}
          {showAddFirm && <AddFirm />}
          {showAddProduct && <AddProduct />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
