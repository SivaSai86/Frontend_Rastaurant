import React, { useState, useEffect } from "react";
import { API_Path } from "../../data/apiPath";
import "../styles/addFirm.css";
import { jwtDecode } from "jwt-decode"; // default import

const AddFirm = ({ setFirmId }) => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [offer, setOffer] = useState("");
  const [region, setRegion] = useState([]);
  const [image, setFirmImage] = useState(null);
  const [existingFirm, setExistingFirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    checkExistingFirm();
  }, []);

  const checkExistingFirm = async () => {
    try {
      const vendorToken = localStorage.getItem("vendorToken");
      if (!vendorToken) {
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(vendorToken);
      const vendorId = decoded.userId;

      const response = await fetch(`${API_Path}vendor/${vendorId}`, {
        method: "GET",
        headers: {
          token: vendorToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          // Check if vendor has a firm
          const firmData = data.data.find((item) => item.firmName !== null);
          if (firmData) {
            setExistingFirm(firmData);
            setFirmId(firmData.id);
          }
        }
      }
    } catch (error) {
      console.error("Error checking existing firm:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSuccessMessage("");
    try {
      const vendorToken = localStorage.getItem("vendorToken");
      if (!vendorToken) {
        alert("Login again! Token missing.");
        setSubmitLoading(false);
        return;
      }
      if (!image) {
        alert("Please upload image");
        setSubmitLoading(false);
        return;
      }

      const decoded = jwtDecode(vendorToken);
      const vendorId = decoded.userId;

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("category", category.join(",")); // "veg,non-veg"
      formData.append("region", region.join(",")); // "south-indian,north-indian"
      formData.append("offer", offer);
      formData.append("vendor_id", vendorId);
      formData.append("image", image); // <input type="file"> file object

      const response = await fetch(`${API_Path}firm/add-firm`, {
        method: "POST",
        headers: {
          token: vendorToken,
        },
        body: formData,
      });

      const responseData = await response.json(); // now JSON parse will work

      if (response.ok) {
        setSuccessMessage("Firm Added Successfully!");
        console.log("data: ", responseData);
        // Store the firm ID from response or fetch it
        if (responseData.firmId) {
          setFirmId(responseData.firmId);
          setExistingFirm({ id: responseData.firmId, firmName: firmName });
        }
        // Clear form
        setFirmName("");
        setArea("");
        setCategory([]);
        setOffer("");
        setRegion([]);
        setFirmImage(null);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        // Handle backend error for duplicate firm
        if (
          response.status === 400 &&
          responseData.message.includes("can only add one firm")
        ) {
          alert(
            "You can only add one firm. Please contact support if you need to modify your existing firm."
          );
          setExistingFirm({
            id: responseData.firmId,
            firmName: "Existing Firm",
          });
        } else {
          alert("Firm Add Failed: " + responseData.message);
        }
        console.error("Server Error:", responseData);
      }
    } catch (error) {
      alert("Vendor Firm Add failed");
      console.error("Error adding firm:", error);
    } finally {
      setSubmitLoading(false);
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
      {loading ? (
        <div className="addFirmCard">
          <h2 className="title">Loading...</h2>
        </div>
      ) : existingFirm ? (
        <div className="addFirmCard">
          <h2 className="title">Firm Already Added</h2>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            You can only add one firm. Your existing firm is:{" "}
            <strong>{existingFirm.firmName}</strong>
          </p>
          <p
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            You can now add products to your firm.
          </p>
        </div>
      ) : (
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

          {successMessage && (
            <div className="successMessage">{successMessage}</div>
          )}

          <button className="submitBtn" type="submit" disabled={submitLoading}>
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
