import React, { useState } from "react";
import { API_Path } from "../../data/apiPath";
import "../styles/addProduct.css";

const AddProduct = ({ firmId }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [bestSeller, setBestSeller] = useState("");
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vendorToken = localStorage.getItem("vendorToken");
      if (!vendorToken) {
        alert("Login again! Token missing.");
        return;
      }

      if (!image) {
        alert("Please upload image");
        return;
      }

      if (!firmId) {
        alert("Firm ID is missing");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("category", category.join(","));
      formData.append("bestSeller", bestSeller);
      formData.append("description", description);
      formData.append("image", image);

      const response = await fetch(`${API_Path}product/add-product/${firmId}`, {
        method: "POST",
        headers: {
          token: vendorToken,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Product Added Successfully!");
        console.log("data: ", responseData);
        setProductName("");
        setPrice("");
        setCategory([]);
        setImage(null);
        setBestSeller("");
        setDescription("");
      } else {
        alert("Product Add Failed: " + JSON.stringify(responseData));
        console.error("Server Error:", responseData);
      }
    } catch (error) {
      alert("Product Add failed");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="productSection">
      <form className="tableForm" onSubmit={handleSubmit}>
        <h3>Add Product</h3>

        <div className="field">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter Your ProductName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Price</label>
          <input
            type="text"
            placeholder="Enter Your Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Category</label>
          <div className="inputsContainer">
            <label className="checkboxContainer">
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
              Veg
            </label>
            <label className="checkboxContainer">
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
              Non-Veg
            </label>
          </div>
        </div>

        <div className="field">
          <label>Product Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <div className="field">
          <label>Best Seller</label>
          <div className="radioContainer">
            <label className="radioItem">
              <input
                type="radio"
                name="bestSeller"
                value="yes"
                checked={bestSeller === "yes"}
                onChange={(e) => setBestSeller(e.target.value)}
              />
              Yes
            </label>

            <label className="radioItem">
              <input
                type="radio"
                name="bestSeller"
                value="no"
                checked={bestSeller === "no"}
                onChange={(e) => setBestSeller(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        <div className="field">
          <label>Description</label>
          <input
            type="text"
            placeholder="Type Your Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="btnsubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
