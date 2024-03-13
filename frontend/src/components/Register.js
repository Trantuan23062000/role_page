import React, { useState } from "react";
import { toast } from "react-toastify";
import registerUser from "../services/register";
import { useNavigate } from 'react-router-dom';
 


const Register = () => {

  const navigate = useNavigate()


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inValid = () => {
    if (!email) {
      toast.error("Email khong duoc bo trong !");
      return false;
    }
    if (!password) {
      toast.error("Password khong duoc bo trong !");
      return false;
    }

    if (!username) {
      toast.error("Username khong duoc bo trong !");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Xac nhan mat khau khong dung !");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Email khong hop le !");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    const check = inValid();

    if (check === true) {
      const respone = await registerUser(username, email, password, phone);
      //console.log(">>check response", respone);
      const serverdata = respone.data
      //console.log(serverdata)
      if(+serverdata.EC === 0){
        toast.success(serverdata.EM)
        navigate("/login")
      }else{
        toast.error(serverdata.EM)
      }

    }
  };

  // useEffect(() => {
  //   axios.post("http://localhost:8081/api/v1/register", {
  //     username,
  //     email,
  //     password,
  //     phone,
  //     // axios.get("http://localhost:8081/api/v1/test-api").then(data => {
  //     //   console.log(">>>>>",data)
  //     // },
  //   });
  // }, []);
  return (
    <div className="bg-transparent flex h-50 items-center justify-center px-9 sm:px-6 lg:px-8 m-40">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
        <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt=""
          />

          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register Account
          </h2>

          <div className="space-y-6" method="POST">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-1">
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="username"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email-address"
                  autocomplete="email-address"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autocomplete="password"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  autocomplete="confirm-password"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                onClick={() => handleRegister()}
              >
                Register Account
              </button>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
