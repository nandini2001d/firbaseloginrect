import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      toast.info("Plz sing-in first!");
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-12">
            <h2>Welcome To TODO List Portal</h2>
            <Link to="/add">
              <button className="btn btn-primary mt-3">Add TODO List <FaEdit/></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
