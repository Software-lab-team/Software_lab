import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

/*
Code for specifying the operation (check-in or checkout) and amount in the resource stepper component.
project is the selected Project, hwset is the selected HWSet, and setCheck updates whether a 
check-in or checkout is being attempted and the number of resources being checked in/out
*/

const CheckResources = (props) => {
  const { project, hwset, check, setCheck, error } = props;

  return (
    <Box>
      <RadioGroup
        row
        value={check.checkIn}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) =>
          setCheck({ ...check, checkIn: event.target.value })
        }
      >
        <FormControlLabel value={1} control={<Radio />} label="Check-in" />
        <FormControlLabel value={-1} control={<Radio />} label="Checkout" />
      </RadioGroup>
      {
        // If a radio button has been selected, display the number of resources that can be checked in/out
        check.checkIn ? (
          check.checkIn > 0 ? (
            <FormHelperText>
              You can check-in {project.checkedOutSets[hwset.name] || 0}{" "}
              resources from {hwset.name}
            </FormHelperText>
          ) : (
            <FormHelperText>
              You can checkout {hwset.availability} resources from {hwset.name}
            </FormHelperText>
          )
        ) : (
          <FormHelperText error={error}>Please choose an option</FormHelperText>
        )
      }
      <TextField
        onChange={(event) => {
          event.target.value = event.target.value < 0 ? 1 : event.target.value;
          setCheck({ ...check, number: event.target.value });
        }}
        value={check.number}
        error={error && !check.number}
        margin="normal"
        id="amount"
        label="Amount"
        name="amount"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
      />
      {
        // Display an error message if the API returns an error (i.e. more resources are being checked in/out than are available)
        typeof error === "string" && (
          <FormHelperText error={true}>{error}</FormHelperText>
        )
      }
    </Box>
  );
};

export default CheckResources;
