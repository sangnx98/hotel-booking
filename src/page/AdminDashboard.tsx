import React from "react";
import {
  Button,
  Container,
  Menu,
  MenuItem,
  Table,
  TableContainer,
} from "@mui/material";
import { Box } from "@mui/system";
import AdminHeader from "../components/AdminHeader";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getAllRooms } from "../services/homestayService";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

import { Room } from "../types";
import { CONFIG } from "../config/config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminDashboard() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [value, setValue] = React.useState<string>("1");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    getAllRooms()
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  const setApprove = async (room: Room, index: number) => {
    const { id } = room;
    const data = { ...room, isChecked: 1 };

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        const newRooms = [...rooms];
        newRooms[index] = result;
        setRooms(newRooms);
      });
  };

  const setDennie = async (room: Room, index: number) => {
    const { id } = room;
    const data = { ...room, isChecked: 2 };

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        const newRooms = [...rooms];
        newRooms[index] = result;
        setRooms(newRooms);
      });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <AdminHeader />
      <Container maxWidth="xl">
        <Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="KHÁCH HÀNG" value="1" />
                  <Tab label="ĐƠN ĐẶT LỊCH" value="2" />
                  <Tab label="CHỖ Ở" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">KHÁCH HÀNG</TabPanel>
              <TabPanel value="2">ĐƠN ĐẶT LỊCH</TabPanel>
              <TabPanel value="3">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell align="center">Ảnh</StyledTableCell>
                        <StyledTableCell align="center">
                          Tên chỗ ở
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Địa chỉ
                        </StyledTableCell>
                        <StyledTableCell align="center">Duyệt</StyledTableCell>
                        <StyledTableCell align="center">
                          Trạng thái
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Hành động
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rooms.map((room: any, index: any) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center">
                            {room.id}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            sx={{ textAlign: "center" }}
                          >
                            <img src={room.bgUrl} alt="" width="250px" />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {room.homeStayName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {room.street}, {room.province}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{
                              color: `${
                                room.isChecked === 0
                                  ? "orange"
                                  : room.isChecked === 1
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {room.isChecked === 0
                              ? "Đang chờ"
                              : room.isChecked === 1
                              ? "Đã duyệt"
                              : "Từ chối"}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{
                              color: `${
                                room.status === true ? "green" : "red"
                              }`,
                            }}
                          >
                            {room.status === true ? "Đang thuê" : "Chưa thuê"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Box>
                              <CheckCircleIcon
                                onClick={() => setApprove(room, index)}
                              />
                              <CancelIcon
                                onClick={() => setDennie(room, index)}
                              />
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </>
  );
}
