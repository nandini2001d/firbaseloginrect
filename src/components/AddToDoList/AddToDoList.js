import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";

export default function AddToDoList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/signin");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const data = { title, description, email };

  const addtodolist = (e) => {
    e.preventDefault();

    fetch("https://newone-newonetodo.onrender.com/todolists", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((value) => {
        value.json().then((result) => {
          console.log(result);
          alert("Todo list added successfully");
          navigate("/all");
        });
      })
      .catch((errer) => {
        console.log(errer);
      });
  };

  return (
    <>
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-sm-12">
            <div className="card p-5" style={{ border: "none" }}>
              <div
                className="card-header text-center bg-white text-dark"
                style={{ border: "none" }}
              >
                <h3>Todo</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Deleniti eum asperiores provident corporis! Voluptates quia
                  fugiat nulla, possimus cumque sit praesentium libero quae
                  atque numquam perferendis ex,
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={addtodolist}>
                  <input
                    type="text"
                    value={email}
                    name="email"
                    readOnly
                    style={{ display: "none" }}
                  />

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    ADD
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
