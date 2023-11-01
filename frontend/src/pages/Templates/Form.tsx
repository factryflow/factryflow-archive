import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useCreateTemplateMutation,
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from "@/redux/api/templateApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import TempleDetails from "@/components/data-tables/template/TemplateDetails";
import { useGetAllTemplateDetailsQuery } from "@/redux/api/templateDetailsApi";
import { setTemplateDetails } from "@/redux/features/templateDetailsSlice";
import { FormInputText } from "@/components/form-components/FormInputText";
import { Flex } from "@mantine/core";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  details: yup.array().of(
    yup.object().shape({
      day_of_week: yup.string().required(),
      start_time: yup.string().required(),
      end_time: yup.string().required(),
    })
  ),
});

const TemplateForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isEdit = !!params.id;
  const paramsId = params && params.id;

  //all template data store reducer
  // const templateSelector = useAppSelector((state) => state.template.templates);
  const [templateId, setTemplateId] = useState<number>(0);

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };
  //api call craete template
  const [
    createTemplate,
    { isSuccess: ctIsSuccess, error: ctError, isLoading: ctIsLoading },
  ] = useCreateTemplateMutation();

  //api call update template
  const [
    updateTemplate,
    { isSuccess: utIsSuccess, error: utError, isLoading: utIsLoading },
  ] = useUpdateTemplateMutation();

  //api call templateDetails

  // const {
  //   data: templateDetailsData,
  //   isLoading: templateDetailisLoading,
  //   error: tempDetailsError,
  //   isFetching: templateDetailsIsFetching,
  //   isError: templateDetailsisError,
  // } = useGetAllTemplateDetailsQuery();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const {
    data: getTemplateIdData,
    refetch: refetchTemplateById,
    isLoading: gtIsLoading,
  } = useGetTemplateByIdQuery(Number(paramsId), {
    skip: !paramsId,
    refetchOnMountOrArgChange: true,
  });

  const onSubmit = (data: any) => {
    console.log(data, "Data");
    if (isEdit) {
      updateTemplate({ id: params.id, data });
    } else {
      createTemplate(data);
    }
  };

  useEffect(() => {
    if (isEdit && getTemplateIdData) {
      Object.entries(getTemplateIdData ?? []).forEach(([name, value]: any) => {
        form.setValue(name, value);
      });
    }
  }, [isEdit, getTemplateIdData]);

  useEffect(() => {
    if (ctIsSuccess || utIsSuccess) {
      toast.success(`Template ${isEdit ? "Edit" : "Create"} successfully`) &&
        navigate("/template");
    }
    if (ctError || utError) {
      toast.error(
        (ctError || (utError as unknown as any)).data.message as string
      );
    }
  }, [ctIsSuccess, ctError, utIsSuccess, utError]);

  return (
    <Layout>
      <Box>
        <Card
          style={boxStyle}
          sx={{ padding: 2, height: "auto", borderRadius: "12px" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              {isEdit ? "Edit Template" : "Create Template "}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <FormInputText
                    name={"name"}
                    control={control}
                    label={"Name"}
                    placeholder={"Enter Name"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ mb: 3 }}>Details</Typography>
                  {fields.map((item, index) => (
                    <Box
                      component={"div"}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Grid item xs={3}>
                        <FormInputText
                          name={`details[${index}].day_of_week`}
                          control={control}
                          label={"Day Of Week"}
                          placeholder={"Enter Name"}
                          type={"number"}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormInputText
                          name={`details[${index}].start_time`}
                          control={control}
                          label={"Start time "}
                          placeholder={"Start Time"}
                          type={"time"}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormInputText
                          name={`details[${index}].end_time`}
                          control={control}
                          label={"End Time"}
                          placeholder={"end_time "}
                          type={"time"}
                        />
                      </Grid>
                      <Button type="button" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      append({ day_of_week: "", start_time: "", end_time: "" })
                    }
                  >
                    Add Details
                  </Button>
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
                      onClick={() => navigate("/template")}
                    >
                      {isEdit ? "Back" : "Cancel"}
                    </Button>
                    <LoadingButton
                      size="large"
                      type="submit"
                      loading={ctIsLoading || utIsLoading}
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
      </Box>
    </Layout>
  );
};

export default TemplateForm;
