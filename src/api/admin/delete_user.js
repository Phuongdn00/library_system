import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// この関数はIDによってユーザーを削除するためにサーバーにリクエストを送信します
const delete_user= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/delete",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // アクセストークンをリクエストヘッダーに添付する
        },
        data: {
            // 削除するユーザーIDをリクエストボディに送信する
            user_id: id
        }
    })
    const result= await res.data
    return result
}

export default delete_user
