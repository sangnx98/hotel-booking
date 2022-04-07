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
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import _ from "lodash";

import { Booking, Room } from "../types";
import { CONFIG } from "../config/config";
import Header from "../components/Header/Header";
import axios from "axios";

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

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [value, setValue] = React.useState<string>("1");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [rooms, setRooms] = React.useState<Room[]>([]);
  const [open, setOpen] = React.useState(false);

  const [userData, setUserData] = React.useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });
  console.log("booking", bookings);

  const user = JSON.parse(localStorage.getItem("user") || "");
  React.useEffect(() => {
    if (
      !_.isEmpty(user) &&
      _.isEmpty(userData.id) &&
      _.isEmpty(userData.name) &&
      _.isEmpty(userData.email) &&
      _.isEmpty(userData.password)
    ) {
      setUserData({
        ...userData,
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
      });
    }
  }, [user, userData]);

  React.useEffect(() => {
    getBooking();
    // getRooms();
  }, []);

  const getBooking = () => {
    fetch(`${CONFIG.ApiBooking}?userId=${user.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setBookings);
  };
  const handleSetValue = (key: any, value: any) => {
    setUserData({ ...userData, [key]: value });
  };
  const handleNameChange = (event: any) => {
    handleSetValue("name", event.target.value);
  };

  const handleEmailChange = (event: any) => {
    handleSetValue("email", event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    handleSetValue("password", event.target.value);
  };

  const handleSubmit = async (id: number) => {
    const res = await axios.put(`${CONFIG.ApiUser}/${id}`, userData);
    console.log("res", res.data);
    setUserData(res.data);
    setOpen(false);
    localStorage.setItem("user", JSON.stringify(userData));
  };

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    console.log("handleClickOpen");
    setOpen(true);
  };

  const handleCloseDialog = () => {
    console.log("handleCloseDialog");
    setUserData({
      id: 0,
      email: "",
      name: "",
      password: "",
    });
    setOpen(false);
  };
  console.log("user", userData, user);
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ mt: "4rem" }}>
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
                <Box sx={{ width: "100%", position: "relative" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "25rem",
                      bgcolor: "#b0e8cb",
                    }}
                  >
                    <img
                      src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/background-banner-dep-doc-dao.jpg"
                      alt=""
                      width="100%"
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "80%",
                      height: "auto",

                      position: "absolute",
                      top: "22rem",
                      left: "8.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid white",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "70%",
                        padding: "1rem",
                        bgcolor: "aliceblue",
                      }}
                    >
                      <Box
                        component="form"
                        noValidate
                        onSubmit={() => handleSubmit(user.id)}
                        sx={{ mt: 3 }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" component="span">
                              Họ và tên
                            </Typography>
                            <TextField
                              autoComplete="given-name"
                              name="firstName"
                              required
                              fullWidth
                              id="firstName"
                              value={user.name}
                              autoFocus
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" component="span">
                              Địa chỉ email
                            </Typography>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              value={user.email}
                              name="email"
                              autoComplete="email"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" component="span">
                              Mật khẩu
                            </Typography>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              value={user.password}
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end"></Grid>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "25%",
                        border: "1px solid white",
                        textAlign: "center",
                        borderRadius: "10px",
                        bgcolor: "aliceblue",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ height: "70%" }}>
                        <AccountCircleIcon
                          sx={{
                            fontSize: "15rem",
                            right: "1.6rem",
                          }}
                        />
                      </Box>
                      <Box sx={{ width: "100%", textAlign: "center" }}>
                        <Typography variant="h5" component="h5">
                          {user.name}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                        <Button
                          onClick={handleClickOpen}
                          variant="contained"
                          sx={{ width: "50%", textAlign: "center" }}
                        >
                          Chỉnh sửa
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "1rem",
                    }}
                  >
                    <Box
                      component="form"
                      noValidate
                      onSubmit={() => handleSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name"
                            name="firstName"
                            value={userData?.name}
                            onChange={handleNameChange}
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            value={userData?.email}
                            onChange={handleEmailChange}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            value={userData?.password}
                            onChange={handlePasswordChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
                    <Button
                      type="submit"
                      onClick={() => handleSubmit(user.id)}
                      autoFocus
                    >
                      Cập nhật
                    </Button>
                  </DialogActions>
                </Dialog>
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
                        <StyledTableCell align="center">
                          Địa chỉ
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Check in
                        </StyledTableCell>
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
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </>
  );
}
