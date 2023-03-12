import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";
// import { DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import request_book from "../../../../../api/staff/request_book";
import ApproveRequest from "./ApproveRequest/ApproveRequest";
import DeclineRequest from "./DeleteRequest/DeleteRequest";
// import { Link } from 'react-router-dom';
const Request = () => {
    const [data, setData] = useState([]);

    // const handleDelete = (id) => {
    //     console.log(id)
    //     // setData(data.filter((item) => item.id !== id));
    // };
    const [change, setChange]= useState(false)

    useEffect(() => {
        (async () => {
            const result = await request_book()
            return setData(result)
        })()
    }, [change])

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        {
            field: "user_name",
            headerName: "User name",
            width: 200,
        },
        {
            field: "book_name",
            headerName: "Book",
            width: 200,
        },
        {
            field: "time_book",
            headerName: "Time booking",
            width: 200,
            renderCell: (params)=> {
                return (
                    <div>{moment(params.row.time_book).format("DD/MM/YYYY HH:mm:ss")}</div>
                )
            }
        },
        {
            field: "state",
            headerName: "Status",
            width: 200,
            renderCell: (params)=> {
                return (
                    <div>
                        {params.row.state=== 0 && "pending"}
                        {params.row.state=== 1 && "approve"}
                        {params.row.state=== 2 && "decline"}
                    </div>
                )
            }
        },

        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div style={{gap: 10, display: "flex", alignItems: "center"}}>
                        <ApproveRequest id={params.row.id} setChange={setChange} />
                        <DeclineRequest id={params.row.id} setChange={setChange} />
                    </div>
                );
            },
        },
    ];
    return (
        <div className="userList">
            <div style={{marginBottom: 8}}>Danh sách đặt sách</div>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />

        </div>
    )
}

export default Request