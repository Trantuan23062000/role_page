import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Register from "./components/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ListUser from "./components/listUser"
import { Fragment, useEffect, useState } from 'react'
import _ from "lodash"


const App = () => {
  const [account,setAccount] = useState({})
  useEffect(()=>{
    let session = sessionStorage.getItem('account')
    if(session){
      setAccount(JSON.parse(session))
    }

  },[])
  return (
   
    <div className="App">
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthencated &&  <NavBar/>  }
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
