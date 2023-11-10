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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

import { FormInputText } from "@/components/form-components/FormInputText";

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
  const location = useLocation();
  const viewmode = location?.state?.viewmode || false;

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
    defaultValues: { name: "", details: [] },
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
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [isAddingDetails, setIsAddingDetails] = useState(false);

  const onSubmit = (data: any) => {
    if (isEdit) {
      updateTemplate({ id: params.id, data });
    } else {
      createTemplate(data);
      // Clear the form and reset the details for a new row after adding details
    }
  };

  const handleEditClick = (index: any) => {
    setEditedRowIndex(index);
  };

  const handleSaveClick = () => {
    setEditedRowIndex(fields.length as any);
    setIsAddingDetails(false);
  };

  const handleAdd = () => {
    append({
      day_of_week: "",
      start_time: "",
      end_time: "",
    });
    setEditedRowIndex(fields.length as any);
    setIsAddingDetails(true);
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
      setValue("details", [{ day_of_week: "", start_time: "", end_time: "" }]);
      setIsAddingDetails(false);
      toast.success(`Template ${isEdit ? "Edit" : "Create"} successfully`) &&
        navigate("/resource/template");
    }
    if (utIsSuccess) {
      setEditedRowIndex(null);
    }
    if (ctError || utError) {
      toast.error(
        (ctError || (utError as unknown as any))?.data?.message as string
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
                    viewmode={viewmode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ mb: 3 }}>Details</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Day of Week</TableCell>
                          <TableCell>Start Time</TableCell>
                          <TableCell>End Time</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fields.map((item, index) => (
                          <TableRow key={index}>
                            {/* ... (previous code) */}
                            <TableCell>
                              {editedRowIndex === index ||
                              (!item.day_of_week && isAddingDetails) ? (
                                <FormInputText
                                  name={`details[${index}].day_of_week`}
                                  control={control}
                                  label={""}
                                  placeholder={"Enter Date Of week"}
                                  type={"number"}
                                  viewmode={viewmode}
                                />
                              ) : (
                                <span>{item.day_of_week}</span>
                              )}
                            </TableCell>
                            {/* ... (previous code) */}
                            <TableCell>
                              {editedRowIndex === index ||
                              (!item.start_time && isAddingDetails) ? (
                                <FormInputText
                                  name={`details[${index}].start_time`}
                                  control={control}
                                  label={""}
                                  placeholder={"Start Time"}
                                  type={"time"}
                                  viewmode={viewmode}
                                />
                              ) : (
                                <span>{item.start_time}</span>
                              )}
                            </TableCell>
                            {/* ... (previous code) */}
                            <TableCell>
                              {editedRowIndex === index ||
                              (!item.end_time && isAddingDetails) ? (
                                <FormInputText
                                  name={`details[${index}].end_time`}
                                  control={control}
                                  label={""}
                                  placeholder={"end_time "}
                                  type={"time"}
                                  viewmode={viewmode}
                                />
                              ) : (
                                <span>{item.end_time}</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {editedRowIndex === index ? (
                                <Button
                                  variant="contained"
                                  type="button"
                                  onClick={() => handleSaveClick()}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={() => handleEditClick(index)}
                                >
                                  Edit
                                </Button>
                              )}{" "}
                              <Button
                                variant="contained"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <Button type="button" onClick={() => handleAdd()}>
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
                      onClick={() => navigate("/resource/template")}
                    >
                      {isEdit ? "Back" : "Cancel"}
                    </Button>
                    <LoadingButton
                      size="large"
                      type="submit"
                      loading={ctIsLoading || utIsLoading}
                      color="primary"
                      variant="contained"
                      disabled={viewmode}
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
