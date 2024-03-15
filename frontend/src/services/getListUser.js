import axios from "axios"

const fetchListUser =(page,limit) =>{
   return axios.get(`http://localhost:8081/api/v1/user/read/?page=${page}&limit=${limit}`)
}

export default fetchListUser