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
  Box,
  Autocomplete,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Tabs } from "@mantine/core";

import {
  FormInputDropdown,
  FormInputText,
} from "@/components/form-components/FormInputText";
import { useGetAllTemplateQuery } from "@/redux/api/templateApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetAllExceptionTypeQuery } from "@/redux/api/exceptionTypeApi";
import {
  useCreateExceptionMutation,
  useGetExceptionByIdQuery,
  useUpdateExceptionMutation,
} from "@/redux/api/exceptionApi";

const validationSchema = yup.object().shape({
  external_id: yup.string().required("external id is required").nullable(),
  start_datetime: yup.string().required("start time is required").nullable(),
  end_datetime: yup.string().required("end time is required").nullable(),
  notes: yup.string().required("notes is required").nullable(),
  weekly_shift_template_id: yup
    .string()
    .required("weekly shift is required")
    .nullable(),
  operational_exception_type_id: yup
    .string()
    .required("Operational Exception Type  is required")
    .nullable(),
});

const ExceptionForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isEdit = !!params.id;
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;
  const [activeTab] = useState<string | null>("resourcegroup");
  const [resourseGroupData, setResourceGroupData] = useState<any>();
  const paramsId = params && params.id;

  const [templateData, setTemplateData] = useState<any>();

  const { data: getExceptionIdData } = useGetExceptionByIdQuery(
    Number(paramsId),
    {
      skip: !paramsId,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: exceptiontypeData } = useGetAllExceptionTypeQuery();

  const [
    updateException,
    {
      isSuccess: updateExceptionIsSuccess,
      isLoading: updateExceptionIsLoading,
      error: updateExceptionError,
    },
  ] = useUpdateExceptionMutation();

  const [
    createException,
    {
      isSuccess: createExceptionIsSuccess,
      isLoading: createExceptionIsLoading,
      error: createExceptionError,
    },
  ] = useCreateExceptionMutation();

  const { data: getTemplateData, isLoading: templateIsLoading } =
    useGetAllTemplateQuery();

  const form = useForm({
    defaultValues: {
      external_id: "",
      start_datetime: "",
      end_datetime: "",
      notes: "",
      weekly_shift_template_id: "",
      operational_exception_type_id: "",
    },
    resolver: yupResolver(validationSchema),
  });

  // console.log(resourceSelector, "resourceSelector");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const onSubmit = (data: any) => {
    if (isEdit) {
      updateException({ id: params.id, data });
    } else {
      createException(data);
    }
  };

  useEffect(() => {
    if (createExceptionIsSuccess || updateExceptionIsSuccess) {
      toast.success(`Exception ${isEdit ? "Edit" : "Create"} successfully`) &&
        navigate("/exception");
    }
    if (createExceptionError || updateExceptionError) {
      toast.error(
        (createExceptionError || (updateExceptionError as unknown as any)).data
          .message as string
      );
    }
  }, [
    createExceptionIsSuccess,
    createExceptionError,
    updateExceptionIsSuccess,
    updateExceptionError,
  ]);

  useEffect(() => {
    if (!templateIsLoading && getTemplateData) {
      const transformedJob = getTemplateData.map((template: any) => ({
        label: template.name,
        value: template.id,
      }));
      setTemplateData(transformedJob);
    }
  }, [templateIsLoading, getTemplateData]);

  useEffect(() => {
    const operational_exception_type = ["operational_exception_type"];
    const weekly_shift_template = ["weekly_shift_template"];
    const start_datetime = ["start_datetime"];
    const end_datetime = ["end_datetime"];
    if (isEdit && getExceptionIdData) {
      Object.entries(getExceptionIdData ?? []).forEach(([name, value]: any) => {
        if (operational_exception_type.includes(name)) {
          form.setValue("operational_exception_type_id", value);
          return;
        }
        if (weekly_shift_template.includes(name)) {
          form.setValue("weekly_shift_template_id", value);
          return;
        }
        if (start_datetime.includes(name)) {
          form.setValue("start_datetime", value?.slice(0, 16));
          return;
        }
        if (end_datetime.includes(name)) {
          form.setValue("end_datetime", value?.slice(0, 16));
          return;
        }
        form.setValue(name, value);
      });
    }
  }, [getExceptionIdData]);

  // useEffect(() => {
  //   if (getResourceIdData && isEdit) {
  //     dispatch(setResource(getResourceIdData));
  //   }
  // }, [getResourceIdData]);

  return (
    <>
      {" "}
      <Layout>
        <Grid>
          <Card
            style={boxStyle}
            sx={{ padding: 2, height: "auto", borderRadius: "12px" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                {isEdit ? "Edit Exception" : "Create Exception"}
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
                      placeholder={"Enter external Id"}
                      type={"text"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"start_datetime"}
                      control={control}
                      label={"Start DateTime"}
                      type={"datetime-local"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"end_datetime"}
                      control={control}
                      label={"End DateTime"}
                      type={"datetime-local"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputText
                      name={"notes"}
                      control={control}
                      label={"Notes"}
                      placeholder={"Enter notes "}
                      type={"text"}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <InputLabel sx={{ color: "#181C32" }}>Template</InputLabel>
                    <Controller
                      name="weekly_shift_template_id"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <Autocomplete
                          options={templateData ?? []}
                          size="small"
                          getOptionLabel={(option: any) => option.label}
                          value={
                            templateData?.find(
                              (option: any) => option.value === Number(value)
                            ) || null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // error={!!errors.category}
                              // helperText={errors.category?.message}
                            />
                          )}
                          renderOption={(props, option: any) => (
                            <MenuItem
                              {...props}
                              key={Number(option.value)}
                              value={Number(option.value)}
                            >
                              {option.label}
                            </MenuItem>
                          )}
                          fullWidth
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormInputDropdown
                      name={"operational_exception_type_id"}
                      control={control}
                      label={"Type"}
                      options={exceptiontypeData ? exceptiontypeData : []}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        className="btn-cancel"
                        onClick={() => navigate("/exception")}
                      >
                        {isEdit ? "Back" : "Cancel"}
                      </Button>
                      <LoadingButton
                        size="large"
                        type="submit"
                        loading={
                          createExceptionIsLoading || updateExceptionIsLoading
                        }
                        color="primary"
                        variant="contained"
                      >
                        {isEdit ? "Edit" : "Create"}
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {/* {isEdit && (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              p: 1,
              m: 1,
            }}
          >
            {isEdit && (
              <Card style={boxStyle} sx={{ padding: 2, height: "auto" }}>
                <Tabs value={activeTab}>
                  <TabsList>
                    <Tabs.Tab value="resourcegroup">Resourcegroup</Tabs.Tab>
                  </TabsList>
                  <TabsPannel value="resourcegroup">
                    {activeTab === "resourcegroup" && (
                      <div style={{ height: "auto", width: "100%" }}>
                        <ResourceGroupDetails
                          data={resourseGroupData ?? []}
                          handleCreateResourceGroup={handleCreateResourceGroup}
                          handleEditResourceGroup={handleEditResourceGroup}
                          handleDeleteResourceGroup={handleDeleteResourceGroup}
                          isEdit={isEdit}
                        />
                      </div>
                    )}
                  </TabsPannel>
                </Tabs>
              </Card>
            )}
          </Box>
        )} */}
      </Layout>
    </>
  );
};

export default ExceptionForm;
