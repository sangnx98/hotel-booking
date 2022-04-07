import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

import "../App.css";

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

const choices = ["Giá tăng dần", "Giá giảm dần"];

function getStyles(
  choices: string,
  personName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      personName.indexOf(choices) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Rooms = {
  host_id: string;
  room_type: string;
  room_name: string;
  address: string;
  square: string;
  bed_rooms: string;
  bath_rooms: string;
  beds: number;
  price: string;
  guest_nums: number;
  status: boolean;
  is_checked: boolean;
};

export default function Rooms() {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const [rooms, setRooms] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    fetch('http://localhost:4000/rooms?status=false&isChecked=1', {
      headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then(setRooms);
  }, []);
  return (
    <>
      {/* <Header/> */}
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ marginTop: "5rem", color: "black !important" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <button className="rooms-button">Hủy phòng linh hoạt</button>
            <button className="rooms-button">Đặt phòng nhanh</button>
            <button className="rooms-button">Giá ưu đãi</button>
            <button className="rooms-button">Khu vực</button>
            <button className="rooms-button">Loại phòng</button>
            <button className="rooms-button">Giá chỗ ở</button>
            <button className="rooms-button">Thêm bộ lọc</button>
          </Box>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{ display: "flex", margin: "4rem 0 4rem 0" }}
          >
            Trước khi đặt phòng, hãy kiểm tra những địa điểm bị hạn chế du lịch
            trong thời gian này. Sức khỏe và sự an toàn của cộng đồng luôn được
            đặt hàng đầu. Vì vậy, vui lòng làm theo chỉ thị của chính phủ bởi
            điều đó thực sự cần thiết.
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            sx={{ display: "flex", fontWeight: "600", marginBottom: "1rem" }}
          >
            1698 homestay tại Hà Nội
          </Typography>
          <FormControl sx={{ m: 1, width: 300, mb: 5 }}>
            <Select
              multiple
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Sắp xếp</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {choices.map((choices) => (
                <MenuItem
                  key={choices}
                  value={choices}
                  style={getStyles(choices, personName, theme)}
                >
                  {choices}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            {rooms.map((item: any) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={2}
                justifyContent="center"
                key={item.id}
              >
                <Link to={`/home/rooms/${item.id}`}>
                  <Card
                    sx={{
                      maxWidth: 300,
                      borderRadius: "10px",
                      boxShadow: "none",
                      marginBottom: "2rem",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.bgUrl}
                        alt="green iguana"
                      />
                      <CardContent sx={{ padding: "1rem 0 1rem 0" }}>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {item.homeStayType} - {item.bedRooms} phòng ngủ
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.homeStayName} - {item.bedRooms} phòng ngủ
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          <b>{item.price}đ</b>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
