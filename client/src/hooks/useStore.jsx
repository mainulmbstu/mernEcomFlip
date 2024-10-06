import { useEffect, useState } from "react";

const useStore = () => {
  //==============================================================
  //========== all products ==================
  const [products, setProducts] = useState([]);

  // let getProducts = async () => {
  //   let res = await fetch("http://localhost:8000/products/product-list", {
  //     method: "GET",
  //   });

  //   setProducts(await res.json());
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  //============== all category====================================
  const [category, setCategory] = useState([]);

  let getCategory = async () => {
    let res = await fetch(`${import.meta.env.VITE_BASE_URL}/category/category-list`, {
      method: "GET",
    });
    setCategory(await res.json());
  };

  useEffect(() => {
    getCategory();
  }, []);

  let priceCategory = [
    {
      _id:1,
      name: '$0 - 20',
      array:[0,20]
    },
    {
      _id:2,
      name: '$21 - 40',
      array:[21,40]
    },
    {
      _id:3,
      name: '$41 - 60',
      array:[41,60]
    },
  ]


  return { products, category, priceCategory };
};

export default useStore;
