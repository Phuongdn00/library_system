import { HistoryOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import {BsFillCartFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import Search from './Search/Search'
import UserProfile from './UserProfile'


const Header = (props) => {

  const navigate= useNavigate()
  const {auth, user}= useContext(AppContext)

  return (
    <>
        <div style={{width: "100%", height: 60, position: "fixed", top: 0, left: 0, zIndex: 9, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff"}}>
            {/* Logo */}
            <div onClick={()=> navigate("/") } style={{width: 40, aspectRatio: 1 / 1, cursor: "pointer"}} className={"c-flex-center"}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" style={{width: "100%", height: "100%", objectFit: "contain"}} alt="" />
            </div>
            {/* right side */}
            <div style={{display: "flex", alignItems: "center", gap: 24}}>
                <Search {...props} />
                {
                    auth=== false && 
                    <div className={"h-e-1"} onClick={()=> navigate("/login?redirect_url="+ window.location.origin)} style={{fontSize: 17, cursor: "pointer"}}>Log in</div>
                }
                {
                    auth=== true && <>
                        <UserProfile {...user} />
                        <div onClick={()=> navigate("/history")} className={"c-flex-center"} style={{cursor: "pointer"}}>
                            <HistoryOutlined />
                        </div>
                        <div onClick={()=> navigate("/cart")} className={"c-flex-center"} style={{cursor: "pointer"}}>
                            <BsFillCartFill size={20} />
                        </div>
                    </>
                }
            </div>
        </div>
        <div style={{height: 60}}>
            
        </div>
    </>
  )
}

export default Header

