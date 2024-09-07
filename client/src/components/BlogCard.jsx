import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function BlogCard({
  title,
  description,
  image,
  id,
  blogid,
  bloguserid,
}) {
  const isUser = id === bloguserid;
  console.log(id, blogid);
  console.log(bloguserid);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blogdetail/${blogid}`);
  };

  const handleDelete = (blogid) => {
    axios
      .delete(`http://localhost:8080/api/v1/blog/delete-blog/${blogid}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-w-sm mb-5 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {isUser && (
          <>
            <div className="flex justify-center">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 mr-2 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleDelete(blogid)}
                className="bg-red-400 border rounded-md"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
