import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, InputLabel } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
import { CONFIG } from "../config/config";

import { RoomsStatus } from "../enum";

import "../App.css";

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
  const [personName, setPersonName] = useState<string[]>([]);
  const [rooms, setRooms] = useState<any>([]);
  const { address } = useParams();

  useEffect(() => {
    fetch(`${CONFIG.ApiRooms}?status=${RoomsStatus.Available}&isChecked=1`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRooms);
  }, []);


  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ marginTop: "1rem", color: "black !important" }}>
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
            
            sx={{ display: "flex", margin: "4rem 0 4rem 0" }}
          >
            Trước khi đặt phòng, hãy kiểm tra những địa điểm bị hạn chế du lịch
            trong thời gian này. Sức khỏe và sự an toàn của cộng đồng luôn được
            đặt hàng đầu. Vì vậy, vui lòng làm theo chỉ thị của chính phủ bởi
            điều đó thực sự cần thiết.
          </Typography>
          <Typography
            variant="h4"
            
            sx={{ display: "flex", fontWeight: "600", marginBottom: "1rem" }}
          >
            Các homestay tại {address}
          </Typography>
          <FormControl variant="standard" sx={{ mb: "2rem", minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Sắp xếp
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={handleChange}
              label="Age"
            >
              33
              <MenuItem>Tăng dần</MenuItem>
              <MenuItem>Giảm dần</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            {rooms
              .filter((item: any) => item.province === address)
              .map((item: any) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={2}
                  justifyContent="center"
                  key={item.id}
                >
                  <Link to={`/home/roomsDetail/${item.id}`}>
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
                        <CardContent sx={{ padding: "1rem" }}>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                          >
                            <b>
                              {item.homeStayType} - {item.bedRooms} phòng ngủ
                            </b>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.homeStayName} - {item.bedRooms} phòng ngủ
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            fontWeight="700"
                          >
                            <NumberFormat
                              value={item.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"₫"}
                            />
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
