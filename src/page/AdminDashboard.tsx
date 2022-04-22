import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getAllRooms } from "../services/homestayService";

import { Room } from "../types";
import AdminHeader from "../components/Admin/AdminHeader";
import UserRecordAdmin from "../components/Admin/UserRecordAdmin";
import BookingRecordAdmin from "../components/Admin/BookingRercordAdmin";
import HomestayRecord from "../components/Admin/HomestayRecord";

export default function AdminDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [value, setValue] = useState<string>("1");

  useEffect(() => {
    getAllRooms()
      .then((res) => res.json())
      .then(setRooms);
  }, []);

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
                <HomestayRecord />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </>
  );
}
