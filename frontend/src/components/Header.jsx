import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Campaign Dashboard</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>Welcome, {user.name || user.email}!</span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 px-4 py-2 rounded text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
