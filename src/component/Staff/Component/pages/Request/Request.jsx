import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";
// import { DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import request_book from "../../../../../api/staff/request_book";
import ApproveRequest from "./ApproveRequest/ApproveRequest";
import DeclineRequest from "./DeleteRequest/DeleteRequest";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import CloseIcon from "@mui/icons-material/Close";
import Tab from "@mui/material/Tab";
// import PropTypes from "prop-types";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Badge from "@mui/material/Badge";

const Request = () => {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const [value, setValue] = React.useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    (async () => {
      const result = await request_book();
      return setData(result);
    })();
  }, [change]);

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
      renderCell: (params) => {
        return (
          <div>
            {moment(params.row.time_book).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "state",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.state === 0 && (
              <div className={"c-flex-center"} style={{ color: "#2e89ff" }}>
                Pending <PendingIcon style={{ color: "#2e89ff" }} />
              </div>
            )}
            {params.row.state === 1 && (
              <div className={"c-flex-center"} style={{ color: "#2dc275" }}>
                Approved <CheckIcon style={{ color: "#2dc275" }} />
              </div>
            )}
            {params.row.state === 2 && (
              <div className={"c-flex-center"} style={{ color: "#f00" }}>
                Declined <CloseIcon style={{ color: "#f00" }} />
              </div>
            )}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ gap: 10, display: "flex", alignItems: "center" }}>
            <ApproveRequest id={params.row.id} setChange={setChange} />
            <DeclineRequest id={params.row.id} setChange={setChange} />
          </div>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <div style={{ marginBottom: 8 }}>Danh sách đặt sách</div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              style={{ width: 100 }}
              label={
                <Badge max={99} badgeContent={data?.length} color="primary">
                  <div style={{ fontSize: 16 }}>All</div>
                </Badge>
              }
              value="0"
            />
            <Tab
              label={
                <Badge
                  max={99}
                  badgeContent={
                    data?.filter((item) => parseInt(item?.state) === 0)?.length
                  }
                  color="primary"
                >
                  <div style={{ fontSize: 16 }}>Pending</div>
                </Badge>
              }
              value="1"
            />
            <Tab
              label={
                <Badge
                  max={99}
                  badgeContent={
                    data?.filter((item) => parseInt(item?.state) === 1)?.length
                  }
                  color="primary"
                >
                  <div style={{ fontSize: 16 }}>Approved</div>
                </Badge>
              }
              value="2"
            />
            <Tab
              label={
                <Badge
                  max={99}
                  badgeContent={
                    data?.filter((item) => parseInt(item?.state) === 2)?.length
                  }
                  color="primary"
                >
                  <div style={{ fontSize: 16 }}>Declined</div>
                </Badge>
              }
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="0">
          <div style={{ width: "100%", margin: "24px 0", height: 500 }}>
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              checkboxSelection
              pageSize={5}
              pagination={true}
              paginationMode="client"
            />
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div style={{ width: "100%", margin: "24px 0", height: 500 }}>
            <DataGrid
              rows={data?.filter((item) => parseInt(item?.state) === 0)}
              disableSelectionOnClick
              columns={columns}
              checkboxSelection
              pageSize={5}
              pagination={true}
              paginationMode="client"
            />
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div style={{ width: "100%", margin: "24px 0", height: 500 }}>
            <DataGrid
              rows={data?.filter((item) => parseInt(item?.state) === 1)}
              disableSelectionOnClick
              columns={columns}
              pageSize={5}
              pagination={true}
              paginationMode="client"
              checkboxSelection
            />
          </div>
        </TabPanel>
        <TabPanel value="3">
          <div style={{ width: "100%", margin: "24px 0", height: 500 }}>
            <DataGrid
              rows={data?.filter((item) => parseInt(item?.state) === 2)}
              disableSelectionOnClick
              columns={columns}
              pageSize={5}
              pagination={true}
              paginationMode="client"
              checkboxSelection
            />
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Request;
