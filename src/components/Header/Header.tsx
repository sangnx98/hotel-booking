import React, { useState } from "react";
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

import "./Header.css";
import { useSelector } from "react-redux";

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
  width: "10rem",
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

const getUserData = () => {
  const storedValues = localStorage.getItem("user");
  if (!storedValues)
    return {
      name: "",
    };
  return JSON.parse(storedValues);
};

type UserSubmitForm = {
  // email: string;
  // password: string;
  // name: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export default function Header() {
  const username = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();
  const [values, setValues] = useState<UserSubmitForm>(getUserData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const removeData = () => {
    localStorage.removeItem("user");
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
    >
      <Link to='/profile'>
        <MenuItem sx={{color: 'black'}}>Trang Cá Nhân</MenuItem>
      </Link>
      <MenuItem onClick={removeData}>Logout</MenuItem>
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
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Trang cá nhân</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Đăng xuất</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "white",
          position: "fixed",
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
            />
            <CalendarIconWrapper>
              <CalendarMonthIcon sx={{ width: "50%", cursor: "pointer" }} />
            </CalendarIconWrapper>
            <PreviewIconWrapper>
              <PageviewIcon sx={{ width: "50%", cursor: "pointer" }} />
            </PreviewIconWrapper>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link to="/host">
              <Typography
                variant="subtitle2"
                component="h2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                  mr: "2rem",
                }}
              >
                Host
              </Typography>
            </Link>
            {localStorage.getItem("user") ? (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
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
                  {values.name}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle sx={{ color: "black" }} />
                </IconButton>
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
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
