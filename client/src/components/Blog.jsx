import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/blog/all-blog")
      .then((response) => {
        setBlogs(response.data.blogs);
        // console.log(response.data.blogs); // Log fetched data to check its structure
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-4">Blog List</h1>
      {blogs.map((blog) => (
        <BlogCard
          title={blog.title}
          description={blog.description}
          image={blog.image}
          id={id}
          blogid={blog._id}
          bloguserid={blog.user._id}
        />
      ))}
    </div>
  );
}
