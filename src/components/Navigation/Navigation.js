import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { LiaStar } from "react-icons/lia";
import { ListGroup } from "react-bootstrap";

const afterLogin = [
  { name: "Home", to: "/" },
  { name: "Add Todo List", to: "/add" },
  { name: "All Todo List", to: "/all" },
];

export default function Navigation() {
  const navigate = useNavigate();
  const logouFun = () => {
    signOut(auth).catch((erre) => {
      console.log(erre);
    });

    localStorage.removeItem("email");
    navigate("/signin");
    alert("Logout Successfully");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3e3e3"}}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
        TODO LIST
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
            {afterLogin.map((value) => {
              return (
                <li className="nav-item">
                  <NavLink className="nav-link" key={value.name} to={value.to}>
                    {value.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <form className="d-flex">
            <button className="btn btn-danger" onClick={logouFun}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
