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
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import {CONFIG} from '../config/config'

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
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Thông tin cơ bản",
    "Địa chỉ",
    "Phòng",
    "Tiện nghi",
    "Nội quy chỗ nghỉ",
    "Giới thiệu",
  ];
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const GetStepContent = (props: any): JSX.Element => {
  if (props.step === 0) {
    return (
      <>
        {/* <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={props.params.homeStayType}
              onChange={(e) => props.handleSetParams("homeStayType", e.target.value)}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        <TextField
          variant="outlined"
          placeholder="Loại chỗ nghỉ"
          fullWidth
          margin="normal"
          value={props.params.homeStayType}
          onChange={(e) =>
            props.handleSetParams("homeStayType", e.target.value)
          }
        />
        <TextField
          variant="outlined"
          placeholder="Tên chỗ nghỉ"
          fullWidth
          margin="normal"
          value={props.params.homeStayName}
          onChange={(e) =>
            props.handleSetParams("homeStayName", e.target.value)
          }
        />
      </>
    );
  } else if (props.step === 1) {
    return (
      <>
        <TextField
          variant="outlined"
          placeholder="Đất nước"
          fullWidth
          margin="normal"
          value={props.params.country}
          onChange={(e) => props.handleSetParams("country", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Tỉnh/Thành phố"
          fullWidth
          margin="normal"
          value={props.params.province}
          onChange={(e) => props.handleSetParams("province", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Quận/Huyện"
          fullWidth
          margin="normal"
          value={props.params.district}
          onChange={(e) => props.handleSetParams("district", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Phường/Xã"
          fullWidth
          margin="normal"
          value={props.params.subDistrict}
          onChange={(e) => props.handleSetParams("subDistrict", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Đường"
          fullWidth
          margin="normal"
          value={props.params.street}
          onChange={(e) => props.handleSetParams("street", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Số nhà"
          fullWidth
          margin="normal"
          value={props.params.apartNumber}
          onChange={(e) => props.handleSetParams("apartNumber", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Địa chỉ cụ thể"
          fullWidth
          margin="normal"
          value={props.params.addressDetail}
          onChange={(e) =>
            props.handleSetParams("addressDetail", e.target.value)
          }
        />
      </>
    );
  } else if (props.step === 2) {
    return (
      <>
        <TextField
          variant="outlined"
          placeholder="Diện tích"
          fullWidth
          margin="normal"
          value={props.params.square}
          onChange={(e) => props.handleSetParams("square", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Phòng ngủ"
          fullWidth
          margin="normal"
          value={props.params.bedRooms}
          onChange={(e) => props.handleSetParams("bedRooms", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Enter Your Country Name"
          fullWidth
          margin="normal"
          value={props.params.bedNums}
          onChange={(e) => props.handleSetParams("bedNums", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Enter Your Country Name"
          fullWidth
          margin="normal"
          value={props.params.bathRooms}
          onChange={(e) => props.handleSetParams("bathRooms", e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Enter Your Country Name"
          fullWidth
          margin="normal"
          value={props.params.kitchens}
          onChange={(e) => props.handleSetParams("kitchens", e.target.value)}
        />
      </>
    );
  } else if (props.step === 3) {
    return (
      <>
        <TextField
          variant="outlined"
          placeholder="Enter Your Card Number"
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          placeholder="Enter Your Card Month"
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          placeholder="Enter Your Card Year"
          fullWidth
          margin="normal"
        />
      </>
    );
  }
  return <></>;
};

const NewHomeStay = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState<any[]>([]);
  const steps = getSteps();
  const theme = useTheme();
  const [homeType, setHomeType] = useState<string[]>([]);
  const [values, setValues] = useState<{}>({
    hostId: "",
    homeStayType: "",
    homeStayName: "",
    country: "",
    province: "",
    district: "",
    subDistrict: "",
    street: "",
    apartNumber: "",
    addressDetail: "",
    square: "",
    bedRooms: "",
    bedNums: "",
    bathRooms: "",
    kitchens: "",
    price: "",
    guestNums: "",
    status: false,
    isChecked: false,
    intro: "",
    img: [
      {
        cover:
          "https://cdn.luxstay.com/rooms/66652/large/69ad8ebe05e3fdbda4f2.jpg",
        img1: "https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png",
        img2: "https://cdn.luxstay.com/users/329302/X2Ht56Nlx5GBsHV4oUmeE1w-.jpg",
        img3: "https://cdn.luxstay.com/users/329302/gZYx2s7zKDzsfvTSPeAuSy5H.jpg",
        img4: "https://cdn.luxstay.com/users/329302/W0VeOXy7lNzUTRkl4Zb0CbAr.jpg",
        img5: "https://cdn.luxstay.com/users/329302/8ERe5M4_IC3hVE9G1vJ0CttR.jpg",
        img6: "https://cdn.luxstay.com/users/329302/KSia-v90R1NxrICETct8VbcV.jpg",
        img7: "https://cdn.luxstay.com/users/329302/YF1ngXmAcWh14z4N0J6glyfM.jpg",
        img8: "https://cdn.luxstay.com/users/329302/GDMKfBwuqAZYgh5WXG-JSc_z.jpg",
      },
    ],
  });
  useEffect(() => {
    const userValues = JSON.parse(localStorage.getItem("user") || "");
    setValues({...values, hostId: userValues.id});
  }, []);

  const handleSetValue = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const handleChange = (event: SelectChangeEvent<typeof homeType>) => {
    const {
      target: { value },
    } = event;
    setHomeType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const isStepOptional = (step: any) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step: any) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
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
        .then((data) => {})
        //Then with the error genereted...
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
  const handleSubmit = () => {};
  console.log("ahihi", values);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ marginTop: "8rem" }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps: any = {};
              const stepProps: any = {};
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <Typography variant="h3" align="center">
              Thank You
            </Typography>
          ) : (
            <>
              <form>
                <GetStepContent
                  step={activeStep}
                  handleSetParams={handleSetValue}
                  params={values}
                />
              </form>
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default NewHomeStay;
