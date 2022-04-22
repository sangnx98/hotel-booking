import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header/Header";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CONFIG } from "../config/config";
import { setSnackbar } from "../store/snackBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Map from "../components/Map";

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

const names = [
  "Homestay",
  "Studio",
  "Biệt Thự",
  "Duplex",
  "Căn hộ",
  "Khách sạn",
];

const provinces = [
  "Hà Nội",
  "Đà Nẵng",
  "Hồ Chí Minh",
  "Quảng Ninh",
  "Nha Trang",
  "Phú Quốc",
];

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Thông tin cơ bản", "Địa chỉ", "Phòng", "Giới thiệu"];
}

const GetStepContent = (props: any): JSX.Element => {
  if (props.step === 0) {
    return (
      <>
        <Grid container>
          <Grid item sm={12} md={12} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">Loại căn hộ</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={props.handleSelectValue}
                input={<OutlinedInput label="Loại căn hộ" />}
                MenuProps={MenuProps}
                native
              >
                {names.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              variant="outlined"
              required
              placeholder="Tên chỗ nghỉ"
              label="Tên chỗ nghỉ"
              fullWidth
              margin="normal"
              value={props.params.homeStayName}
              onChange={(e) =>
                props.handleSetParams("homeStayName", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </>
    );
  } else if (props.step === 1) {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item sm={12} md={12} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-ptovinces-label">
                Tỉnh/Thành phố
              </InputLabel>
              <Select
                labelId="demo-multiple-provinces-label"
                id="demo-multiple-provinces"
                // value={props.params.homeType}
                onChange={props.handleSelecProvincestValue}
                input={<OutlinedInput label="Tỉnh/Thành phố" />}
                MenuProps={MenuProps}
                native
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              required
              variant="outlined"
              label="Quận/Huyện"
              placeholder="Quận/Huyện"
              fullWidth
              margin="normal"
              value={props.params.district}
              onChange={(e) =>
                props.handleSetParams("district", e.target.value)
              }
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Đường"
              placeholder="Đường"
              fullWidth
              margin="normal"
              value={props.params.street}
              onChange={(e) => props.handleSetParams("street", e.target.value)}
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Số nhà"
              placeholder="Số nhà"
              fullWidth
              margin="normal"
              value={props.params.apartNumber}
              onChange={(e) =>
                props.handleSetParams("apartNumber", e.target.value)
              }
            />
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
            <TextField
              variant="outlined"
              disabled
              placeholder="Kinh độ"
              fullWidth
              margin="normal"
              value={props.lat}
              onChange={(e) => props.handleSetParams("lat", e.target.value)}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
            <TextField
              disabled
              variant="outlined"
              placeholder="Vĩ độ"
              fullWidth
              margin="normal"
              value={props.lng}
              onChange={(e) => props.handleSetParams("lng", e.target.value)}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <Map lat={0} lng={0} />
          </Grid>
        </Grid>
      </>
    );
  } else if (props.step === 2) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Diện tích"
              placeholder="Diện tích"
              fullWidth
              margin="normal"
              value={props.params.square}
              onChange={(e) => props.handleSetParams("square", e.target.value)}
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Phòng ngủ"
              placeholder="Phòng ngủ"
              fullWidth
              margin="normal"
              value={props.params.bedRooms}
              onChange={(e) =>
                props.handleSetParams("bedRooms", e.target.value)
              }
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Số lượng giường ngủ"
              placeholder="Số lượng giường ngủ"
              fullWidth
              margin="normal"
              value={props.params.bedNums}
              onChange={(e) => props.handleSetParams("bedNums", e.target.value)}
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Số lượng phòng tắm"
              placeholder="Số lượng phòng tắm"
              fullWidth
              margin="normal"
              value={props.params.bathRooms}
              onChange={(e) =>
                props.handleSetParams("bathRooms", e.target.value)
              }
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Số lượng nhà bếp"
              placeholder="Số lượng nhà bếp"
              fullWidth
              margin="normal"
              value={props.params.kitchens}
              onChange={(e) =>
                props.handleSetParams("kitchens", e.target.value)
              }
            />
          </Grid>
          <Grid item sm={12} md={4} xs={12}>
            <TextField
              variant="outlined"
              label="Số lượng khách tối đa"
              placeholder="Số lượng khách tối đa"
              fullWidth
              margin="normal"
              value={props.params.guestNums}
              onChange={(e) =>
                props.handleSetParams("guestNums", e.target.value)
              }
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              variant="outlined"
              label="Giá phòng"
              placeholder="Giá phòng"
              fullWidth
              margin="normal"
              value={props.params.price}
              onChange={(e) => props.handleSetParams("price", e.target.value)}
            />
          </Grid>
        </Grid>
      </>
    );
  } else if (props.step === 3) {
    return (
      <>
        <TextField
          variant="outlined"
          label="Tiêu đề"
          placeholder="Tiêu đề"
          fullWidth
          margin="normal"
          value={props.params.intro}
          onChange={(e) => props.handleSetParams("intro", e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Ảnh đại diện phòng"
          placeholder="Ảnh đại diện phòng"
          fullWidth
          margin="normal"
          value={props.params.bgUrl}
          onChange={(e) => props.handleSetParams("bgUrl", e.target.value)}
        />
      </>
    );
  }
  return <></>;
};

const NewHomeStay = () => {
  const lat = useSelector((state: any) => state.center.lat);
  const lng = useSelector((state: any) => state.center.lng);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();
  const [values, setValues] = useState<{}>({
    hostId: "",
    homeStayType: "",
    homeStayName: "",
    province: "",
    district: "",
    street: "",
    apartNumber: "",
    square: "",
    bedRooms: "",
    bedNums: "",
    bathRooms: "",
    kitchens: "",
    price: "",
    guestNums: "",
    status: 2,
    isChecked: 0,
    intro: "",
    bgUrl: "",
    lat: "",
    lng: "",
  });
  useEffect(() => {
    const userValues = JSON.parse(localStorage.getItem("user") || "");
    setValues({ ...values, hostId: userValues.id });
  }, [activeStep]);

  useEffect(() => {
    if (lat && lng) {
      setValues({ ...values, lat, lng });
    }
  }, [lat, lng]);

  const handleSetValue = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const handleProvincesChange = (event: SelectChangeEvent) => {
    handleSetValue("province", event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    handleSetValue("homeStayType", event.target.value);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      fetch(CONFIG.ApiRooms, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarType: "success",
              snackbarMessage: "Tạo mới chỗ ở thành công !!",
            })
          );
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ marginTop: "2rem", width: "100%" }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" align="center">
                Đã thêm mới homestay
              </Typography>
              <Link to={"/host"}>
                <Button variant="contained" style={{ marginTop: "1rem" }}>
                  Trở về danh sách chỗ ở
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              <form>
                <GetStepContent
                  lat={lat}
                  lng={lng}
                  step={activeStep}
                  handleSetParams={handleSetValue}
                  params={values}
                  handleSelectValue={handleChange}
                  handleSelecProvincestValue={handleProvincesChange}
                />
              </form>
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Quay lại
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Kết thúc" : "Tiếp theo"}
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default NewHomeStay;
