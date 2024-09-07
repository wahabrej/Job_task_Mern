import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/similar-product/${pid}/${cid}`
      );
      console.log(data);
      setSimilar(data.product); // Assuming the API returns a 'products' array
    } catch (error) {
      console.error("Error fetching similar products:", error);
      // Add toast or other error handling
      // For example, you could set an error state to display an error message to the user
    }
  };

  const detailProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${id}`
      );

      setProduct(data.product);
      similarProduct(data.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
      // Add toast or other error handling
    }
  };

  useEffect(() => {
    detailProduct();
  }, [id]); // Add id as a dependency

  if (!product) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="div p-5">
      <div className="container">
        <div className="container flex gap-4">
          <div className="w-1/3 border border-gray-300 rounded-md bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <img
              className="rounded-t-lg w-full h-[350px]"
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>
          <div className="w-2/3 border border-gray-300 rounded-md bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="p-5 flex flex-col justify-between h-[250px] overflow-hidden">
              <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                {product.description}
              </p>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                Price: ${product.price}
              </p>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                Category: {product.category.name}
              </p>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                Quantity: {product.quantity}
              </p>
              <div className=" ml-5 mb-5">
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="div ml-20 mt-10">
        <h1>Related Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similar.length > 0 ? (
            similar.map((product) => (
              <div
                key={product._id}
                className="border border-gray-300 rounded-md p-3 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    className="rounded-t-lg w-full h-[150px] object-cover"
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Price: ${product.price}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
