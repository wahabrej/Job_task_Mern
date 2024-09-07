import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import CategoryForm from "./CategoryForm";

import toast from "react-hot-toast";
export default function CreateCategory() {
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [idToUpdate, setIdToUpdate] = useState(null);

  const update = async (event) => {
    event.preventDefault();
    if (idToUpdate) {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/v1/category/update-category/${idToUpdate}`,
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
        "http://localhost:8080/api/v1/category/getall-category"
      );
      setCategory(res.data.category);
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
        `http://localhost:8080/api/v1/category/delete-category/${id}`
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
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="py-2 px-4 border-b border-gray-300"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-4 border-b border-gray-300"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.map((item, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-300">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleModal(item._id, item.name)}
                          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                        >
                          Category Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
                      Update Category
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
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        className="mt-1  bg-white block w-full rounded-md border-orange-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
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
