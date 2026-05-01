// import React from "react";
import { getCurrentUser, logout } from "../utils/auth";
import { useNavigate, NavLink } from "react-router";

export default function Navbare() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-rose-950 font-bold border-b-2 border-rose-950 pb-1"
      : "text-gray-700 font-medium hover:text-rose-950 transition";

  return (

    <div className="navbar bg-white shadow-md px-6">


      <div className="flex-1">
        <NavLink
          to="/"
          className="text-2xl font-bold text-rose-950 tracking-wide"
        >
          PIXELLog
        </NavLink>
      </div>

      <div className="flex-1 flex justify-center gap-8">
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>

        {user && (
          <NavLink to="/create-post" className={navStyle}>
            Create Post
          </NavLink>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {!user ? (
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-sm bg-white text-rose-950 border border-rose-950 hover:bg-rose-100"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="btn btn-sm bg-rose-950 text-white hover:bg-rose-900"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost font-medium"
            >
              Hi, {user?.userName} 👋
            </div>

            <ul className="dropdown-content menu bg-base-200 rounded-box z-1 w-44 p-2 shadow-lg ">

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}