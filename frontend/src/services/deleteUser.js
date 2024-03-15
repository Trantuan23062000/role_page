import axios from "axios"
const DeleteUerAPI = (user) =>{
   return axios.delete("http://localhost:8081/api/v1/user/delete",{data:{id:user.id}})
}

export default DeleteUerAPI