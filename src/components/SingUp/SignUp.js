import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const loginfuct = async (e) => {
    e.preventDefault();

    try {
      const login = await createUserWithEmailAndPassword(auth, email, password);
      alert("Sing-Up Sucessfully Plz Sign-In");
      navigate('/signin')
      
    } catch (error) {
      alert("email id is already registerd");
    }
  };

  return (
    <>
      <div className="container-fluid main-container">
        <div className="row">
          <div className="col-lg-5 text-center col-md-12 main-col">
            <div
              className="card main-card"
              style={{
               
                top: "30%",
                border: "none",
               
              }}
            >
              <div
                className="card-header text-center text-black bg-white "
                style={{ border: "none" }}
              >
                <h3>Sign Up <FaUser/></h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti assumenda magnam reprehenderit ab temporibus est
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, facere?
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={loginfuct}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter Your Email Id"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Sign Up <FaUser/>
                  </button>
                  <br />
                  <br />
                  <h6>
                    Alredy have account ? <Link to="/signin">Sing In <FiLogIn/> </Link>
                  </h6>
                </form>
              </div>

            </div>
          </div>

          <div className="col-lg-7 col-md-12 text-right">
            <img src="/img/bg.png" style={{ width: "100%", height: "100vh" }} />
          </div>
        </div>
      </div>
    </>
  );
}
