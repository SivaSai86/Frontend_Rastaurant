import React from "react";
import "./styles/sideBar.css";
const SideBar = (props) => {
  const { showAddProductHandler, showAddFirmHandler } = props;
  return (
    <div className="sideBarSection">
      <ul>
        <li onClick={showAddFirmHandler}>Add Firm</li>
        <li onClick={showAddProductHandler}>Add Product</li>
        <li>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
