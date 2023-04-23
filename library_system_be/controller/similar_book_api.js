const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

// 同じ本のAPIリクエストを処理するための非同期関数を定義する
const similar_book_api= expressAsyncHandler(async(req, res)=> {
    try {
        // データベースからデータを取得する
        const [rows]= await connection.execute("SELECT book_in_book.book_in_book_id, history.state, history.is_borrow, book.book_name FROM book_in_book INNER JOIN book ON book_in_book.book_id = book.book_id LEFT JOIN history ON history.book_id = book_in_book.book_in_book_id WHERE book.book_id= ? GROUP BY book_in_book.book_in_book_id", [req.params.book_id])
        return res.status(200).json(rows)
        
    } catch (error) {
        return res.status(500).json(error)
    }
})
    
module.exports= similar_book_api
