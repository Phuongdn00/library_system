const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const book= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT *, book_id as id FROM book INNER JOIN author ON book.author_id = author.author_id")
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= book