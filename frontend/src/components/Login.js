import React, { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import LoginUser from "../services/login"
import {useNavigate} from "react-router-dom"
const Login = () => {
  const  navigate = useNavigate()
  const [valueLogin,setValueLogin] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async() =>{
    if(!valueLogin){
      toast.error("Please enter email or phone number")
      return
    }
    if(!password){
      toast.error("Please enter password")
      return
    }

    await LoginUser(valueLogin,password)

    const response = await LoginUser(valueLogin,password)

    if(response && response.data && +response.data.EC === 0){
          toast.success(response.data.EM)
          let data = {
            isAuthencated:true,
            token:'Fake token'
          }

          sessionStorage.setItem('account',JSON.stringify(data))
          navigate('/user')
          window.location.reload()
    }

    if(response && response.data && +response.data.EC !==0){
      toast.error(response.data.EM)
    }

    //console.log(">>check response",response.data)
  }
  const  handlePressEnter = (event) =>{
    //console.log(">>",event.charCode,event.code);
    if(event.charCode === 0 && event.code === "Enter" ){
      handleLogin()
    }
  }

  return (
    <div className="bg-transparent flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt=""
          />

          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login Account
          </h2>

          <div className="space-y-6">
            <div>
              <label
                for="password"
                className="block text-sm font-medium text-gray-700"
              >
                Email or phonenumber
              </label>
              <div className="mt-1">
                <input
                  value={valueLogin}
                  onChange={(event) =>{setValueLogin(event.target.value)}}
                  autocomplete="email-address"
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>  

            <div>
              <label
                for="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(event)=>{setPassword(event.target.value)}}
                  onKeyDown={(event)=>handlePressEnter(event)}
                  type="password"
                  autocomplete="password"
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
              onClick={()=>{handleLogin()}}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Login
              </button>
            </div>

            <div>
              <button
                
                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                 <Link to="/">Back to home</Link>
              </button>
              
            </div>

            <hr />
            <div>
              <button
                className="flex w-full justify-center rounded-md border border-transparent bg-gray-950 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                 <Link to="/register"> I don't account register now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
