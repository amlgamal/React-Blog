// import React from 'react'

import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { getCurrentUser } from "../utils/auth";
import { useEffect } from "react";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const user = getCurrentUser();

  const navigate = useNavigate();

  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const getPost = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/posts/${id}`);

          reset({
            title: res.data.title,
            content: res.data.content,
            image: res.data.image,
          });
        } catch (error) {
          console.error(error);
        }
      };

      getPost();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        // Edit existing post
        await axios.put(`http://localhost:3000/posts/${id}`, {
          ...data,
          userId: user.id,
          author: user.username,
          publishedAt: new Date().toISOString(),
        });
        toast.success("Post updated successfully ");
      } else {
        // Create new post
        await axios.post("http://localhost:3000/posts", {
          ...data,
          userId: user.id,
          author: user.userName,
          publishedAt: new Date().toISOString(),
        });
        toast.success("Post created successfully ");
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-6">Create New Post</h1>
      <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <InputField
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Post Title"
              error={errors.title?.message}
              {...register("title", {
                required: "Title is required",
              })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              placeholder="Post Content"
              rows="5"
              className={`w-full border p-2 rounded ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Post Content"
              rows="5"
              {...register("content", {
                required: "Content is required",
              })}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image</label>
            <InputField
              type="file"
              className="file-input w-full fill-red-950 border border-gray-300 outline-none rounded"
              {...register("image")}
            />
          </div>
          <button
            type="submit"
            className="bg-rose-950 text-white py-2 px-4 rounded hover:bg-rose-900"
          >
            {isEditMode ? "Update " : "Create "}
          </button>
        </form>
      </div>
    </div>
  );
}
