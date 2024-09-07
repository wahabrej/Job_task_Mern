import React from "react";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";

export default function Search() {
  const [value] = useSearch(); // Destructuring value from the useSearch hook
  const results = value.results || []; // Ensuring results is an array

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        {results.map((item, index) => (
          <div
            key={index}
            className="max-w-sm h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="rounded-t-lg w-full h-[250px]"
              src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
              alt=""
            />

            <div className="pl-5 flex flex-col justify-between h-[250px] overflow-hidden">
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
                  to={`/product/${item.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                </Link>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
