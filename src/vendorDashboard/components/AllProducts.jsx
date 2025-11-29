import React, { useState, useEffect } from "react";
import { API_Path } from "../data/apiPath";
import { jwtDecode } from "jwt-decode";
import "./styles/allProducts.css";

const AllProducts = ({ firmId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firmName, setFirmName] = useState("");

  useEffect(() => {
    if (firmId) {
      fetchProducts();
    } else {
      setLoading(false);
      setError("No firm selected");
    }
  }, [firmId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const vendorToken = localStorage.getItem("vendorToken");

      if (!vendorToken) {
        setError("Token missing. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_Path}product/${firmId}/products`, {
        method: "GET",
        headers: {
          token: vendorToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setFirmName(data.firmName || "");
        console.log("Products fetched:", data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const vendorToken = localStorage.getItem("vendorToken");
        const response = await fetch(`${API_Path}product/${productId}`, {
          method: "DELETE",
          headers: {
            token: vendorToken,
          },
        });

        if (response.ok) {
          alert("Product deleted successfully!");
          setProducts(products.filter((p) => p.id !== productId));
        } else {
          const errorData = await response.json();
          alert("Delete failed: " + errorData.message);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      }
    }
  };

  if (loading) {
    return (
      <div className="allProductsContainer">
        <div className="loadingMessage">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="allProductsContainer">
        <div className="errorMessage">{error}</div>
      </div>
    );
  }

  return (
    <div className="allProductsContainer">
      <div className="productsHeader">
        <h2>All Products - {firmName}</h2>
        <button className="refreshBtn" onClick={fetchProducts}>
          Refresh
        </button>
      </div>

      {products.length === 0 ? (
        <div className="noProductsMessage">
          <p>No products available. Start by adding a product!</p>
        </div>
      ) : (
        <div className="productsGrid">
          {products.map((product) => (
            <div key={product.id} className="productCard">
              <div className="productImageContainer">
                {product.image ? (
                  <img
                    src={`${API_Path}uploads/${product.image}`}
                    alt={product.productName}
                    className="productImage"
                  />
                ) : (
                  <div className="noImage">No Image</div>
                )}
                {product.bestSeller === "yes" && (
                  <div className="bestSellerBadge">Best Seller</div>
                )}
              </div>
              <div className="productInfo">
                <h3 className="productName">{product.productName}</h3>
                <p className="productCategory">{product.category || "N/A"}</p>
                <p className="productDescription">
                  {product.description || "No description"}
                </p>
                <div className="productFooter">
                  <span className="productPrice">₹{product.price}</span>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
