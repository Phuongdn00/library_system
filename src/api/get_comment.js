import axios from "axios"
import { API_URL } from "../config"

// Define an asynchronous function called "get_comment"
const getComment= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/comment/",
        method: "get",
        params: {
            book_id
        }
    })
    const result= await res.data
    return result
}

export default getComment