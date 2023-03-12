const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const connection = require("../../database/connect");

const stats= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM history WHERE state= 1")
        const s1= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY"))?.length
        const s2= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(1, "days").format("DD-MM-YYYY"))?.length
        const s3= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(2, "days").format("DD-MM-YYYY"))?.length
        const s4= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(3, "days").format("DD-MM-YYYY"))?.length
        const s5= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(4, "days").format("DD-MM-YYYY"))?.length
        const s6= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(5, "days").format("DD-MM-YYYY"))?.length
        const s7= rows?.filter(item=> moment(item?.time_approve).format("DD-MM-YYYY") === moment().subtract(6, "days").format("DD-MM-YYYY"))?.length
        
        return res.status(200).json([{name: moment().format("DD-MM-YYYY"), stats: s1},
        {name: moment().subtract(1, "days").format("DD-MM-YYYY"), stats: s2},
        {name: moment().subtract(2, "days").format("DD-MM-YYYY"), stats: s3},
        {name: moment().subtract(3, "days").format("DD-MM-YYYY"), stats: s4},
        {name: moment().subtract(4, "days").format("DD-MM-YYYY"), stats: s5},
        {name: moment().subtract(5, "days").format("DD-MM-YYYY"), stats: s6},
        {name: moment().subtract(6, "days").format("DD-MM-YYYY"), stats: s7},
    ])
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= stats