import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "./Price";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

export default function HomePage() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();

  // Fetch all products
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/getall-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Filter category product
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/product/filter-product",
        { checked, radio }
      );
      setProduct(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <div className="container p-3">
      <div className="flex">
        <div className="left w-1/3 ml-10 justify-center pt-5">
          <h1>Product filter</h1>
          {/* {JSON.stringify(checked, null, 4)} */}
          {categories.map((item) => (
            <div className="flex flex-col" key={item._id}>
              <Checkbox
                onChange={(e) => handleFilter(e.target.checked, item._id)}
              >
                {item.name}
              </Checkbox>
            </div>
          ))}
          <div className="flex flex-col mt-11">
            <span className="m">Filter By Price</span>
            {Prices.map((item) => (
              <div className="flex flex-col" key={item._id}>
                <Radio
                  value={item.array}
                  onChange={(e) => setRadio(e.target.value)}
                >
                  {item.name}
                </Radio>
              </div>
            ))}
            <div>
              <button
                className="bg-red-600 p-1 mt-4 border-red-50"
                onClick={() => window.location.reload()}
              >
                Reset select
              </button>
            </div>
          </div>
        </div>

        <div className="right w-2/3">
          {/* Product Grid - Two Products per Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {product.map((item) => (
              <div
                key={item._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                {/* Updated Image Styling */}
                <img
                  className="w-full h-64 object-cover rounded-t-lg"
                  src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                />
                <div className="p-5">
                  <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    Price: ${item.price}
                  </p>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex justify-center gap-3 pb-3">
                    <Link
                      to={`/product-detail/${item._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Product Detail
                    </Link>
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {
                        setCart([...cart, item]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, item])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
