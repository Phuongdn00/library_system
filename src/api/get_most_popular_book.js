import axios from "axios"
import { API_URL } from "../config"

// Define an asynchronous function called "get_most_popular_book"
const get_most_popular_book= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/get_most_popular_book",
        method: "get",
        
    })
    const result= await res.data
    return result
}

export default get_most_popular_book