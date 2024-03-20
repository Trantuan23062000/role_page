import axios from "axios"

const createUser = (userData) =>{
    return axios.post("http://localhost:8081/api/v1/user/create",{...userData})
}

export default createUser