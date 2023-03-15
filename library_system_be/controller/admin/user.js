const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const user= {
    get: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT user_id as id, user_name as name, user_email as email, user_phone as phone, user_address as address FROM user WHERE user.role= 1")
        return res.status(200).json(rows)
    }),
    getStaff: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT user_id as id, user_name as name, user_email as email, user_phone as phone, user_address as address FROM user WHERE user.role= 2")
        return res.status(200).json(rows)
    }),
}

module.exports= user