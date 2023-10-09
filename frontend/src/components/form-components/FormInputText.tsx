import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";
import { FormInputProps } from "./FormInputProps";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

// const [selectdate, setselectedate] = useState<Dayjs | null>(
//   dayjs("2022-04-17T15:30")
// );

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

// export const FormInputDate = ({ name, control }: any) => {
//   <DemoContainer components={["DateTimePicker"]}>
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange }, fieldState: { error }, formState }) => {
//         return (
//           <DateTimePicker
//             label="Controlled picker"
//             value={selectdate}
//             onChange={onChange} // Update the form value
//           />
//         );
//       }}
//     />
//     ;
//   </DemoContainer>;
// };
