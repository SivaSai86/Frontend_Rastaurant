import React, { useState } from "react";
import { API_Path } from "../../data/apiPath";
import "../styles/addFirm.css";
import { jwtDecode } from "jwt-decode"; // default import

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [offer, setOffer] = useState("");
  const [region, setRegion] = useState([]);
  const [image, setFirmImage] = useState(null);

  const handleFirmSubmit = async (e) => {
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

      const decoded = jwtDecode(vendorToken);
      const vendorId = decoded.userId;

      // const formData = new FormData();
      // formData.append("firmName", firmName);
      // formData.append("area", area);
      // formData.append("category", category.join(",")); // "veg,non-veg"
      // formData.append("region", region.join(",")); // "south-indian,north-indian"
      // formData.append("offer", offer);
      // formData.append("vendor_id", vendorId);
      // formData.append("image", image); // <input type="file"> file object

      // const formDataObj = {};
      // for (let pair of formData.entries()) {
      //   formDataObj[pair[0]] = pair[1];
      // }

      // console.log(formDataObj);

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("category", category.join(","));
      formData.append("region", region.join(","));
      formData.append("offer", offer);
      formData.append("vendor_id", vendorId);
      formData.append("image", image); // File object

      const response = await fetch(
        `https://backend-restaurant-1-ujsx.onrender.com/firm/add-firm`,
        {
          method: "POST",
          headers: {
            token: vendorToken,
          },
          body: formData,
        }
      );

      const responseData = await response.json(); // now JSON parse will work

      if (response.ok) {
        alert("Firm Added Successfully!");
        console.log("data: ", responseData);
      } else {
        alert("Firm Add Failed: " + JSON.stringify(responseData));
        console.error("Server Error:", responseData);
      }
    } catch (error) {
      alert("Vendor Firm Add failed");
      console.error("Error adding firm:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageChange = (event) => {
    setFirmImage(event.target.files[0]);
  };

  return (
    <div className="addFirmPage">
      <form className="addFirmCard" onSubmit={handleFirmSubmit}>
        <h2 className="title">Add Firm</h2>

        <div className="formField">
          <label>Firm Name</label>
          <input
            type="text"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            placeholder="Enter Firm Name"
          />
        </div>

        <div className="formField">
          <label>Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter Area"
          />
        </div>

        <div className="formField">
          <label>Category</label>
          <div className="flexRow">
            <label className="checkboxItem">
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
              Veg
            </label>
            <label className="checkboxItem">
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

        <div className="formField">
          <label>Offer</label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Enter Offer"
          />
        </div>

        <div className="formField">
          <label>Region</label>
          <div className="gridOptions">
            <label className="checkboxItem">
              <input
                type="checkbox"
                value="south-indian"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
              South Indian
            </label>
            <label className="checkboxItem">
              <input
                type="checkbox"
                value="north-indian"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
              />
              North Indian
            </label>
            <label className="checkboxItem">
              <input
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
              Chinese
            </label>
            <label className="checkboxItem">
              <input
                type="checkbox"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
              Bakery
            </label>
          </div>
        </div>

        <div className="formField">
          <label>Firm Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
