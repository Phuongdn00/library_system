import React, { useEffect, useState } from 'react'
import {IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import {AiFillDelete } from "react-icons/ai"
import get_cart from '../../api/get_cart'
// eslint-disable-next-line
import add_cart from '../../api/add_cart'
import delete_cart from '../../api/delete_cart'

const Cart = () => {
  const navigate= useNavigate()
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
      const result= await get_cart()
      return setData(()=> result)
    })()
  }, [])

  return (
    <div style={{width: "100%", padding: 10}}>
      <div onClick={()=> navigate(-1)} style={{display: "flex", alignItems: 'center', gap: 10, cursor: "pointer", paddingBottom: 10, borderBottom: "1px solid #e7e7e7", width: "100%"}}>
        <IoIosArrowBack size={24} />
        <div style={{fontSize: 18, fontWeight: 600}}>Cart</div>
      </div>
      <div style={{margin: "12px 0"}}>
        <div style={{fontSize: 20}}>Cart</div>
        <div style={{margin: "8px 0"}}>You have {data?.length} item in your cart</div>
      </div>
      <div style={{width: "100%", margin: "24px 0"}}>
        {/*  */}
        {
          data?.map((item, key)=> <ComponentCart key={key} {...item} data={data} setData={setData} />)
        }
        <div style={{width: "100%", direction: "rtl", margin: "12px 0"}}>
          <div style={{width: 300, height: 50, borderRadius: 10, background: "#4DE1C1", color: "#fff", cursor: "pointer"}} className={"c-flex-center"}>
            Check out
          </div>
        </div>
      </div>
    </div>
  )
}

export const ComponentCart= (props)=> {
  // eslint-disable-next-line
  const [amount, setAmount]= useState(props.amount)
  const navigate= useNavigate()

  return (
    <div onClick={()=> navigate("/book/"+ props?.book_id)} style={{marginBottom: 12, width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e7e7e7", display: "flex", justifyContent: "space-between", alignItems: 'center', cursor: "pointer"}}>
      <div style={{display: "flex", gap: 16}}>
        <div style={{width: "150px"}}>
          <img style={{width: "100%", aspectRatio: 2 / 3, borderRadius: 10}} src={props?.cover_photo} alt="" />
        </div>
        <div style={{}}>
          <div style={{fontSize: 18, fontWeight: 600, marginBottom: 12}}>{props?.book_name}</div>
          <div>Dale Carnegie</div>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center", alignItems: 'center '}}>
        {/* <div onClick={async ()=> {

          const result= await add_cart(-1, props?.book_id)
          setAmount(prev=> parseInt(prev) - parseInt(1))
        }} style={{padding: 10, cursor: "pointer"}}>-</div> */}
        <div style={{padding: 10, fontWeight: 600}}>{amount}</div>
        {/* <div onClick={async ()=> {
          const result= await add_cart(1, props?.book_id)
          setAmount(prev=> parseInt(prev) + parseInt(1))
        }} style={{padding: 10, cursor: "pointer"}}>+</div> */}
      </div>
      <div onClick={async ()=> {
        // eslint-disable-next-line
        const result= await delete_cart(props?.book_id)
        props?.setData(props?.data?.filter(item=> item?.book_id !== props?.book_id))
      }} title={"Delete"} className={"c-flex-center"} style={{cursor: "pointer"}}>
        <AiFillDelete size={24} />
      </div>
    </div>
  )
}



export default Cart