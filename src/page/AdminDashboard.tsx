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
import AdminHeader from "../components/AdminHeader";
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

import { getAllRooms } from "../services/homestayService";

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

export default function AdminDashboard() {
  const [rooms, setRooms] = React.useState([]);
  const [value, setValue] = React.useState("1");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    getAllRooms()
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <AdminHeader />
      <Container maxWidth="xl">
        <Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="KHÁCH HÀNG" value="1" />
                  <Tab label="ĐƠN ĐẶT LỊCH" value="2" />
                  <Tab label="CHỖ Ở" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">KHÁCH HÀNG</TabPanel>
              <TabPanel value="2">ĐƠN ĐẶT LỊCH</TabPanel>
              <TabPanel value="3">
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
                          Trạng thái
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Hành động
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rooms.map((room: any) => (
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
                              color: `${
                                room.status === 0
                                  ? "orange"
                                  : room.status === 1
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {room.status === 0
                              ? "Đang chờ"
                              : room.status === 1
                              ? "Đã duyệt"
                              : "Từ chối"}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Box>
                              <Button
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                Thiết lập
                              </Button>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem onClick={handleClose}>
                                  Chỉnh sửa
                                </MenuItem>
                                <MenuItem onClick={handleClose}></MenuItem>
                              </Menu>
                            </Box>
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
