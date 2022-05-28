import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import logo from "../../images/logo/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const navItem = (
    <div className="flex items-center">
      <li>
        <Link to="/home">Home</Link>
      </li>

      {user ? (
        <>
          <button onClick={() => signOut(auth, navigate("/login"))}>
            Sign Out
          </button>
          <Link className="ml-3" to="/dashboard">
            Dashboard
          </Link>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        <Link to="/portfolio">My Portfolio</Link>
      </li>
    </div>
  );
  return (
    <div className="navbar bg-[#00008B] text-white h-24 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            {navItem}
          </ul>
        </div>
        <div className="flex items-center w-[200px]">
          <img className=" " src={logo} alt="" />
          <Link to="/home" className="btn btn-ghost normal-case text-xl ">
            Bit & Bytes
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{navItem}</ul>
      </div>
      <div className="navbar-end mr-2">{user && user.displayName}</div>
    </div>
  );
};

export default NavBar;
