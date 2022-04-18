import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slide,
} from "@mui/material";
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
import { useDispatch } from "react-redux";
import { TransitionProps } from "@mui/material/transitions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

import { CONFIG } from "../config/config";
import { getRoomsById, setSnackbar } from "../store/userSlice";
import { Room } from "../types";
import { RoomsStatus } from "../enum/index";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Homestay",
  "Studio",
  "Biệt Thự",
  "Duplex",
  "Căn hộ",
  "Khách sạn",
];

const provinces = [
  "Hà Nội",
  "Đà Nẵng",
  "Hồ Chí Minh",
  "Quảng Ninh",
  "Nha Trang",
  "Phú Quốc",
];

export default function HostHomeStay() {
  const userAuth = useSelector((state: any) => state.user);
  const snackBar = useSelector((state: any) => state.noticationBar);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<any[]>([]);
  const initialState: Room = {
    id: 0,
    hostId: 0,
    homeStayType: "",
    homeStayName: "",
    country: "",
    province: "",
    district: "",
    subDistrict: "",
    street: "",
    apartNumber: "",
    addressDetail: "",
    square: "",
    bedRooms: "",
    bathRooms: "",
    kitchens: "",
    bedNums: 0,
    price: "",
    guestNums: 0,
    status: 0,
    isChecked: 0,
    intro: "",
    bgUrl: "",
  };

  const [room, setRoom] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [roomData, setRoomData] = useState<Room>(initialState);
  const [searchRoomName, setSearchRoomName] = useState("")

  const handleSubmit = async (id: number) => {
    const res = await axios.put(`${CONFIG.ApiRooms}/${id}`, roomData);
    setRoomData(res.data);
    setOpen(false);
    getRooms();
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Cập nhật chỗ ở thành công",
      })
    );
  };

  const handleClickOpen = () => {
    setDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirm(false);
  };

  const handleSetValue = (key: any, value: any) => {
    setRoomData({ ...roomData, [key]: value });
  };

  const handleProvincesChange = (event: SelectChangeEvent) => {
    handleSetValue("province", event.target.value);
  };

  const handleHomeTypeChange = (event: SelectChangeEvent) => {
    handleSetValue("homeStayType", event.target.value);
  };

  useEffect(() => {
    if (
      !_.isEmpty(room) &&
      _.isEmpty(roomData.id) &&
      _.isEmpty(roomData.hostId) &&
      _.isEmpty(roomData.homeStayType) &&
      _.isEmpty(roomData.homeStayName) &&
      _.isEmpty(roomData.country) &&
      _.isEmpty(roomData.province) &&
      _.isEmpty(roomData.district) &&
      _.isEmpty(roomData.street) &&
      _.isEmpty(roomData.apartNumber) &&
      _.isEmpty(roomData.addressDetail) &&
      _.isEmpty(roomData.square) &&
      _.isEmpty(roomData.bedRooms) &&
      _.isEmpty(roomData.bathRooms) &&
      _.isEmpty(roomData.kitchens) &&
      _.isEmpty(roomData.bedNums) &&
      _.isEmpty(roomData.price) &&
      _.isEmpty(roomData.guestNums) &&
      _.isEmpty(roomData.status) &&
      _.isEmpty(roomData.isChecked) &&
      _.isEmpty(roomData.intro) &&
      _.isEmpty(roomData.bgUrl)
    ) {
      setRoomData({
        ...roomData,
        id: room.id,
        hostId: room.hostId,
        homeStayType: room.homeStayType,
        homeStayName: room.homeStayName,
        country: room.country,
        province: room.province,
        district: room.district,
        street: room.street,
        apartNumber: room.apartNumber,
        addressDetail: room.addressDetail,
        square: room.square,
        bedRooms: room.bedRooms,
        bathRooms: room.bathRooms,
        kitchens: room.kitchens,
        bedNums: room.bedNums,
        price: room.price,
        guestNums: room.guestNums,
        status: room.status,
        isChecked: room.isChecked,
        intro: room.intro,
        bgUrl: room.bgUrl,
      });
    }
  }, [room, roomData]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setRoomData(initialState);
  }, [open]);

  const getRooms = () => {
    fetch(`${CONFIG.ApiRooms}?hostId=${userAuth.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setRooms);
  };

  const getRoom = (room: Room, index: any) => {
    const { id } = room;

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRoom)
      .then((res) => setOpen(true))
      .catch((err) => console.log(err));
  };

  if (rooms) {
    dispatch(getRoomsById(rooms));
  }
  useEffect(() => {
    getRooms();
  }, []);

  const handleDelete = async (room: Room, index: any) => {
    const { id } = room;
    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getRooms();
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Xóa chỗ ở thành công !!",
        })
      );
    });
  };

  return (
    <>
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
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setSearchRoomName(e.target.value)}
          />
        </div>
      </Box>
      {rooms.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Ảnh</StyledTableCell>
                <StyledTableCell align="center">Tên chỗ ở</StyledTableCell>
                <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                <StyledTableCell align="center">Giá tiền</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Kiểm duyệt</StyledTableCell>
                <StyledTableCell align="center">Hành động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms
                .filter((value) => {
                  if (searchRoomName === "") {
                    return value;
                  } else if (
                    value.homeStayName
                      .toLowerCase()
                      .includes(searchRoomName.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((room: any, index: any) => (
                  <>
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
                      <StyledTableCell align="center">
                        <NumberFormat
                          value={room.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"₫"}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{
                          color: `${
                            room.status === RoomsStatus.Renting
                              ? "green"
                              : room.status === RoomsStatus.Processing
                              ? "blue"
                              : "red"
                          }`,
                        }}
                      >
                        {room.status === RoomsStatus.Renting
                          ? "Đang thuê"
                          : room.status === RoomsStatus.Processing
                          ? "Chờ duyệt"
                          : "Còn trống"}
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
                        {room.status === RoomsStatus.Available ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <EditIcon
                              sx={{ cursor: "pointer", color: "green" }}
                              onClick={() => getRoom(room, index)}
                            />
                            <DeleteIcon
                              sx={{ cursor: "pointer", color: "red" }}
                              // onClick={handleClickOpen}
                              onClick={() => handleDelete(room, index)}
                            />
                          </Box>
                        ) : (
                          <Button disabled>Hủy phòng</Button>
                        )}
                      </StyledTableCell>
                      <Dialog
                        open={deleteConfirm}
                        onClose={handleCloseDeleteConfirm}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{ textAlign: "center" }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Xác nhận xóa"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Chỗ ở sẽ bị xóa vĩnh viễn. Vui lòng xác nhận
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: "space-evenly" }}>
                          <Button onClick={handleCloseDeleteConfirm}>
                            Hủy bỏ
                          </Button>
                          <Button
                            onClick={() => handleDelete(room, index)}
                            autoFocus
                          >
                            Xác nhận
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </StyledTableRow>
                  </>
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
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ fontWeight: "500" }}
            >
              Hiện chưa có chỗ ở nào
            </Typography>
            <Link to="/newhomestay">
              <Button>Tạo mới ngay</Button>
            </Link>
          </Box>
        </Box>
      )}

      <Dialog
        className="sss"
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Chỉnh sửa chỗ ở
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => handleSubmit(room.id)}
            >
              Cập nhật
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: "0 auto",
          }}
        >
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <span>Loại căn hộ</span>
                <FormControl sx={{ width: "100%", mt: "1rem" }}>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={roomData.homeStayType}
                    onChange={() => handleHomeTypeChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span>Tên căn hộ</span>
                <TextField
                  variant="outlined"
                  placeholder="Tên chỗ nghỉ"
                  fullWidth
                  margin="normal"
                  value={roomData.homeStayName}
                  onChange={(e) =>
                    handleSetValue("homeStayName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <span>Tình/Thành phố</span>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    labelId="demo-multiple-provinces-label"
                    id="demo-multiple-provinces"
                    value={roomData.province}
                    onChange={handleProvincesChange}
                    MenuProps={MenuProps}
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <span>Quận/Huyện</span>
                <TextField
                  variant="outlined"
                  placeholder="Quận/Huyện"
                  fullWidth
                  margin="normal"
                  value={roomData.district}
                  onChange={(e) => handleSetValue("district", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <span>Đường</span>
                <TextField
                  variant="outlined"
                  placeholder="Đường"
                  fullWidth
                  margin="normal"
                  value={roomData.street}
                  onChange={(e) => handleSetValue("street", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <span>Số nhà</span>
                <TextField
                  variant="outlined"
                  placeholder="Số nhà"
                  fullWidth
                  margin="normal"
                  value={roomData.apartNumber}
                  onChange={(e) =>
                    handleSetValue("apartNumber", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4} md={2} sm={3}>
                <span>Diện tích</span>
                <TextField
                  variant="outlined"
                  placeholder="Diện tích"
                  fullWidth
                  margin="normal"
                  value={roomData.square}
                  onChange={(e) => handleSetValue("square", e.target.value)}
                />
              </Grid>
              <Grid item xs={4} md={2} sm={3}>
                <span>Phòng ngủ</span>
                <TextField
                  variant="outlined"
                  placeholder="Phòng ngủ"
                  fullWidth
                  margin="normal"
                  value={roomData.bedRooms}
                  onChange={(e) => handleSetValue("bedRooms", e.target.value)}
                />
              </Grid>
              <Grid item xs={4} md={2} sm={3}>
                <span>Số lượng giường</span>
                <TextField
                  variant="outlined"
                  placeholder="Số lượng giường ngủ"
                  fullWidth
                  margin="normal"
                  value={roomData.bedNums}
                  onChange={(e) => handleSetValue("bedNums", e.target.value)}
                />
              </Grid>
              <Grid item xs={4} md={2} sm={3}>
                <span>Số lượng phòng tắm</span>
                <TextField
                  variant="outlined"
                  placeholder="Số lượng phòng tắm"
                  fullWidth
                  margin="normal"
                  value={roomData.bathRooms}
                  onChange={(e) => handleSetValue("bathRooms", e.target.value)}
                />
              </Grid>
              <Grid item xs={4} md={2} sm={3}>
                <span>Số lượng nhà bếp</span>
                <TextField
                  variant="outlined"
                  placeholder="Số lượng nhà bếp"
                  fullWidth
                  margin="normal"
                  value={roomData.kitchens}
                  onChange={(e) => handleSetValue("kitchens", e.target.value)}
                />
              </Grid>
              <Grid item xs={4} md={2} sm={3}>
                <span>Số lượng khách tối đa</span>
                <TextField
                  variant="outlined"
                  placeholder="Số lượng khách tối đa"
                  fullWidth
                  margin="normal"
                  value={roomData.guestNums}
                  onChange={(e) => handleSetValue("guestNums", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <span>Giá phòng</span>
                <TextField
                  variant="outlined"
                  placeholder="Giá phòng"
                  fullWidth
                  margin="normal"
                  value={roomData.price}
                  onChange={(e) => handleSetValue("price", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <span>Tiêu đề</span>
                <TextField
                  variant="outlined"
                  placeholder="Tiêu đề"
                  fullWidth
                  margin="normal"
                  value={roomData.intro}
                  onChange={(e) => handleSetValue("intro", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <span>Ảnh đại diện</span>
                <TextField
                  variant="outlined"
                  placeholder="Ảnh đại diện phòng"
                  fullWidth
                  margin="normal"
                  value={roomData.bgUrl}
                  onChange={(e) => handleSetValue("bgUrl", e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
