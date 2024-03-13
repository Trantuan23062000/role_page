import axios from "axios";
const registerUser = (username, email, password, phone) => {
  return axios.post("http://localhost:8081/api/v1/register", {
    username,
    email,
    password,
    phone,
  })
}
export default registerUser

