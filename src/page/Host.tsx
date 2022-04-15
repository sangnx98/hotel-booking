import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header/Header";
import {Container} from "@mui/material";
import { useDispatch } from "react-redux";
import _ from "lodash";
import axios from "axios";

import { getRoomsById } from "../store/userSlice";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import HostDashBoard from "../components/HostDashboard";
import HostHomeStay from "../components/HostHomstay";
import { useSelector } from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
  const userAuth = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<any[]>([]);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getRooms = () => {
    fetch(`http://localhost:4000/rooms?hostId=${userAuth.id}`, {
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

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ width: "100%", mt: "1rem" }}>
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
            <HostDashBoard/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HostHomeStay/>
          </TabPanel>
        </Box>
      </Container>
      <Contact />
      <Footer />
    </>
  );
}
