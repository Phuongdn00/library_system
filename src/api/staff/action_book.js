import axios from "axios"
import { API_URL } from "../../config"

const action_book= async (id, status)=> {
    const res= await axios({
        url: API_URL+ "/staff/request/action",
        method: "post",
        data: {
            id,
            status
        }
    })
    const result= await res.data
    return result
}

export default action_book