import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";

const NavBar = () => {
  const [isShow, setIsShow] = useState(true)
  let location = useLocation()
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsShow(false)
    }
  },[])
  return (
    <div>
      {isShow === true && 
        <>
          <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg ">
            <div className="px-4">
              <div className="flex items-center justify-between">
                <div className="flex shrink-0">
                  <a aria-current="page" className="flex items-center" href="/">
                    <img
                      className="h-7 w-auto"
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      alt=""
                    />
                  </a>
                </div>

                <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                  <div
                    aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Link to="/Home">Home</Link>
                  </div>
                  <div className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                    <Link to="/user">List Users</Link>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                   
                    <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"> <Link to="/register">Register</Link></button>
                
                    <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"><Link to="/login">Login</Link></button>
                  
                </div>
              </div>
            </div>
          </header>
        </>
      }
    </div>
  );
};

export default NavBar;
