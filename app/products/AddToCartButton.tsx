'use client'
import React from "react";

const AddToCartButton = () => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          console.log("Add to Cart");
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
