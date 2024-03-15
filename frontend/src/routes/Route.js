import Login from "../components/Login";
import Register from "../components/Register";
import ListUser from "../components/listUser";
import { Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRoutes";
import { Fragment } from "react";
import Projects from "../components/Project";



const AppRoutes = () => {
  
  return (
    <Fragment>
      <PrivateRouter path="/user" element={<ListUser/>} />
      <PrivateRouter path="/projects" element={<Projects/>} />

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/user" element={<ListUser />}></Route> */}
      </Routes>
    </Fragment>
  );
};
export default AppRoutes;
