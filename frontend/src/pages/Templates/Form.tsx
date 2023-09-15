import React, { useEffect } from "react";
import Layout from "../Layout";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} from "@/service/templateApi";
import { toast } from "react-toastify";
import { useAppSelector } from "@/app/hooks";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
});

const TemplateForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  //all template data store reducer
  const templateSelector = useAppSelector((state) => state.template.templates);

  //api call craete template
  const [
    createTemplate,
    {
      data: createTemplateData,
      isLoading: templateIsLoading,
      error: templateError,
    },
  ] = useCreateTemplateMutation();

  //api call update template
  const [
    updateTemplate,
    {
      data: upTemplateData,
      isLoading: upTemplateIsLoading,
      error: upTemplateError,
    },
  ] = useUpdateTemplateMutation();

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

  const onSubmit = (data: any) => {
    console.log(data, "Data");
    if (isEdit) {
      updateTemplate({ id: params.id, data });
    } else {
      createTemplate(data);
    }
  };

  useEffect(() => {
    if (!templateIsLoading && createTemplateData) {
      createTemplateData.code >= 400
        ? toast.error(createTemplateData.message)
        : toast.success(createTemplateData.message) && navigate("/template");
    }
  }, [templateIsLoading, templateError, createTemplateData]);

  useEffect(() => {
    if (!upTemplateIsLoading && upTemplateData) {
      upTemplateData.code >= 400
        ? toast.error(upTemplateData.message)
        : toast.success(upTemplateData.message) && navigate("/template");
    }
  }, [upTemplateIsLoading, upTemplateError, upTemplateData]);

  useEffect(() => {
    if (isEdit) {
      if (templateSelector) {
        const getTemplateEdit = templateSelector.filter(
          (item: any) => item.id === Number(params.id)
        );

        Object.entries(getTemplateEdit[0] ?? []).forEach(
          ([name, value]: any) => {
            form.setValue(name, value);
          }
        );
      }
    }
  }, [isEdit]);

  return (
    <Layout>
      <Grid>
        <Card
          style={{ maxWidth: 450, padding: "20px 5px", margin: "20px auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              {isEdit ? "Edit Template" : "Create Template"}
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
                  <LoadingButton
                    size="small"
                    type="submit"
                    color="primary"
                    loading={templateIsLoading || upTemplateIsLoading}
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
  );
};

export default TemplateForm;
