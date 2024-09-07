import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function BlogDetails() {
  const [title, setTitle] = useState([]);

  const [description, setDescription] = useState([]);

  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const uid = localStorage.getItem("userId");
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/blog/get-blog/${id}`)
      .then((user) => {
        console.log(user);
        setTitle(user.data.blog.title);
        setDescription(user.data.blog.description);
        setImage(user.data.blog.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/v1/blog/update-blog/${id}`, {
        title: title,
        description: description,
        image: image,
        user: uid,
      })
      .then((users) => {
        console.log(users);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center space-1">
      <form onSubmit={update}>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <input
          className="outline m-3 rounded-sm"
          type="text"
          placeholder="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <input
          className="outline  m-3 rounded-sm"
          type="text"
          placeholder="email"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Image
        </label>
        <input
          className="outline  m-3 rounded-sm"
          type="text"
          placeholder="age"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          className="border rounded-md px-4 py-2  bg-gradient-to-r
              from-orange-500 to-pink-500 text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
}
