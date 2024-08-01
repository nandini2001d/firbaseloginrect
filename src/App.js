import "./App.css";
import SignUp from "./components/SingUp/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import AddToDoList from "./components/AddToDoList/AddToDoList";
import AllToDoList from "./components/AllToDoList/AllToDoList";
import PageErrer from "./components/PageErrer/PageErrer";
import Login from "./components/LoginRegister/Login";


function App() {
  const router = createBrowserRouter([
    {
      path: "/singup",
      element: <SignUp/>,
    },
    {
      path: "/signin",
      element: <SignIn/>,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <AddToDoList />,
    },
    {
      path: "/all",
      element: <AllToDoList />,
    },
    {
      path:'/*',
      element:<PageErrer/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
