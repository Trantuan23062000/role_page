import axios from "axios";

const loginUser = (valueLogin, password) =>{
  return axios.post("http://localhost:8081/api/v1/login",{
    valueLogin,password
  })
}
export default (loginUser)

