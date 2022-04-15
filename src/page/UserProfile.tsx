import React, { useState, useEffect } from "react";
import { Button, Container, Table, TableContainer } from "@mui/material";
import { Box } from "@mui/system";
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
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

import { Booking } from "../types";
import { CONFIG } from "../config/config";
import Header from "../components/Header/Header";
import ProfileAccount from "../components/ProfileAccount";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserProfile() {
  const userAuth = useSelector((state: any) => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [value, setValue] = useState<string>("1");

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = () => {
    fetch(`${CONFIG.ApiBooking}?userId=${userAuth.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setBookings);
  };

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

  const completedBooking = async (booking: Booking, index: number) => {
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
          body: JSON.stringify({ status: false }),
        });
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <Box sx={{ mt: "1rem" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="danh sách đặt phòng" value="1" />
                <Tab label="cài đặt tài khoản" value="2" />
              </TabList>
            </Box>
            <TabPanel value="2">
              <ProfileAccount />
            </TabPanel>

            <TabPanel value="1">
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
                        Tổng số ngày
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Tổng giá tiền
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
                          {bookings.roomApartNums}, {bookings.roomStreet},
                          {bookings.roomDistrict}, {bookings.roomProvince}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.dateStart}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.endDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.total_guests} người
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {bookings.duration} ngày
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <NumberFormat
                            value={bookings.totalPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"₫"}
                          />
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
                          {bookings.status === BookingStatus.Booked ? (
                            <>
                              <Button
                                onClick={() => cancelBooking(bookings, index)}
                              >
                                Hủy phòng
                              </Button>
                              <Button
                                onClick={() =>
                                  completedBooking(bookings, index)
                                }
                              >
                                Trả phòng
                              </Button>
                            </>
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
          </TabContext>
        </Box>
      </Box>
    </>
  );
}
