import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { CONFIG } from "../config/config";
import { getRoomsById } from "../store/userSlice";
import { Booking } from "../types";
import { BookingStatus, RoomsStatus } from "../enum/index";

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

export default function HostDashBoard() {
  const userAuth = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const getBooking = () => {
    fetch(`${CONFIG.ApiBooking}?hostId=${userAuth.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setBookings);
  };

  const getRooms = () => {
    fetch(`${CONFIG.ApiRooms}?hostId=${userAuth.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setRooms);
  };

  const approveBooking = async (booking: Booking, index: number) => {
    const { id } = booking;
    const data = { ...booking, status: BookingStatus.Booked };
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
          body: JSON.stringify({ status: RoomsStatus.Renting }),
        });
      });
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
    const data = { ...booking, status: BookingStatus.Canceled };
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
          body: JSON.stringify({ status: RoomsStatus.Available }),
        });
      });
  };

  const completeBooking = async (booking: Booking, index: number) => {
    const { id } = booking;
    const data = { ...booking, status: BookingStatus.Completed };
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
          body: JSON.stringify({ status: RoomsStatus.Available }),
        });
      });
  };

  return (
    <Box maxWidth="xl">
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
                <StyledTableCell align="center">Tên chỗ ở</StyledTableCell>
                <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                <StyledTableCell align="center">Check in</StyledTableCell>
                <StyledTableCell align="center">Check out</StyledTableCell>
                <StyledTableCell align="center">Số lượng người</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Hành động</StyledTableCell>
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
                        bookings.status === BookingStatus.Processing
                          ? "blue"
                          : bookings.status === BookingStatus.Booked
                          ? "green"
                          : bookings.status === BookingStatus.Canceled
                          ? "red"
                          : "orange"
                      }`,
                    }}
                  >
                    {bookings.status === BookingStatus.Processing
                      ? "Đang chờ"
                      : bookings.status === BookingStatus.Booked
                      ? "Đặt thành công"
                      : bookings.status === BookingStatus.Canceled
                      ? "Đã hủy"
                      : "Hoàn thành"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bookings.status === BookingStatus.Processing ? (
                      <>
                        <CheckIcon
                          onClick={() => approveBooking(bookings, index)}
                        />
                        <ClearIcon
                          onClick={() => cancelBooking(bookings, index)}
                        />
                      </>
                    ) : bookings.status === BookingStatus.Booked ? (
                      <Button onClick={() => completeBooking(bookings, index)}>
                        Trả phòng
                      </Button>
                    ) : (
                      <>
                        {/* <Button disabled>Hủy phòng</Button>
                        <Button disabled>Trả phòng</Button> */}
                      </>
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
          <Box sx={{ display: "flex", flexDirection: "column", m: "0 auto" }}>
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
    </Box>
  );
}
