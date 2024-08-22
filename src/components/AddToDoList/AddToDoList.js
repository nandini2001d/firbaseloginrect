import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getDatabase,
  ref,
  set,
  push,
} from "firebase/database";
import { app } from "../../firebase/firebase";

export default function AddToDoList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      toast.info("Plz sing-in first!",
        {
          toastId:"information1"
        });
      navigate("/signin");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [show, setShow] = useState(false);

 // const data = { title, description, email };
 

  const addtodolist = async (e) => {
    e.preventDefault();
    e.preventDefault();

    toast.promise(addtodolist,{
      pending:"Please wait todo-list is adding!"
    },{
      toastId:"pending1"
    })
    setShow(true);
     
    const emmai = localStorage.getItem("email");
    const sp = emmai.split(".");
    const db = getDatabase(app);
    const newRef = push(ref(db, "List/Add/" + sp[0]));
    await set(newRef, {
      title: title,
      description: description,
      email: email,
      status: null,
    })
      .then(() => {
        // toast.success("Data added successfully",
        //   {
        //     toastId:"sucess1"
        //   });
        setTitle("");
        setDescription("");
        navigate("/all");
      })
      .catch((errer) => {
        toast.error("errer",
          {
            toastId:"errer1"
          });
      });
  };

  return (
    <>
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-sm-12">
            <div className="card p-2" style={{ border: "none" }}>
              <div
                className="card-header text-center bg-white text-dark"
                style={{ border: "none" }}
              >
                <h3>
                  <FaEdit /> Todo
                </h3>
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
                      style={{ border: "1px solid black"}}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="6"
                      required
                      placeholder="Description"
                      style={{ border: "1px solid black", resize: "none" }}
                      name="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  {show === false ? (
                    <button type="submit" className="btn btn-primary w-100">
                      <FaEdit /> ADD
                    </button>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
