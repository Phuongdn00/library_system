import axios from "axios"
import { API_URL } from "../../config"

const add_category= async (category_name)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/category/add",
        method: "post",
        data: {
           category_name
        }
    })
    const result= await res.data
    return result
}

export default add_category