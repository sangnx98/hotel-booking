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
            <button className="rooms-button">H???y ph??ng linh ho???t</button>
            <button className="rooms-button">?????t ph??ng nhanh</button>
            <button className="rooms-button">Gi?? ??u ????i</button>
            <button className="rooms-button">Khu v???c</button>
            <button className="rooms-button">Lo???i ph??ng</button>
            <button className="rooms-button">Gi?? ch??? ???</button>
            <button className="rooms-button">Th??m b??? l???c</button>
          </Box>
          <Typography
            variant="subtitle1"
            
            sx={{ display: "flex", margin: "4rem 0 4rem 0" }}
          >
            Tr?????c khi ?????t ph??ng, h??y ki???m tra nh???ng ?????a ??i???m b??? h???n ch??? du l???ch
            trong th???i gian n??y. S???c kh???e v?? s??? an to??n c???a c???ng ?????ng lu??n ???????c
            ?????t h??ng ?????u. V?? v???y, vui l??ng l??m theo ch??? th??? c???a ch??nh ph??? b???i
            ??i???u ???? th???c s??? c???n thi???t.
          </Typography>
          <Typography
            variant="h4"
            
            sx={{ display: "flex", fontWeight: "600", marginBottom: "1rem" }}
          >
            C??c homestay t???i {address}
          </Typography>
          <FormControl variant="standard" sx={{ mb: "2rem", minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              S???p x???p
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={handleChange}
              label="Age"
            >
              33
              <MenuItem>T??ng d???n</MenuItem>
              <MenuItem>Gi???m d???n</MenuItem>
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
                              {item.homeStayType} - {item.bedRooms} ph??ng ng???
                            </b>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.homeStayName} - {item.bedRooms} ph??ng ng???
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
                              suffix={"???"}
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
