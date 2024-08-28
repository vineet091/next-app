"use client"
import React from "react";
import AddToCartButton from "./AddToCartButton";
import styles from "./prducts.module.css";

const Products = () => {
  return (
    <div className={styles.card}>
      <div className="text-gray-950 font-bold text-xl">Products</div>
      <AddToCartButton />
    </div>
  );
};

export default Products;
