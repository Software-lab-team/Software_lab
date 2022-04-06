import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SelectProject from "../components/selectProject";
import SelectHWSet from "../components/selectHwset";
import CheckResources from "../components/checkResources";
import { useState } from "react";

const ResourceStepper = () => {
  const [project, setProject] = useState({
    value: "",
    error: false,
  });

  const [hwset, setHwset] = useState({
    value: "",
    error: false,
  });

  const [check, setCheck] = useState({
    direction: "",
    amount: "",
    error: false,
  });

  const steps = [
    {
      label: "Select a Project",
      form: <SelectProject project={project} setProject={setProject} />,
    },
    {
      label: "Select a HWSet",
      form: <SelectHWSet hwset={hwset} setHwset={setHwset} />,
    },
    {
      label: "Check-in/Checkout Resources",
      form: <CheckResources check={check} setCheck={setCheck} />,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setProject({ ...project, error: false });
    setHwset({ ...hwset, error: false });
    setCheck({ ...check, error: false });

    if (activeStep === 0 && !project.value) {
      setProject({ ...project, error: true });
    } else if (activeStep === 1 && !hwset.value) {
      setHwset({ ...hwset, error: true });
    } else if (activeStep === 2 && (!check.direction || !check.amount)) {
      if (!check.direction) {
        setCheck({ ...check, error: true });
      }
      if (!check.amount) {
        setCheck({ ...check, error: true });
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ margin: 5 }}>
      <Paper sx={{ padding: 5 }}>
        <Typography component="h1" variant="h4">
          Check-in/Checkout Resources
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Box>{step.form}</Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              Successfully checked {check.direction} resources
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default ResourceStepper;
