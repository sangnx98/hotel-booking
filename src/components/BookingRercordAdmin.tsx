import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { User } from "../types";
import { getAllBookings } from "../services/homestayService";
import { BookingStatus } from "../enum";

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

export default function BookingRecordAdmin() {
  const [bookings, setBookings] = useState<User[]>([]);

  useEffect(() => {
    getAllBookings()
      .then((res) => res.json())
      .then(setBookings);
  }, []);
  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((bookings: any, index: any) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{bookings.id}</StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
