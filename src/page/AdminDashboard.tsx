import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import AdminHeader from "../components/AdminHeader";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function AdminDashboard() {
  const [value, setValue] = React.useState("1");

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
              <TabPanel value="3">CHỖ Ở</TabPanel>
            </TabContext>
          </Box>
          
        </Box>
      </Container>
    </>
  );
}
