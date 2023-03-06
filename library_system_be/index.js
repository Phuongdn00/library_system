const express= require("express")
const cors= require("cors")
const router = require("./route/route")

const app= express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(router)

app.listen(4000, ()=> console.log("Server run on port 4000"))