import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import CategoryForm from "./CategoryForm";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Product() {
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [idToUpdate, setIdToUpdate] = useState(null);

  const update = async (event) => {
    event.preventDefault();
    if (idToUpdate) {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/v1/product/update-product/${idToUpdate}`,
          { name }
        );
        console.log(res);
        toast.success("update successfully");
        setName(""); // Clear the input field after successful submission
        setIdToUpdate(null); // Clear the idToUpdate
        toggleModal(); // Close the modal
        fetchCategories(); // Fetch updated categories
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      fetchCategories(); // Refresh categories after deletion
      toast.success("Delete successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = (id = null, categoryName = "") => {
    setIsModalOpen(!isModalOpen);
    setIdToUpdate(id);
    setName(categoryName);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <CategoryForm fetchCategories={fetchCategories} />
          </div>

          <div className="overflow-x-auto">
            <div className="div flex flex-wrap gap-5">
              {product.map((item, index) => (
                <Link
                  to={`/dashboard/admin/product/${item._id}`}
                  key={item._id}
                >
                  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img
                        class="rounded-t-lg"
                        src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                        alt=""
                      />
                    </a>
                    <div class="p-5">
                      <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.name}{" "}
                        </h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.description}
                      </p>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Price:$ {item.price}
                      </p>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <a
                        href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                onClick={toggleModal}
              >
                <div
                  className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside it
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Update Product
                    </h3>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={update}>
                    <div className="mb-4">
                      <label
                        htmlFor="categoryName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        className="mt-1  bg-white block w-full rounded-md border-orange-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      {/* if( !name || !description || !price || !category || !quantity  || (!photo */}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
