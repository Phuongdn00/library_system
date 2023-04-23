import axios from "axios"
import { API_URL } from "../config"

// 非同期関数「get_category」を定義する
const get_category= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/get_category",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_category
