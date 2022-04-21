import React, { useState, useEffect } from "react";
import { Container, Table, TableContainer } from "@mui/material";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getAllRooms } from "../services/homestayService";
import CancelIcon from "@mui/icons-material/Cancel";

import { Room } from "../types";
import { CONFIG } from "../config/config";
import UserRecordAdmin from "../components/UserRecordAdmin";
import BookingRecordAdmin from "../components/BookingRercordAdmin";
import { RoomApprovement, RoomsStatus } from "../enum";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../store/snackBarSlice";
import HomestayRecord from "../components/HomestayRecord";

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
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [value, setValue] = useState<string>("1");

  useEffect(() => {
    getAllRooms()
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  const setApprove = async (room: Room, index: number) => {
    const { id } = room;
    const data = { ...room, isChecked: RoomApprovement.Approved };

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        const newRooms = [...rooms];
        newRooms[index] = result;
        setRooms(newRooms);
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `Đã phê duyệt thành công`,
          })
        );
      });
  };

  const setDennie = async (room: Room, index: number) => {
    const { id } = room;
    const data = { ...room, isChecked: RoomApprovement.Dinied };

    fetch(`${CONFIG.ApiRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        const newRooms = [...rooms];
        newRooms[index] = result;
        setRooms(newRooms);
      })
      .then(() =>
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `Đã  từ chối xét duyệt chỗ ở`,
          })
        )
      )
      .catch((err) => {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: `Có gì đó không ổn :( ${err})`,
          })
        );
      });
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
              <TabPanel value="1">
                <UserRecordAdmin />
              </TabPanel>
              <TabPanel value="2">
                <BookingRecordAdmin />
              </TabPanel>
              <TabPanel value="3">
                <HomestayRecord/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </>
  );
}
