import React, { useState } from "react";
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
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
  
//   homeStayType: '',
//   homeStayName: '',
//   country: '',
//   province: '',
//   district: '',
//   subDistrict: '',
//   street: '',
//   address2: '',
//   roomSquare: '',
//   bedRoomNums: '',
//   bedNums: '',
//   bathRoomNums: '',
//   kitchenNums:'',
// })
const GetStepContent = (props: any):JSX.Element => {
  if(props.step === 0){
      return (
        <>
         <TextField
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            value={props.params.homeStayType}
            onChange={(e) => props.handleSetParams("homeStayType", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Tên chỗ nghỉ"
            fullWidth
            margin="normal"
            value={props.params.homeStayName}
            onChange={(e) => props.handleSetParams("homeStayName", e.target.value)}
          />
          
        </>
      );
    }else if(props.step === 1) {
      return (
        <>
          <TextField
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            value={props.params.country}
            onChange={(e) => props.handleSetParams("country", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            value={props.params.province}
            onChange={(e) => props.handleSetParams("province", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter Your Alternate Phone"
            fullWidth
            margin="normal"
            value={props.params.district}
            onChange={(e) => props.handleSetParams("district", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter Your Alternate Phone"
            fullWidth
            margin="normal"
            value={props.params.subDistrict}
            onChange={(e) => props.handleSetParams("subDistrict", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter Your Alternate Phone"
            fullWidth
            margin="normal"
            value={props.params.street}
            onChange={(e) => props.handleSetParams("street", e.target.value)}
          />
        </>
      );
    }else if(props.step === 2){
      return (
        <>
          <TextField
            variant="outlined"
            placeholder="Enter Your Address 1"
            fullWidth
            margin="normal"
            value={props.params.address1}
            onChange={(e) => props.handleSetParams("address1", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter Your Address 2"
            fullWidth
            margin="normal"
            value={props.params.address2}
            onChange={(e) => props.handleSetParams("address2", e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter Your Country Name"
            fullWidth
            margin="normal"
            value={props.params.country}
            onChange={(e) => props.handleSetParams("country", e.target.value)}
          />
        </>
      );
    }else if(props.step === 3){
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
  }


const NewHomeStay = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState<any[]>([]);
  const steps = getSteps();
  const theme = useTheme();
  const [homeType, setHomeType] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<{}>({
    homeStayType: '',
    homeStayName: '',
    country: '',
    province: '',
    district: '',
    subDistrict: '',
    street: '',
    address2: '',
    roomSquare: '',
    bedRoomNums: '',
    bedNums: '',
    bathRoomNums: '',
    kitchenNums:'',
  })

  const handleSetValue = (key: any, value: any)=>{
    setValues({...values, [key]: value})
  }

  const handleChange = (event: SelectChangeEvent<typeof homeType>) => {
    const {
      target: { value },
    } = event;
    setHomeType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
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
  console.log("ahihi", values)
  return (
      <>
      <Header/>
      <Container maxWidth='lg'>
            <Box sx={{marginTop: '8rem'}}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                const labelProps: any = {};
                const stepProps: any = {};
                // if (isStepOptional(index)) {
                //     labelProps.optional = (
                //     <Typography
                //         variant="caption"
                //         align="center"
                //         style={{ display: "block" }}
                //     >
                //         optional
                //     </Typography>
                //     );
                // }
                // if (isStepSkipped(index)) {
                //     stepProps.completed = false;
                // }
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
                  <GetStepContent step={activeStep} handleSetParams={handleSetValue} params={values}/>
                </form>
                <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    back
                </Button>
                {/* {isStepOptional(activeStep) && (
                    <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    >
                    skip
                    </Button>
                )} */}
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
