import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectHWSet = (props) => {
  const { hwsets, hwset, setHwset, error } = props;

  const handleChange = (event) => {
    setHwset(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ margin: 1, minWidth: 120 }}
        error={error && !hwset.name}
      >
        <InputLabel id="demo-simple-select-helper-label">HWSet</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="HWSet"
          onChange={handleChange}
          defaultValue=""
        >
          {hwsets.map((hwset, i) => {
            return (
              <MenuItem key={hwset.name} value={hwset}>
                {hwset.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectHWSet;
