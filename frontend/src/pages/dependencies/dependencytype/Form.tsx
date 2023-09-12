import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import {
  TextField,
  Typography,
  Card,
  Grid,
  CardContent,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppSelector } from "../../../app/hooks";

import {
  useCreateDependencytypeMutation,
  useUpdateDependencyTypeMutation,
} from "../../../service/dependencytypeApi";
//   "id": 1,
//   "name": "dependency test",
//   "dependency_type": 1,
//   "dependency_status": 1,
//   "expected_closed": "2023-09-12T09:00:00Z",
//   "closed_date": "2023-09-01T08:00:00Z",
//   "notes": "test notes",
//   "jobs": 1,
//   "tasks": 1,
//   "is_active": true,
//   "is_deleted": false
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  description: yup.string().required("Description is required"),
});

const DependencyTypeForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const [
    createDependencytype,
    {
      data: dependencytypeData,
      isLoading: dependencytypeIsLoading,
      error: dependencytypeError,
    },
  ] = useCreateDependencytypeMutation();
  // const [
  //   createTasks,
  //   { data: taskData, isLoading: taskIsLoading, error: taskError },
  // ] = useCreateTasksMutation();

  // const [
  //   updateTasks,
  //   {
  //     data: updateTaskData,
  //     isLoading: updateTaskIsLoading,
  //     error: updateTaskError,
  //   },
  // ] = useUpdateTasksMutation();

  const [
    updateDependencyType,
    { isLoading: UdtIsLoading, data: UdtData, error: UdtError },
  ] = useUpdateDependencyTypeMutation();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dependenciestypeSelector = useAppSelector(
    (state) => state.dependencytype.dependenciestype
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    // console.log(data, "Data");
    if (isEdit) {
      updateDependencyType({ id: params.id, data });
    } else {
      createDependencytype(data);
    }
  };

  useEffect(() => {
    if (!dependencytypeIsLoading && dependencytypeData) {
      dependencytypeData.code >= 400
        ? toast.error(dependencytypeData.message)
        : toast.success(dependencytypeData.message) &&
          navigate("/dependencys/dependencytype");
    }
  }, [dependencytypeIsLoading, dependencytypeError, dependencytypeData]);

  useEffect(() => {
    if (!UdtIsLoading && UdtData) {
      UdtData.code >= 400
        ? toast.error(UdtData.message)
        : toast.success(UdtData.message) &&
          navigate("/dependencys/dependencytype");
    }
  }, [UdtIsLoading, UdtError, UdtData]);

  useEffect(() => {
    if (isEdit) {
      if (dependenciestypeSelector) {
        const dependencyType = dependenciestypeSelector.filter(
          (item: any) => item.id === Number(params.id)
        );
        // console.log(dependencyType, "dependencyType");
        Object.entries(dependencyType[0] ?? []).forEach(
          ([name, value]: any) => {
            form.setValue(name, value);
          }
        );
      }
    }
  }, [isEdit]);

  //   useEffect(() => {
  //     const excluded_fields = ["predecessors"];

  //   if (isEditData) {
  //     Object.entries(isEditData ?? []).forEach(([name, value]: any) => {
  //       console.log(name, "value", value);
  //       // console.log(name,">>>>",value,"<<<<<<");
  //       if (excluded_fields.includes(name)) {
  //         setSelectedJobIds(value);
  //         return;
  //       }
  //       form.setValue(name, value);
  //     });
  //   }
  // }, [isEditData]);

  return (
    <>
      {" "}
      <Layout>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "20px auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                {isEdit ? "Edit Dependency Type" : "Create Dependency Type"}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Name"
                          variant="outlined"
                          margin="normal"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Description"
                          variant="outlined"
                          margin="normal"
                          multiline
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {isEdit ? "Submit" : "Save Change"}
                    </Button> */}

                    <LoadingButton
                      size="small"
                      type="submit"
                      loading={dependencytypeIsLoading || UdtIsLoading}
                      color="primary"
                      variant="contained"
                      sx={{ marginBottom: 5 }}
                      fullWidth
                    >
                      {isEdit ? "Save Changes" : "Submit"}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Layout>
    </>
  );
};

export default DependencyTypeForm;
