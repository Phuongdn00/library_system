import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// Define a function named 'add_blog' that accepts three parameters: 'content', 'image', and 'title'
const add_blog= async (content, image, title)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/blogs/add",
        method: "post",
        data: {
            content, 
            time_created: new Date(), // Add the current date and time as the 'time_created' parameter
            image,
            title
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default add_blog