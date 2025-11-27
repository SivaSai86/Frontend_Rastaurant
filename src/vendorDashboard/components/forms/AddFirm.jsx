import React from "react";
import "../styles/addFirm.css";

const AddFirm = () => {
  return (
    <div className="addFirmPage">
      <form className="addFirmCard">
        <h2 className="title">Add Firm</h2>

        <div className="formField">
          <label>Firm Name</label>
          <input type="text" placeholder="Enter Firm Name" />
        </div>

        <div className="formField">
          <label>Area</label>
          <input type="text" placeholder="Enter Area" />
        </div>

        <div className="formField">
          <label>Category</label>
          <div className="flexRow">
            <label className="checkboxItem">
              <input type="checkbox" /> Veg
            </label>
            <label className="checkboxItem">
              <input type="checkbox" /> Non-Veg
            </label>
          </div>
        </div>

        <div className="formField">
          <label>Offer</label>
          <input type="text" placeholder="Enter Offer" />
        </div>

        <div className="formField">
          <label>Region</label>
          <div className="gridOptions">
            <label className="checkboxItem">
              <input type="checkbox" /> South Indian
            </label>
            <label className="checkboxItem">
              <input type="checkbox" /> North Indian
            </label>
            <label className="checkboxItem">
              <input type="checkbox" /> Chinese
            </label>
            <label className="checkboxItem">
              <input type="checkbox" /> Bakery
            </label>
          </div>
        </div>

        <div className="formField">
          <label>Firm Image</label>
          <input type="file" />
        </div>

        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default AddFirm;
