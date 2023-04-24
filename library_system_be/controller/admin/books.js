const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const {v4 }= require("uuid")

const books= {
    get: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT book.*, author.* ,CONCAT('[',GROUP_CONCAT(JSON_OBJECT('category_id', category.category_id, 'category_name', category.category_name)),']') AS categories FROM book LEFT JOIN category_book ON category_book.book_id = book.book_id LEFT JOIN category ON category.category_id= category_book.category_id INNER JOIN author ON author.author_id=book.author_id GROUP BY book.book_id");
        
        return res.status(200).json(rows)
    }),
    getById: expressAsyncHandler(async(req, res)=> {
        const [books]= await connection.execute("SELECT * FROM book INNER JOIN category_book ON category_book.book_id = book.book_id INNER JOIN category ON category.category_id= category_book.category_id INNER JOIN author_book ON author_book.book_id=book.book_id INNER JOIN author ON author.author_id=author_book.author_id WHERE book.book_id = '"+req.query.id+"';");
        
         // Create empty arrays to hold the result data, as well as book and author IDs to ensure uniqueness
        let result = [];
        let bookIds  =[];
        
        // Loop through each row returned by the query
        for(var e of books){
            // Check if the book ID has already been added to the result array
            if(!bookIds.includes(e.book_id)){
                // Round the book rating to one decimal place
                const rating = Math.round(e.book_rating * 10) / 10;
                let tmp = {};
                let auths = [];
                let authIds = [];
                let categories = [];
                let categoryIds = [];

                // Add basic book information to the result object
                tmp.book_id = e.book_id;
                tmp.book_name = e.book_name;
                tmp.book_quantity = e.book_quantity;
                tmp.book_description = e.book_description;
                tmp.cover_photo = e.cover_photo;
                tmp.link_book = e.link_book;
                tmp.book_rating = rating;

                // Loop through all rows again to find categories and authors associated with this book
                for(var value of books){

                    // Check if this row corresponds to the same book ID as the current result object
                    if(value.book_id === tmp.book_id){
                        let category = {};
                        category.category_id = value.category_id;
                        category.category_name = value.category_name;
                        if(!categoryIds.includes(category.category_id)){
                            categories.push(category);
                        }
                        categoryIds.push(category.category_id);

                        let auth = {};
                        auth.author_id = value.author_id;
                        auth.author_name = value.author_name;
                        auth.author_gender = value.author_gender;
                        auth.author_email = value.author_email;
                        auth.author_brithday = value.author_brithday;
                        auth.author_avatar = value.author_avatar;
                        auth.author_phone = value.author_phone; 
                        if(!authIds.includes(auth.author_id)){
                            auths.push(auth);
                        }
                        authIds.push(auth.author_id);
                    }
                }

                tmp.categories = categories;
                tmp.auths = auths;
                result.push(tmp);
            }
            // Add the book ID to the bookIds array to ensure uniqueness
            bookIds.push(e.book_id);
        }
        return res.status(200).json(result[0])
    }),
    add: expressAsyncHandler(async (req, res)=> {
        try {
            const id = v4();
            Array.from(Array(parseInt(req.body.book_quantity)).keys()).map(async item=> await connection.execute("INSERT INTO book_in_book(book_in_book_id, book_id) VALUES(?, ?)", [v4(), id]))
            await connection.execute("INSERT INTO book VALUES(?, ?, ?, ?, ?, ?, ?, ?)", 
            [
                id, 
                req.body.book_name || "",
                req.body.book_quantity || "",
                req.body.book_rating || "",
                req.body.book_description || "",
                req.body.cover_photo?.img || "",
                req.body?.author_id || "",
                req.body?.link_book ||"",
            ]);

            await req.body.category_book.forEach(async category => {
                await connection.execute("INSERT INTO category_book VALUES(?, ?)", 
                [
                    id,
                    category.id || "",
                ]);
            });

            return res.status(200).json({add: true})
        } catch (error) {
            console.log(error)
           return res.status(500).send(error) 
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows1]= await connection.execute("SELECT book_quantity FROM book WHERE book_id= ?", [req.body?.book_id])
            if(rows1.length > 0) {
                console.log(rows1)
                if(parseInt(rows1?.[0]?.book_quantity) < parseInt(req.body?.book_quantity)) {
                    Array.from(Array(parseInt(req.body?.book_quantity - parseInt(rows1?.[0]?.book_quantity))).keys()).map(async item=> await connection.execute("INSERT INTO book_in_book(book_in_book_id, book_id) VALUES(?, ?)", [v4(), req.body?.book_id]))
                }
            }
            await connection.execute("UPDATE book SET book_name= ?, book_quantity= ?, book_rating= ?, book_description= ?, cover_photo= ?, link_book= ? WHERE book_id= ?", 
            [
                req.body.book_name,
                req.body.book_quantity,
                req.body.book_rating,
                req.body.book_description,
                req.body.cover_photo,
                req.body.link_book,
                req.body.book_id
            ]);

            // await connection.execute("DELETE FROM author_book WHERE book_id= ?", [req.body.book_id]);
            await connection.execute("DELETE FROM category_book WHERE book_id= ?", [req.body.book_id]);

            await req.body.category_book.forEach(async cb => {
                await connection.execute("INSERT INTO category_book VALUES(?, ?)", 
                [
                    req.body.book_id,
                    cb.category_id || ""
                ]);
            });

            return res.status(200).json({update: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            // eslint-disable-next-line
            await connection.execute("DELETE FROM book WHERE book_id= ?", [req.query.id]);
            await connection.execute("DELETE FROM author_book WHERE book_id= ?", [req.query.id]);
            await connection.execute("DELETE FROM category_book WHERE book_id= ?", [req.query.id]);

            return res.status(200).json({delete: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
}


module.exports= books