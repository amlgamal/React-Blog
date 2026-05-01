// import React from 'react'
import { useNavigate } from "react-router";
import { getCurrentUser } from "../utils/auth";

export default function PostCard({ post, handleDeletePost }) {
  const user = getCurrentUser();
  const isOwner = user?.id === post.userId;

  const navigate = useNavigate()

  return (
    <div className="card bg-white shadow-xl hover:shadow-lg transition relative p-8">
      <div className="absolute top-2 right-2">
        {isOwner && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
              •••
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
              <li className="text-blue-600">
                <button onClick={()=> navigate(`edit-post/${post.id}`)}>Edit</button>
              </li>
              <li className="text-red-600">
                <button onClick={()=>handleDeletePost(post.id)}>Delete</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center p-4 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-lg font-bold">{post.title}</h2>

          <p className="text-sm text-gray-700">{post.content}</p>

          <div className="text-xs text-gray-500">
            <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
            <p>Author: {post.author}</p>
          </div>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
