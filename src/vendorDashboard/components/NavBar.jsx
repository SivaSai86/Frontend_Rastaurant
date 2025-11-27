import React from "react";
import "./styles/navBar.css";

const NavBar = (props) => {
  const {
    showLoginHandler,
    showRegisterHandler,
    showAddFirmHandler,
    showAddProductHandler,
  } = props;
  console.log(showLoginHandler);

  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className="userAuth">
        <span onClick={showLoginHandler}>Login /</span>
        <span onClick={showRegisterHandler}> Register</span>
      </div>
    </div>
  );
};

export default NavBar;
