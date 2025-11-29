import React, { useState, useEffect } from "react";
import { API_Path } from "../data/apiPath";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedVendor, setExpandedVendor] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_Path}vendor/all-vendors/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }

      const result = await response.json();
      // Handle both direct array and nested data format
      const vendorData = result.data || result;
      setVendors(Array.isArray(vendorData) ? vendorData : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const toggleVendor = (vendorId) => {
    setExpandedVendor(expandedVendor === vendorId ? null : vendorId);
  };

  if (loading) {
    return <div className="adminDashboard loadingContainer">Loading...</div>;
  }

  if (error) {
    return <div className="adminDashboard errorContainer">Error: {error}</div>;
  }

  return (
    <div className="adminDashboard">
      <div className="adminHeader">
        <h2>All Vendors, Firms & Products</h2>
        <p>Total Vendors: {vendors.length}</p>
      </div>

      <div className="vendorsContainer">
        {vendors.length === 0 ? (
          <div className="noData">No vendors found</div>
        ) : (
          vendors.map((vendor) => (
            <div key={vendor.id} className="vendorCard">
              <div
                className="vendorHeader"
                onClick={() => toggleVendor(vendor.id)}
              >
                <div className="vendorInfo">
                  <h3>{vendor.username}</h3>
                  <p className="vendorEmail">📧 {vendor.email}</p>
                </div>
                <div className="expandIcon">
                  {expandedVendor === vendor.id ? "▼" : "▶"}
                </div>
              </div>

              {expandedVendor === vendor.id && (
                <div className="vendorDetails">
                  <div className="firmCard">
                    <div className="firmHeader">
                      <div>
                        <h5>{vendor.firmName}</h5>
                        <p className="firmDetails">
                          📍 {vendor.area} | {vendor.region}
                        </p>
                        <p className="firmOffer">Offer: {vendor.offer}</p>
                        <p className="firmCategory">
                          Category: {vendor.category}
                        </p>
                      </div>
                      {vendor.image && (
                        <img
                          src={`https://backend-restaurant-1-ujsx.onrender.com/uploads/${vendor.image}`}
                          alt={vendor.firmName}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
