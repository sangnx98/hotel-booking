import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header/Header";
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useDispatch, useSelector } from "react-redux";

import { CONFIG } from "../config/config";
import { getRoomsById } from "../store/userSlice";
import { Booking, Room } from "../types";
import Footer from "../components/Footer";
import Contact from '../components/Contact';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Host() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<any[]>([]);
  const selector = useSelector((state: any) => state.user);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  console.log("booking", bookings);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const user = JSON.parse(localStorage.getItem("user") || "");

  const getBooking = () => {
    fetch(`${CONFIG.ApiBooking}?hostId=${user.id}&status=true`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setBookings);
  };

  const getRooms = () => {
    fetch(`http://localhost:4000/rooms?hostId=${user.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setRooms);
  };

  if (rooms) {
    dispatch(getRoomsById(rooms));
  }
  useEffect(() => {
    getRooms();
    getBooking();
  }, []);

  const cancelBooking = async (booking: Booking, index: number) => {
    const { id } = booking;
    console.log("room", booking);
    const data = { ...booking, status: false };
    const roomId = data.roomId!;

    fetch(`${CONFIG.ApiBooking}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        const newRooms = [...bookings];
        newRooms[index] = result;
        setBookings(newRooms);
      })
      .then(() => {
        fetch(`${CONFIG.ApiRooms}/${roomId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: false }),
        });
      });
  };

  const handleDelete = async (room: Room, index: any) => {
    const { id } = room;

    fetch(`http://localhost:4000/rooms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getRooms();
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", mt: "4rem" }}>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Bảng tin" {...a11yProps(0)} />
              <Tab label="Chỗ nghỉ" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          <Typography
              variant="h6"
              component="h2"
              sx={{ display: "flex", fontWeight: "500" }}
            >
              Thống kê tình hình kinh doanh
            </Typography>
            <List
              sx={{
                width: "auto",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "row",
                margin: "1rem 0 1rem 0",
              }}
            >
              <ListItem
                sx={{
                  borderTop: "1px solid #dae3dc",
                  borderBottom: "1px solid #dae3dc",
                  borderLeft: "1px solid #dae3dc",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0đ" secondary="Tổng doanh thu" />
              </ListItem>
              <ListItem
                sx={{
                  borderTop: "1px solid #dae3dc",
                  borderBottom: "1px solid #dae3dc",
                  borderLeft: "1px solid #dae3dc",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0" secondary="Tổng số booking" />
              </ListItem>
              <ListItem
                sx={{
                  borderTop: "1px solid #dae3dc",
                  borderBottom: "1px solid #dae3dc",
                  borderLeft: "1px solid #dae3dc",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0" secondary="Lượt đánh giá" />
              </ListItem>
              <ListItem sx={{ border: "1px solid #dae3dc" }}>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0" secondary="Điểm đánh giá" />
              </ListItem>
            </List>
            <Typography
              variant="h6"
              component="h2"
              sx={{ display: "flex", fontWeight: "500", mb: "2rem" }}
            >
              Đặt chỗ gần đây
            </Typography>
            {bookings.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">ID</StyledTableCell>
                      <StyledTableCell align="center">Ảnh</StyledTableCell>
                      <StyledTableCell align="center">
                        Tên chỗ ở
                      </StyledTableCell>
                      <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                      <StyledTableCell align="center">Check in</StyledTableCell>
                      <StyledTableCell align="center">
                        Check out
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Số lượng người
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Trạng thái
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Hành động
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {bookings.map((bookings: any, index: any) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {bookings.id}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ textAlign: "center" }}
                        >
                          <img src={bookings.roomImg} alt="" width="250px" />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.roomName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.roomApartNums}, {bookings.roomStreet},{" "}
                          {bookings.roomDistrict}, {bookings.roomProvince}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.dateStart}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.endDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.total_guests}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{
                            color: `${
                              bookings.status === true ? "green" : "red"
                            }`,
                          }}
                        >
                          {bookings.status === true ? "Đã đặt" : "Đã hủy"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.status ? (
                            <Button
                              onClick={() => cancelBooking(bookings, index)}
                            >
                              Hủy phòng
                            </Button>
                          ) : (
                            <Button disabled>Hủy phòng</Button>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "20rem",
                  border: "1px solid #ccbe99",
                  borderRadius: "5px",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", m: "0 auto" }}
                >
                  <SentimentVeryDissatisfiedIcon
                    sx={{ fontSize: "5rem", fontWeight: "300", m: "0 auto" }}
                  />
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ fontWeight: "500" }}
                  >
                    Chưa có người đặt chỗ
                  </Typography>
                </Box>
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Link to="/newhomestay">
              <Button variant="contained" color="success">
                Tạo phòng mới
              </Button>
            </Link>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                m: "2rem 0 2rem 0",
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-number"
                  label="Tìm kiếm theo mã phòng"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">ID</StyledTableCell>
                    <StyledTableCell align="center">Ảnh</StyledTableCell>
                    <StyledTableCell align="center">Tên chỗ ở</StyledTableCell>
                    <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                    <StyledTableCell align="center">Trạng thái</StyledTableCell>
                    <StyledTableCell align="center">Kiểm duyệt</StyledTableCell>
                    <StyledTableCell align="center">Hành động</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room: any, index: any) => (
                    <StyledTableRow key={room.hostId}>
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
                          color: `${room.status === true ? "green" : "red"}`,
                        }}
                      >
                        {room.status === true ? "Đang thuê" : "Chưa thuê"}
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
                      <StyledTableCell align="center">
                        {room.status === false ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <EditIcon />
                            <DeleteIcon
                              onClick={() => handleDelete(room, index)}
                            />
                          </Box>
                        ) : (
                          <Button disabled>Hủy phòng</Button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>
      </Container>
      <Contact/>
      <Footer/>
    </>
  );
}
