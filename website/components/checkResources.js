import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

const CheckResources = (props) => {
  const { check, setCheck } = props;

  return (
    <FormControl error={check.error && !check.direction}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) =>
          setCheck({ ...check, direction: event.target.value })
        }
      >
        <FormControlLabel value="in" control={<Radio />} label="Check-in" />
        <FormControlLabel value="out" control={<Radio />} label="Checkout" />
      </RadioGroup>
      <FormHelperText>
        {check.error && !check.direction ? "Please select an option" : ""}
      </FormHelperText>
      <TextField
        onChange={(event) => setCheck({ ...check, amount: event.target.value })}
        error={check.error && !check.amount}
        margin="normal"
        fullWidth
        id="amount"
        label={"Amount"}
        name="amount"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
      />
    </FormControl>
  );
};

export default CheckResources;
