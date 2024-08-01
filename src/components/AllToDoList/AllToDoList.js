import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import {getDatabase,ref,set,push, get, remove, Database, query, orderByChild, equalTo} from 'firebase/database'
import { app } from "../../firebase/firebase";

export default function AllToDoList() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      toast.info("Plz sing-in first!");
      navigate("/signin");
    }

    try {
      if (title === "") {
        getalldata();
      } else if (title) {
        seachbytitle();
      }
    } catch (error) {
      toast.error("Somthing wents wrong!,logout and login again");
    }
  }, []);

  const [dataall, setDataAll] = useState([]);
  const emmai= localStorage.getItem('email');
  const sp= emmai.split('.')
  const db=getDatabase(app);

  const getalldata = async() => {

    const newRef=ref(db,`List/Add/${sp[0]}`);
    const snapPic= await get(newRef);

    if(snapPic.exists()){
    const mayData=snapPic.val();
       const targetObject=Object.keys(mayData).map((myid)=>{
            return{
                ...mayData[myid],
                id:myid
            }
        });
        setDataAll(targetObject);
    }
  };

  const [valueset, setValue] = useState("Filter By");

  const seachbytitle = async() => {

      const newRef=ref(db,`List/Add/${sp[0]}`);
      const dataquery=query(newRef,orderByChild('title'),equalTo(title))
     
      const snapPic= await get(dataquery);
      if(snapPic.exists()){
          setDataAll(Object.values(snapPic.val()));
      }
      else{
         if(title===""){
          getalldata();
         }
         else{
          setDataAll([])
         }
      }
  };

  //const data={id,icode}
  const putmethod = async(icode, id) => {
    const newRef=ref(db,`List/Add/${sp[0]}/${id}`);
    const snapPic= await get(newRef);
        if(snapPic.exists()){
            const targetObject=snapPic.val();
            set(newRef,{
                title:targetObject.title,
                email:localStorage.getItem('email'),
                description:targetObject.description,
                status:icode
            }).then(()=>{
                toast.success("Data updated successfully");
                getalldata();
            }).catch((errer)=>{
              toast.error("errer");
            })
        }
        else{
            toast.error("errer");
        }
  };

  const filterbystatus = async(valueset) => {
    const newref=ref(db,`List/Add/${sp[0]}`)
    const dataquery=query(newref,orderByChild('status'),equalTo(valueset))
   
    const snapPic= await get(dataquery);
    if(snapPic.exists()){
        setDataAll(Object.values(snapPic.val()));
    }
    else{
      setDataAll([]);
    }
  };

  const allfuc = () => {
    setValue("Filter By");
    getalldata();
  };

  const deletemethod = async(id) => {
   
    const newRef=ref(db,`List/Add/${sp[0]}/${id}`);
    await remove(newRef);
      getalldata();
      toast.success("Data delete successfully");

  };

  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <h3>TODO List</h3>
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
            <ul
              style={{
                listStyle: "none",
                padding: "5px 20px",
                float: "right",
                border: "1px solid black",
                width: "180px",
              }}
            >
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
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
                      {value.status === "Deleted" ? (
                        <button
                          className="btn btn-danger text-white"
                          onClick={() => {
                            deletemethod(value.id);
                          }}
                        >
                          Delete Permanatly <MdDelete />
                        </button>
                      ) : (
                        ""
                      )}
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
