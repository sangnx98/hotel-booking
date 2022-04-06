import React, { useEffect, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header/Header";
import { Container, Menu, MenuItem } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";

import { CONFIG } from "../config/config";
import { getRoomsById } from "../store/userSlice";
import { Room } from "../types";
import { removeRoom } from "../services/homestayService";


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

export default function Host() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<any[]>([]);
  const selector = useSelector((state: any) => state.user);
  console.log("============", selector.user.id);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const user = JSON.parse(localStorage.getItem("user") || "");

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
  }, []);

  const handleCancelBooking = async (room: Room, index: any) => {
    const { id } = room;
    const data = { ...room, status: false };

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

  const handleDelete = async (room: Room, index: any) => {
    const { id } = room;

    fetch(`http://localhost:4000/rooms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      // .then((res) => res.json())
      .then((res) => {
        getRooms();
       
      });
  };

  const handleClickDelete = (id: number) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      removeRoom(id)
        .then((res) => {
          getRooms();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log("rooms", rooms);
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
              sx={{ display: "flex", fontWeight: "500", m: "1rem 0 1rem 0" }}
            >
              Đặt chỗ gần đây
            </Typography>
            <Box
              maxWidth="lg"
              sx={{
                height: "30rem",
                border: "1px solid #dae3dc",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Card sx={{ width: "100%", display: "flex", mb: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image="https://nghekhachsan.com/upload/NKS-Hong/homestay-la-gi-1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ width: "100%", display: "flex", mb: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image="https://vnn-imgs-a1.vgcloud.vn/image2.tienphong.vn/w645/Uploaded/2021/svjsplu/2021_09_01/198754915-2803.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>

              <Card sx={{ width: "100%", display: "flex", mb: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image="https://tapchidiaoc.com/wp-content/uploads/2022/01/homestay-la-gi-40-760x367-1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Stack spacing={2} alignItems="center">
                <Pagination count={10} color="secondary" />
              </Stack>
            </Box>
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
                m: "2rem 0 2rem 0"
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
                  {rooms.map((room: any, index:any) => (
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
                        {(room.status === false)? (
                            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                              <EditIcon/>
                              <DeleteIcon onClick={()=>handleDelete(room, index)}/>
                            </Box>
                        )
                        :
                        (
                          <Button onClick={()=>handleCancelBooking(room, index)}>Hủy phòng</Button>
                        )
                        }
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
