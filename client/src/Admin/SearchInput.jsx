import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearch } from "../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [value, setValue] = useSearch([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Searching for: ${value.keyword}`);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/filter-search/${value.keyword}`
      );
      setValue({ ...value, results: data });
      navigate("/search");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="relative flex items-center">
          <input
            type="search"
            id="default-search"
            className="block w-full pl-10 pr-20 p-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search ..."
            required
            value={value.keyword}
            onChange={(e) => setValue({ ...value, keyword: e.target.value })}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
