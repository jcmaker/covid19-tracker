import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <h1>covid19 tracker!</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem className="worldwide">WorldWide</MenuItem>
            <MenuItem className="worldwide">Option 2</MenuItem>
            <MenuItem className="worldwide">Option 3</MenuItem>
            <MenuItem className="worldwide">Option 4</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
