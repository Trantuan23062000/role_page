import axios from "axios"
const getGroup = () =>{
        return axios.get("http://localhost:8081/api/v1/group/read")  
}
export default getGroup