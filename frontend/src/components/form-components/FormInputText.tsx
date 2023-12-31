import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import { FormInputProps } from "./FormInputProps";

// const [selectdate, setselectedate] = useState<Dayjs | null>(
//   dayjs("2022-04-17T15:30")
// );

export const FormInputText = ({
  name,
  control,
  label,
  placeholder,
  type,
  viewmode,
}: FormInputProps) => {
  return (
    <>
      <InputLabel sx={{ color: "#181C32" }}>{label}</InputLabel>
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
            disabled={viewmode}
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

export const Autocomplete2 = ({ options, onChange }: any) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: any) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Category" variant="outlined" />
      )}
      onChange={onChange}
    />
  );
};

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
  viewmode,
}) => {
  const generateSingleOptions = () => {
    return (
      options &&
      options.map((option: any) => {
        return (
          <MenuItem key={option.id} value={Number(option?.id)}>
            {option.name}
          </MenuItem>
        );
      })
    );
  };
  return (
    <>
      <InputLabel sx={{ color: "black" }}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              fullWidth
              size="small"
              value={value}
              onChange={onChange}
              error={!!error}
              disabled={viewmode}
              sx={{
                background: "#F9F9F9 !important",
              }}
              inputProps={{
                style: {
                  borderRadius: "5px",
                },
              }}
            >
              {generateSingleOptions()}
            </Select>
          </>
        )}
      />
    </>
  );
};

export const FormInputMultipleDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateMultipleOptions = () => {
    return (
      options &&
      options.map((option: any) => {
        return (
          <MenuItem key={option.id} value={Number(option?.id)}>
            {option.name}
          </MenuItem>
        );
      })
    );
  };
  return (
    <>
      <InputLabel sx={{ color: "black" }}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              fullWidth
              size="small"
              value={value}
              multiple
              onChange={onChange}
              sx={{
                background: "#F9F9F9 !important",
              }}
              inputProps={{
                style: {
                  borderRadius: "5px",
                },
              }}
            >
              {generateMultipleOptions()}
            </Select>
          </>
        )}
      />
    </>
  );
};
