import axios from "axios"
import { API_URL } from "../config"

const get_rating_book= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/book/score",
        method: "get",
        params: {
            book_id
        }
    })
    const result= await res.data
    return result
}

export default get_rating_book