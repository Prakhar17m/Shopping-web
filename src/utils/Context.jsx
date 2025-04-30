import React, { createContext, useEffect, useState } from 'react';
import axios from "./axios";

export const ProductContext = createContext();

const ProductProvider = (props) => {
  const [products, setproducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

//   const getproducts = async () => {
//     try {
//       const { data } = await axios("/products");
//       setproducts(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getproducts();
//   }, []);

//   useEffect(() => {
//     if (products?.length) {
//       localStorage.setItem("products", JSON.stringify(products));
//     }
//   }, [products]);

//   if (process.env.NODE_ENV === "development") {
//     console.log(products);
//   }

  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
