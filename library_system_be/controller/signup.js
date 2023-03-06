const connection = require("../database/connect")
const asyncHandler = require('express-async-handler')
const {v4}= require("uuid")
const md5 = require("md5")

const signup= asyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT user_id FROM user WHERE user_email= ?", [req.body.email])
        if(rows.length > 0) {
            return res.status(200).json({signup: false, exist: true})
        }
        else {
            // eslint-disable-next-line
            const [rows]= await connection.execute("INSERT INTO user VALUES(?, ?, ?, ?, ?, ?, ?)", [v4(), req.body.userName, req.body.email, req.body.phone, md5(req.body.password), req.body.address, 1])
            return res.status(200).json({signup: true, exist: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({signup: false})
    }
})


module.exports= signup