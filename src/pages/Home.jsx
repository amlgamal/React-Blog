// import React from 'react'

import axios from "axios";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../utils/auth";
import { toast } from "sonner";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const user = getCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setPosts(res.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  const handleDeletePost = async(postId)=>{
    try{
      await axios.delete(`http://localhost:3000/posts/${postId}`)
      setPosts(posts.filter(p=>p.id !== postId))
      toast.success("Post deleted successfully")
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  }

  return (
    <div className=" max-w-3xl  mx-auto mt-6 space-y-6">
      {user && (
        <div
          onClick={() => navigate("/create-post")}
          className="bg-rose-950 text-white fixed bottom-4 right-4 w-14 h-14 flex justify-center items-center rounded-full cursor-pointer"
        >
          +
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} handleDeletePost={handleDeletePost} />
      ))}
    </div>
  );
}
