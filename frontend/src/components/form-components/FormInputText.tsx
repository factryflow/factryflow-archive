import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({
  name,
  control,
  label,
  placeholder,
  type,
}: FormInputProps) => {
  return (
    <>
      <InputLabel sx={{ color: "black" }}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            type={type}
            autoComplete="off"
            error={!!error}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            fullWidth
            variant="outlined"
            inputProps={{
              style: {
                borderRadius: "5px",
              },
            }}
          />
        )}
      />
    </>
  );
};
