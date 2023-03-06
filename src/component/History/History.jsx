import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import get_history from '../../api/history'
import {IoIosArrowBack } from "react-icons/io"
import { ComponentCart } from '../Cart/Cart'

const History = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const result = await get_history()
            return setData(() => result)
        })()
    }, [])
    return (
        <div style={{ width: "100%", padding: 10 }}>
            <div onClick={() => navigate(-1)} style={{ display: "flex", alignItems: 'center', gap: 10, cursor: "pointer", paddingBottom: 10, borderBottom: "1px solid #e7e7e7", width: "100%" }}>
                <IoIosArrowBack size={24} />
                <div style={{ fontSize: 18, fontWeight: 600 }}>History</div>
            </div>
            <div style={{ margin: "12px 0" }}>
                <div style={{ fontSize: 20 }}>History</div>
                <div style={{ margin: "8px 0" }}>You have {data?.length} item in your history</div>
            </div>
            <div style={{ width: "100%", margin: "24px 0" }}>
                {/*  */}
                {
                    data?.map((item, key) => <ComponentCart key={key} {...item} data={data} setData={setData} />)
                }
                {/* <div style={{ width: "100%", direction: "rtl", margin: "12px 0" }}>
                    <div style={{ width: 300, height: 50, borderRadius: 10, background: "#4DE1C1", color: "#fff", cursor: "pointer" }} className={"c-flex-center"}>
                        Check out
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default History