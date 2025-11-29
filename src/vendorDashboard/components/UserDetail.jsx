import React, { useState, useEffect } from "react";
import { API_Path } from "../data/apiPath";
import { jwtDecode } from "jwt-decode";
import "./styles/userDetail.css";

const UserDetail = () => {
  const [userDetails, useState] = useState(null);
  const [firmDetails, setFirmDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const vendorToken = localStorage.getItem("vendorToken");

      if (!vendorToken) {
        setError("Token missing. Please login again.");
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
        console.log("User details:", data);

        if (data.data && data.data.length > 0) {
          const userData = data.data[0];
          setUserDetails({
            id: userData.id,
            username: userData.username,
            email: userData.email,
          });

          // Find firm details from the response
          const firmData = data.data.find((item) => item.firmName !== null);
          if (firmData) {
            setFirmDetails(firmData);
          }
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("vendorToken");
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="userDetailContainer">
        <div className="loadingMessage">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="userDetailContainer">
        <div className="errorMessage">{error}</div>
      </div>
    );
  }

  return (
    <div className="userDetailContainer">
      <div className="userDetailCard">
        <div className="userDetailHeader">
          <h2>Vendor Profile</h2>
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {userDetails && (
          <div className="userInfoSection">
            <div className="infoGroup">
              <label>Vendor ID:</label>
              <span>{userDetails.id}</span>
            </div>
            <div className="infoGroup">
              <label>Username:</label>
              <span>{userDetails.username}</span>
            </div>
            <div className="infoGroup">
              <label>Email:</label>
              <span>{userDetails.email}</span>
            </div>
          </div>
        )}

        {firmDetails ? (
          <div className="firmInfoSection">
            <h3>Firm Details</h3>
            <div className="infoGrid">
              <div className="infoGroup">
                <label>Firm Name:</label>
                <span>{firmDetails.firmName}</span>
              </div>
              <div className="infoGroup">
                <label>Area:</label>
                <span>{firmDetails.area}</span>
              </div>
              <div className="infoGroup">
                <label>Category:</label>
                <span>{firmDetails.category}</span>
              </div>
              <div className="infoGroup">
                <label>Region:</label>
                <span>{firmDetails.region}</span>
              </div>
              <div className="infoGroup">
                <label>Offer:</label>
                <span>{firmDetails.offer}</span>
              </div>
              <div className="infoGroup">
                <label>Firm ID:</label>
                <span>{firmDetails.id}</span>
              </div>
            </div>

            {firmDetails.image && (
              <div className="firmImageSection">
                <label>Firm Image:</label>
                <img
                  src={`${API_Path}uploads/${firmDetails.image}`}
                  alt={firmDetails.firmName}
                  className="firmImage"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="noFirmMessage">
            <p>No firm details found. Please add a firm first.</p>
          </div>
        )}

        <div className="actionButtons">
          <button className="refreshBtn" onClick={fetchUserDetails}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
