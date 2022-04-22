import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getAllBookings } from "../services/homestayService";
import { BookingStatus } from "../enum";
import SuccessBooking from "./SuccessBooking";
import ProcessingBooking from "./ProcessingBooking";
import BookedBooking from "./BookedBooking";
import CancelBooking from "./CanceledBooking";
import Pagination from "@mui/material/Pagination";

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
  // hide last border
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

export default function BookingRecordAdmin() {
  const [bookings, setBookings] = useState<any>([]);
  const [value, setValue] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);
  const indexOfLastUser = currentPage * postPerPage;
  const indexOfFirstUser = indexOfLastUser - postPerPage;
  const currentBookings = bookings.slice(indexOfFirstUser, indexOfLastUser);
  const pageNumbers = Math.ceil(bookings.length / postPerPage);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllBookings()
      .then((res) => res.json())
      .then(setBookings);
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Hoàn hành" {...a11yProps(1)} />
          <Tab label="Đang chờ" {...a11yProps(2)} />
          <Tab label="Đang thuê" {...a11yProps(3)} />
          <Tab label="Đã hủy" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Ảnh</StyledTableCell>
                <StyledTableCell align="center">Tên chỗ ở</StyledTableCell>
                <StyledTableCell align="center">Khách hàng</StyledTableCell>
                <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                <StyledTableCell align="center">Check in</StyledTableCell>
                <StyledTableCell align="center">Check out</StyledTableCell>
                <StyledTableCell align="center">Số lượng người</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBookings.map((bookings: any, index: any) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {bookings.id}
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    <img
                      src={bookings.roomImg}
                      alt=""
                      width="250px"
                      height="250px"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bookings.roomName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bookings.userName}
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
          <Stack spacing={2}>
            <Pagination
              count={pageNumbers}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "0.3rem",
                borderTop: "1px solid #ebedeb",
              }}
              color="primary"
              onChange={(e: any, page: number) => setCurrentPage(page)}
            />
          </Stack>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SuccessBooking />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProcessingBooking />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BookedBooking />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CancelBooking />
      </TabPanel>
    </Box>
  );
}
