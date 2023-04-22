import axios from "axios"
import { API_URL } from "../config"

// Define an asynchronous function called "get_release_book"
const get_release_book= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/get_release_book",
        method: "get",
        
    })
    const result= await res.data
    return result
}

export default get_release_book