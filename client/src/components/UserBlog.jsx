import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard"; // Adjust the import path as needed

export default function UserBlog() {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem("userId");

  const getUserBlogs = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-4">Blog List</h1>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            id={id}
            blogid={blog._id}
            bloguserid={blog.user}
          />
        ))
      ) : (
        <div>
          <h1>No blogs available</h1>
        </div>
      )}
    </div>
  );
}
