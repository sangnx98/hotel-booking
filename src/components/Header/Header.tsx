import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Link } from "react-router-dom";
import _ from "lodash";

import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../../store/userSlice";
import { Room } from "../../types";
import { CONFIG } from "../../config/config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100% ",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "25rem",
  },
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const CalendarIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 0),
  pointerEvents: "fill",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  width: "5rem",
  borderLeft: "1px solid #b9c9be",
  borderRight: "1px solid #b9c9be",
}));

const PreviewIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 0),
  display: "flex",
  height: "100%",
  pointerEvents: "fill",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  width: "5rem",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "black",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const userAuth = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [roomSeacrhing, setRoomSeacrhing] = useState([]);
  const [rooms, setRooms] = useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    fetch(`${CONFIG.ApiRooms}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setRooms);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const removeData = () => {
    localStorage.removeItem("user");
    dispatch(logoutRequest(userAuth));
    navigate("/login");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (event: any) => {
    const searchWord = event.target.value;
    const newFilter = rooms.filter((room: any) => {
      return room.homeStayName.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setRoomSeacrhing([]);
    } else {
      setRoomSeacrhing(newFilter);
    }
  };

  const onGoToRoomPage = (room: any) => {
    // window.location.href = `/home/rooms/${room.id}` as string
    setRoomSeacrhing([]);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      color="black"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ padding: "1rem" }}
    >
      <Link to="/profile">
        <div style={{ color: "black", margin: "0.8rem" }}>Trang Cá Nhân</div>
      </Link>
      <div
        onClick={removeData}
        style={{ color: "black", margin: "0.8rem", cursor: "pointer" }}
      >
        Đăng xuất
      </div>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/profile">
        <div style={{ color: "black", margin: "0.8rem" }}>Trang Cá Nhân</div>
      </Link>
      <Link to="/host">
        <div style={{ color: "black", margin: "0.8rem" }}>Host</div>
      </Link>
      <div
        onClick={removeData}
        style={{ color: "black", margin: "0.8rem", cursor: "pointer" }}
      >
        Đăng xuất
      </div>
    </Menu>
  );
  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        position: "sticky",
        zIndex: "1000",
        top: "0",
      }}
      position="static"
    >
      <Toolbar>
        <Link to="/">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
          >
            LUXSTAY
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "none" },
              color: "black",
              mr: "1rem",
            }}
          >
            LUX
          </Typography>
        </Link>
        <Search
          sx={{
            border: "1px solid #b9c9be",
            boxShadow: "2px -1px 5px 1px rgba(0,0,0,0.26)",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearch}
          />
          <CalendarIconWrapper className="">
            <CalendarMonthIcon sx={{ width: "50%", cursor: "pointer" }} />
          </CalendarIconWrapper>
          <PreviewIconWrapper>
            <PageviewIcon sx={{ width: "50%", cursor: "pointer" }} />
          </PreviewIconWrapper>
        </Search>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link to="/host">
            <Typography
              variant="subtitle2"
              component="span"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                marginRight: "2rem",
              }}
            >
              Host
            </Typography>
          </Link>
          {localStorage.getItem("user") ? (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                  marginRight: "1rem",
                }}
              >
                {userAuth.name}
              </Typography>
              <Box
                onClick={handleProfileMenuOpen}
                sx={{ cursor: "pointer", width: "3rem", borderRadius: "10px" }}
              >
                <img
                  src={userAuth.avatar}
                  alt=""
                  width="100%"
                  style={{ borderRadius: "50%" }}
                />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Link to="/login">
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  Login
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none", color: "black" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {roomSeacrhing.length !== 0 && (
        <Box
          sx={{
            width: "23rem",
            height: "auto",
            mt: "4.5rem",
            position: "absolute",
            left: "7%",
            zIndex: "100",
            bgcolor: "white",
            padding: "1rem",
            borderRadius: "5px",
            boxShadow: "-1px 3px 16px -4px #000000",
          }}
        >
          {roomSeacrhing.map((room: any, key: any) => {
            return (
              <Link
                to={`/home/roomsDetail/${room.id}`}
                onClick={() => onGoToRoomPage(room)}
              >
                <Box
                  sx={{
                    color: "black",
                    mb: "1rem",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#e6e6e6",
                      opacity: [0.8, 0.7, 0.9],
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={room.bgUrl} alt="" width="100px" />
                    <Box sx={{ ml: "1rem" }}>
                      <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
                        {room.homeStayName}
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        {room.district}, {room.province}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Box>
      )}
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
}
