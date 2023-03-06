import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import signup from '../../api/signup'

const Signup = () => {
  const navigate= useNavigate()
  const [userName, setUserName]= useState("")
  const [email, setEmail]= useState("")
  const [phone, setPhone]= useState("")
  const [password, setPassword]= useState("")
  const [address, setAddress]= useState("")

  return (
    <div>
        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3}}>
            <div style={{width: "100%", maxWidth: 600}}>
                <div style={{fontSize: 64, fontWeight: 600, color: "#fff", textAlign: "center", margin: "24px 0"}}>Sign up</div>
                <div style={{fontSize: 24, fontWeight: 600, color: "#fff", textAlign: "center", margin: "24px 0"}}>Sign up and start managing your candidates!</div>
                <div style={{width: "100%"}} className={"c-flex-center"}>
                    <div>
                        <div style={{width: 350, height: 55, margin: "24px 0"}}>
                            <input value={userName} onChange={(e)=> setUserName(e.target.value)} className={"l-i"} placeholder={"Username"} type="text" style={{width: "100%", height: "100%", padding: 10, background: "#224957", borderRadius: 10, border: "none", outline: "none", color: "#fff", fontSize: 17}} />
                        </div>
                        <div style={{width: 350, height: 55, margin: "24px 0"}}>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} className={"l-i"} placeholder={"Email"} type="text" style={{width: "100%", height: "100%", padding: 10, background: "#224957", borderRadius: 10, border: "none", outline: "none", color: "#fff", fontSize: 17}} />
                        </div>
                        <div style={{width: 350, height: 55, margin: "24px 0"}}>
                            <input value={phone} onChange={(e)=> setPhone(e.target.value)} className={"l-i"} placeholder={"Phone number"} type="text" style={{width: "100%", height: "100%", padding: 10, background: "#224957", borderRadius: 10, border: "none", outline: "none", color: "#fff", fontSize: 17}} />
                        </div>
                        <div style={{width: 350, height: 55, margin: "24px 0"}}>
                            <input value={address} onChange={(e)=> setAddress(e.target.value)} className={"l-i"} placeholder={"Address"} type="text" style={{width: "100%", height: "100%", padding: 10, background: "#224957", borderRadius: 10, border: "none", outline: "none", color: "#fff", fontSize: 17}} />
                        </div>
                        <div style={{width: 350, height: 55, margin: "24px 0"}}>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} className={"l-i"} placeholder={"Password"} type="password" style={{width: "100%", height: "100%", padding: 10, background: "#224957", borderRadius: 10, border: "none", outline: "none", color: "#fff", fontSize: 17}} />
                        </div>
                        <div onClick={async ()=> {
                            const result= await signup(userName, email, phone, password, address)
                            if(email.includes("fpt")=== false ) {
                                return swal("Thông báo", "Email của bạn không đúng định dạng", "error")
                            }
                            if(result.signup=== true) {
                                swal("Thông báo ", "Bạn đã đăng ký thành công", "success")
                                .then(()=> navigate("/login"))
                            }
                            else if(result.exist=== true ){
                                swal("Thông báo", "Email đã tồn tại vui lòng thử lại với email khác", "error")
                            }
                            else {
                                swal("Thông báo", "Đăng ký thất bại", "error")
                            }
                        }} className={"h-e"} style={{margin: "24px 0", width: 350, cursor: "pointer",}}>
                            <img style={{width: "100%"}} src="https://res.cloudinary.com/cockbook/image/upload/v1676453029/single/Login_btn_1_pmysr5.png" alt="" />
                        </div>
                        <div style={{margin: "24px 0", textAlign: "center", fontSize: 17, fontWeight: 600, color: "#fff"}}>
                            Already have account ?
                        </div>
                        <div onClick={()=> navigate("/login")} style={{margin: "24px 0", textAlign: "center", fontSize: 17, fontWeight: 600, color: "#fff", cursor: "pointer"}}>
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* background */}
        <div className={"bg"} style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "url(https://res.cloudinary.com/cockbook/image/upload/v1676452569/single/Signup_xjqcfk.jpg)"}}>

        </div>
    </div>
  )
}

export default Signup