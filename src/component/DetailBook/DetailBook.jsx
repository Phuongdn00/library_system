import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_detail_book from '../../api/get_detail_book'
import CommentComponent from '../Comment/Comment'
import Header from '../Home/Header'
import AddToCart from './AddToCart'

const DetailBook = () => {
  const [amount, setAmount]= useState(()=> 1)
  const [searchOn, setSearchOn]= useState(()=> false)
  const [data, setData]= useState({})
  const {book_id}= useParams()
  useEffect(()=> {
    (async ()=> {
        const result= await get_detail_book(book_id)
        return setData(result)
    })()
  }, [book_id])
  return (
    <>
        <Header searchOn={searchOn} setSearchOn={setSearchOn} />
        {
            searchOn=== true && <div style={{padding: 20, width: "100%"}} className={"c-flex-center"}>
            
            </div>
        }
        <>

        </>
        <div className={"c-flex-center"} style={{width: "100%"}}>
            <div style={{width: "100%", maxWidth: 1200, display: "flex", gap: 20, padding: 5}}>
                <div className={"x-2-a"} style={{width: 350}}>
                    <img style={{width: "100%", aspectRatio: 2 / 3, borderRadius: 10}} src={data?.cover_photo} alt="" />
                </div>
                <div style={{flex: "1 1 0"}}>
                    <div style={{fontWeight: 600, fontSize: 20}}>{data?.book_name}</div>
                    <div style={{margin: "4px 0"}}>
                        <span>Author: </span>
                        <strong>{data?.author_name}</strong>
                    </div>
                    <div style={{margin: "4px 0"}}>
                        <span>Description: </span>
                    </div>
                    <div style={{maxWidth: "70%"}}>
                        {
                            data?.book_description?.split("\n")?.map((item, key)=> <div key={key}>
                                <div style={{margin: "6px 0"}}>
                                    {item}
                                </div>
                            </div>)
                        }
                    </div>
                    {
                        data?.link_book?.length > 0 && <div>
                            Link book <a rel="noreferrer" href={data?.link_book} target={"_blank"} style={{color: "#2e89ff", fontWeight: 600}}>here</a>
                        </div>
                    }
                    <AddToCart amount={amount} setAmount={setAmount} {...data} />
                    <div ></div>
                </div>
            </div>
        </div>
        <div style={{width: "100%", padding: 5}}>
            <CommentComponent />
        </div>
    </>
  )
}

export default DetailBook