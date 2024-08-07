import {signOut } from "firebase/auth";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { FaEdit, FaEye, FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

const afterLogin = [
  { name: "Home", to: "/" ,icone:<FaHome/>},
  { name: "Add Todo List", to: "/add",icone:<FaEdit/> },
  { name: "All Todo List", to: "/all" ,icone:<FaEye/> },
];

export default function Navigation() {
  const navigate = useNavigate();
  const logouFun = () => {
    signOut(auth).catch((erre) => {
    });

    localStorage.removeItem("email");
    navigate("/signin");
    toast.success("Logout Successfully");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3e3e3"}}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
        <img src="logo192.webp" style={{width:"30px",height:"30px"}}/> TODO LIST
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {afterLogin.map((value,id) => {
              return (
                <li className="nav-item" key={id}>
                  <NavLink className="nav-link" key={value.name} to={value.to}>
                   {value.icone} {value.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <form className="d-flex">
            <button className="btn btn-danger" onClick={logouFun}>
             <FiLogOut/> Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
