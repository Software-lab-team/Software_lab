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

const ResourceStepper = (props) => {
  const { hwsets, setHwsets } = props;

  const [project, setProject] = useState({ projectName: "" });

  const [hwset, setHwset] = useState({ name: "" });

  const [check, setCheck] = useState({
    checkIn: "",
    number: 1,
  });

  const [error, setError] = useState(false);

  const steps = [
    {
      label: "Select a Project",
      form: (
        <SelectProject
          project={project}
          setProject={setProject}
          error={error}
        />
      ),
    },
    {
      label: "Select a HWSet",
      form: (
        <SelectHWSet
          hwsets={hwsets}
          hwset={hwset}
          setHwset={setHwset}
          error={error}
        />
      ),
    },
    {
      label: "Check-in/Checkout Resources",
      form: (
        <CheckResources
          project={project}
          hwset={hwset}
          check={check}
          setCheck={setCheck}
          error={error}
        />
      ),
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    setError(false);
    if (activeStep === 0 && !project.projectName) {
      setError(true);
      return;
    } else if (activeStep === 1 && !hwset.name) {
      setError(true);
      return;
    } else if (activeStep === 2) {
      if (!check.checkIn || !check.number) {
        setError(true);
        return;
      } else {
        const res = await fetch(
          "http://127.0.0.1:5000/Projects?projectID=" +
            project.projectID +
            "&checkIn=" +
            check.checkIn +
            "&HWSet=" +
            hwset.name +
            "&number=" +
            check.number,
          { method: "PUT" }
        ).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.text();
        });
        if (typeof res === "string") {
          setError(res);
          return;
        }
        await fetch("http://127.0.0.1:5000/HWSets")
          .then((response) => response.json())
          .then((data) => setHwsets(data.result));
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setProject({ projectName: "" });

    setHwset({ name: "" });

    setCheck({
      checkIn: "",
      number: "",
    });

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
              {project.projectName} successfully checked{" "}
              {check.checkIn > 0 ? "in" : "out"} {check.number} resources from{" "}
              {hwset.name}
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
