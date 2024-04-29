import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { FaBeer, FaGripVertical, FaSearch, FaUserMinus } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

export default function AllToDoList() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/signin");
    }

    if (title === "") {
      getalldata();
    } else if (title) {
      seachbytitle();
    }
  }, []);

  const [dataall, setDataAll] = useState([]);

  const getalldata = async () => {
    await fetch(
      `https://newone-newonetodo.onrender.com/todolists/email/${localStorage.getItem("email")}`
    )
      .then((value) => {
        value.json().then((result) => {
          setDataAll(result);
        });
      })
      .catch((errer) => {
        console.log(errer);
      });
  };

  const [valueset, setValue] = useState("Filter By");

  const seachbytitle = async () => {
    await fetch(`https://newone-newonetodo.onrender.com/todolists/title/${title}`)
      .then((value) => {
        value.json().then((result) => {
          setDataAll(result);
        });
      })
      .catch((errer) => {
        console.log(errer);
        getalldata();
      });
  };

  //const data={id,icode}
  const putmethod = async (icode, id) => {
    await fetch(
      `https://newone-newonetodo.onrender.com/todolists/status/${id}?id=${id}&status=${icode}`,
      {
        method: "PUT",
      }
    )
      .then((value) => {
        value.json().then((result) => {
          getalldata();
        });
      })
      .catch((errer) => {
        console.log(errer);
      });
  };

  const filterbystatus = async (valueset) => {
    await fetch(
      `https://newone-newonetodo.onrender.com/todolists/status/${valueset}/${localStorage.getItem(
        "email"
      )}`
    )
      .then((value) => {
        value.json().then((result) => {
          setDataAll(result);
        });
      })
      .catch((errer) => {
        console.log(errer);
      });
  };

  const allfuc = () => {
    setValue("Filter By");
    getalldata();
  };

  const addtospecific = () => {};
  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <h3>ToDO List</h3>
        <div className="row mt-4">
          <div className="col-md-6 col-sm-12">
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="search"
                className="form-control me-2"
                placeholder="search"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <button
                onClick={seachbytitle}
                className="btn w-50 btn-primary"
                type="submit"
              >
                Search <FaSearch />{" "}
              </button>
            </form>
          </div>
          <div className="col-md-6 col-sm-12 mt-3">
            <ul style={{
                listStyle: "none",
                padding: "5px 20px",
                float: "right",
                border: "1px solid black",
                width: "180px",
              }} >
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  {valueset}
                </button>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        filterbystatus("Completed");
                        setValue("Completed");
                      }}
                    >
                      Completed
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        filterbystatus("Favourite");
                        setValue("Favourite");
                      }}
                    >
                      Favourite
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        filterbystatus("Deleted");
                        setValue("Deleted");
                      }}
                    >
                      Deleted
                    </button>
                  </li>
                  {valueset === "Filter By" ? (
                    ""
                  ) : (
                    <li>
                      <button className="dropdown-item" onClick={allfuc}>
                        All
                      </button>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="row" style={{ marginTop: "120px" }}>
          {dataall.map((value) => (
            <div
              className="col-12 mb-2"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="card" style={{ border: "none" }}>
                <div className="card-body">
                  <div className="d-flex">
                    <div>
                      <h5>{value.title}</h5>
                      <p>{value.description}</p>
                      <h6
                        style={
                          value.status === "Deleted"
                            ? { color: "red", fontWeight: "bold" }
                            : value.status === "Favourite"
                            ? { color: "darkgreen", fontWeight: "bold" }
                            : value.status === "Completed"
                            ? { color: "darkblue", fontWeight: "bold" }
                            : { color: "black", fontWeight: "bold" }
                        }
                      >
                        {value.status}
                      </h6>
                    </div>

                    <ul
                      style={{
                        listStyle: "none",
                        position: "absolute",
                        right: "0",
                      }}
                    >
                      <li className="nav-item dropdown">
                        <button
                          className="nav-link "
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FiMoreVertical />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                putmethod("Completed", value.id);
                              }}
                            >
                              Completed
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                putmethod("Favourite", value.id);
                              }}
                            >
                              Favourite
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                putmethod("Deleted", value.id);
                              }}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
