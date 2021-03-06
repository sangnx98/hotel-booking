import { useEffect, useState } from "react";
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
import NumberFormat from "react-number-format";

import { CONFIG } from "../../config/config";
import { setSnackbar, getRoomsById } from "../../store/userSlice";
import { Booking } from "../../types";
import { BookingStatus, RoomsStatus } from "../../enum/index";

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
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "???? x??c nh???n ?????t ch??? th??nh c??ng !!",
          })
        );
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
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "???? t??? ch???i ????n ?????t ch??? !!",
          })
        );
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
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "Tr??? ph??ng th??nh c??ng !!",
          })
        );
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
        component={'span'}
        sx={{ display: "flex", fontWeight: "500", fontSize: "25px" }}
      >
        Th???ng k?? t??nh h??nh kinh doanh
      </Typography>
      <List
        sx={{
          width: "auto",
          bgcolor: "background.paper",
          display: { md: "flex", sm: "flex" },
          flexDirection: "row",
          margin: "1rem 0 1rem 0",
        }}
      >
        <ListItem
        component="li"
          sx={{
            border: "1px solid #dae3dc",
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <AttachMoneyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="0??" secondary="T???ng doanh thu" />
        </ListItem>
        <ListItem
          sx={{
            border: "1px solid #dae3dc",
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="0" secondary="T???ng s??? booking" />
        </ListItem>
        <ListItem
          sx={{
            border: "1px solid #dae3dc",
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="0" secondary="L?????t ????nh gi??" />
        </ListItem>
        <ListItem sx={{ border: "1px solid #dae3dc" }}>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="0" secondary="??i???m ????nh gi??" />
        </ListItem>
      </List>
      <Typography
        component={'span'}
        sx={{
          display: "flex",
          fontWeight: "500",
          mb: "2rem",
          fontSize: "25px",
        }}
      >
        ?????t ch??? g???n ????y
      </Typography>
      {bookings.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">???nh</StyledTableCell>
                <StyledTableCell align="center">T??n ch??? ???</StyledTableCell>
                <StyledTableCell align="center">?????a ch???</StyledTableCell>
                <StyledTableCell align="center">Check in</StyledTableCell>
                <StyledTableCell align="center">Check out</StyledTableCell>
                <StyledTableCell align="center">Ng?????i ?????t</StyledTableCell>
                <StyledTableCell align="center">S??? l?????ng ng?????i</StyledTableCell>
                <StyledTableCell align="center">T???ng ti???n</StyledTableCell>
                <StyledTableCell align="center">Tr???ng th??i</StyledTableCell>
                <StyledTableCell align="center">H??nh ?????ng</StyledTableCell>
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
                    {bookings.userName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bookings.total_guests}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <NumberFormat
                      value={bookings.totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"???"}
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
                      ? "??ang ch???"
                      : bookings.status === BookingStatus.Booked
                      ? "?????t th??nh c??ng"
                      : bookings.status === BookingStatus.Canceled
                      ? "???? h???y"
                      : "Ho??n th??nh"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bookings.status === BookingStatus.Processing ? (
                      <>
                        <CheckIcon
                          sx={{ cursor: "pointer", mr: "1rem", color: "green" }}
                          onClick={() => approveBooking(bookings, index)}
                        />
                        <ClearIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={() => cancelBooking(bookings, index)}
                        />
                      </>
                    ) : bookings.status === BookingStatus.Booked ? (
                      <Button onClick={() => completeBooking(bookings, index)}>
                        Tr??? ph??ng
                      </Button>
                    ) : (
                      <></>
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
              component={'span'}
              sx={{ fontWeight: "500" }}
            >
              Ch??a c?? ng?????i ?????t ch???
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
