import * as yup from "yup";
import { useForm } from "react-hook-form";

import { Typography, Card, Grid, CardContent } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  useCreateDependencyMutation,
  useUpdateDependencyMutation,
} from "@/redux/api/dependencyApi";

import {
  FormInputDropdown,
  FormInputText,
} from "@/components/form-components/FormInputText";
import { useGetAllDependencyTypeQuery } from "@/redux/api/dependencytypeApi";
import { setDependenciestype } from "@/redux/features/dependencytypeSlice";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  external_id: yup.string().required("External id is required").nullable(),
  dependency_type_id: yup
    .string()
    .required("Dependency type is required")
    .nullable(),
  dependency_status_id: yup
    .string()
    .required("Dependency Status is required")
    .nullable(),
  expected_close_datetime: yup
    .string()
    .required("Expected Closed is required")
    .nullable(),
  actual_close_datetime: yup
    .string()
    .required("Closed Date is required")
    .nullable(),
  notes: yup.string().required("Note is required").nullable(),
});

const DependencyForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isEdit = !!params.id;
  const dependencySelector = useAppSelector(
    (state: any) => state.dependency.dependencies
  );
  const dependenciesStatusSelector = useAppSelector(
    (state) => state.dependency.dependencyStatus
  );
  const dependencytypeselector = useAppSelector(
    (state) => state.dependencytype.dependenciestype
  );

  const [
    createDependency,
    {
      data: dependencyData,
      isLoading: dependencyIsLoading,
      error: dependencyError,
    },
  ] = useCreateDependencyMutation();

  //call api dependency type

  const {
    data: dtData,
    isLoading: dtisloading,
    error: dterror,
  } = useGetAllDependencyTypeQuery();

  // const {
  //   data: getjobData,
  //   isLoading: jobisLoading,
  //   // refetch,
  // } = useGetAllJobsQuery(undefined, {});

  // const {
  //   data: getTaskData,
  //   isLoading: taskIsLoading,
  //   error,
  // } = useGetAllTasksQuery(undefined);

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
    updateDependency,
    { data: updateDataDependency, isLoading: UddIsLoading, error: UddError },
  ] = useUpdateDependencyMutation();

  const Defaultvalues = {
    name: "",
    external_id: "",
    dependency_type_id: "",
    dependency_status_id: "",
    expected_close_datetime: "",
    actual_close_datetime: "",
    notes: "",
  };

  const form = useForm({
    defaultValues: Defaultvalues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    console.log(data, "Data");
    if (isEdit) {
      updateDependency({ id: params.id, data: data });
    } else {
      createDependency(data);
    }
  };

  useEffect(() => {
    if (!dependencyIsLoading && dependencyData) {
      toast.success("/Dependency Create Successfully");
      navigate("/dependency");
    }
  }, [dependencyIsLoading, dependencyData]);

  useEffect(() => {
    if (!UddIsLoading && updateDataDependency) {
      toast.success("Update dependency Successfully");
      navigate("/dependency");
    }
  }, [UddIsLoading, updateDataDependency]);

  useEffect(() => {
    const excluded_fields_dependency_type = ["dependency_type"];
    const excluded_fields_dependency_status = ["dependency_status"];
    const excludede_field_expected_close_datetime = ["expected_close_datetime"];
    const excludede_actual_close_datetime = ["actual_close_datetime"];
    if (isEdit) {
      if (dependencySelector) {
        const getDependency = dependencySelector.filter(
          (item: any) => item.id === Number(params.id)
        );
        console.log(getDependency[0], "getDependency");
        Object.entries(getDependency[0] ?? []).forEach(([name, value]: any) => {
          if (excludede_field_expected_close_datetime.includes(name)) {
            form.setValue(name, value?.slice(0, 16));
            return;
          }
          if (excludede_actual_close_datetime.includes(name)) {
            form.setValue(name, value?.slice(0, 16));
            return;
          }
          if (excluded_fields_dependency_type.includes(name)) {
            form.setValue("dependency_type_id", value);
            return;
          }
          if (excluded_fields_dependency_status.includes(name)) {
            form.setValue("dependency_status_id", value);
            return;
          }
          form.setValue(name, value);
        });
      }
    }
  }, [isEdit, params.id]);

  useEffect(() => {
    if (!dtisloading && dtData) {
      dispatch(setDependenciestype(dtData));
    }
  }, [dtisloading, dtData]);

  return (
    <>
      {" "}
      <Layout>
        <Grid>
          <Card
            style={{ width: "100%", padding: "20px 5px", margin: "30px auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Dependency Details
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <FormInputText
                      name={"external_id"}
                      control={control}
                      label={"External Id"}
                      placeholder={"Enter Job Name"}
                      type={"text"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"name"}
                      control={control}
                      label={"Name"}
                      placeholder={"Enter  Name"}
                      type={"text"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"notes"}
                      control={control}
                      label={"Notes"}
                      placeholder={"write notes"}
                      type={"text"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"expected_close_datetime"}
                      control={control}
                      label={"Due Date"}
                      placeholder={"expected_close_datetime"}
                      type={"datetime-local"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputText
                      name={"actual_close_datetime"}
                      control={control}
                      label={"Due Date"}
                      placeholder={""}
                      type={"datetime-local"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputDropdown
                      name={"dependency_status_id"}
                      control={control}
                      label={"Status"}
                      options={dependenciesStatusSelector ?? []}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputDropdown
                      name={"dependency_type_id"}
                      control={control}
                      label={"Type"}
                      options={dependencytypeselector ?? []}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LoadingButton
                      size="small"
                      type="submit"
                      // loading={dependencyIsLoading || UddIsLoading}
                      color="primary"
                      variant="contained"
                      sx={{ marginBottom: 5 }}
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

export default DependencyForm;
