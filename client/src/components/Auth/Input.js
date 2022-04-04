import React from "react";
import { Grid, TextField, IconButton, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import Visibilityoff from "@material-ui/icons/VisibilityOff";
const Input = ({ name, label, autoFocus, Half, handleChange, type }) => {
  return (
    <Grid item xs={12} sm={Half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth={true}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endadornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      {type === "password" ? <Visibility /> : <Visibilityoff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
