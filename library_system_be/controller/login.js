const connection = require("../database/connect")
const asyncHandler = require('express-async-handler')
// const {v4}= require("uuid")
const md5 = require("md5")

const login= asyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT user_id, role FROM user WHERE user_email= ? AND user_password=? ", [req.body.account, md5(req.body.password)])
        if(rows.length > 0) {
            if(parseInt(rows[0]?.role)=== 3) {
                return res.status(200).json({login: true, exist: true, ...rows[0], isAdmin: true})
            }
            if(parseInt(rows[0]?.role)=== 2) {
                return res.status(200).json({login: true, exist: true, ...rows[0], isStaff: true})
            }
            return res.status(200).json({login: true, exist: true, ...rows[0]})
            
        }
        else {
           
            return res.status(200).json({login: false, exist: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({login: false})
    }
})


module.exports= login