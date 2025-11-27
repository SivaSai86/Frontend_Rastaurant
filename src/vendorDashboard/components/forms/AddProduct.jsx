import React from "react";
import "../styles/addProduct.css";

const AddProduct = () => {
  return (
    <div className="productSection">
      <form className="tableForm">
        <h3>Add Product</h3>

        <div className="field">
          <label>Product Name</label>
          <input type="text" placeholder="Enter Your ProductName" />
        </div>

        <div className="field">
          <label>Price</label>
          <input type="text" placeholder="Enter Your Price" />
        </div>

        <div className="field">
          <label>Category</label>
          <div className="inputsContainer">
            <label className="checkboxContainer">
              <input type="checkbox" value="veg" />
              Veg
            </label>
            <label className="checkboxContainer">
              <input type="checkbox" value="non-veg" />
              Non-Veg
            </label>
          </div>
        </div>

        <div className="field">
          <label>Product Image</label>
          <input type="file" />
        </div>

        <div className="field">
          <label>Best Seller</label>
          <div className="radioContainer">
            <label className="radioItem">
              <input type="radio" name="bestSeller" value="yes" />
              Yes
            </label>

            <label className="radioItem">
              <input type="radio" name="bestSeller" value="no" />
              No
            </label>
          </div>
        </div>

        <div className="field">
          <label>Description</label>
          <input type="text" placeholder="Type Your Description" />
        </div>

        <div className="btnsubmit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
