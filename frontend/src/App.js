import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListUser from "./components/listUser";
import { Fragment } from 'react';


const App = () => {
  return (
   
    <div className="App">
      <div className="app-container">
        <Router>
          <Fragment>
          <NavBar/> 
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user" element={<ListUser />}></Route>
          </Routes>
          </Fragment>
        </Router>
      </div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </div>
  );
};

export default App;
