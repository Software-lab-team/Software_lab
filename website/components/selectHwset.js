import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectHWSet = (props) => {
  const { hwset, setHwset } = props;

  const handleChange = (event) => {
    setHwset({ ...hwset, value: event.target.value });
  };

  return (
    <div>
      <FormControl sx={{ margin: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">HWSet</InputLabel>
        <Select
          error={hwset.error}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={hwset.value}
          label="HWSet"
          onChange={handleChange}
        >
          <MenuItem value={"HWSet1"}>HWSet1</MenuItem>
          <MenuItem value={"HWSet2"}>HWSet2</MenuItem>
          <MenuItem value={"HWSet3"}>HWSet3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectHWSet;
