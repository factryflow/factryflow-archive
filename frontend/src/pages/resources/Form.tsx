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
  useCreateresourcesMutation,
  useGetResourcesByIdQuery,
  useUpdateResourcesMutation,
} from "@/redux/api/resourceApi";
import { FormInputText } from "@/components/form-components/FormInputText";
import { useGetAllTemplateQuery } from "@/redux/api/templateApi";
import ResourceGroupDetails from "@/components/data-tables/resourceGroup/resourcegroupDetail";
import {
  useCreateresourcesGroupMutation,
  useDeleteResourcesGroupMutation,
  useUpdateResourcesGroupMutation,
} from "@/redux/api/resourcegroupApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setResource } from "@/redux/features/resourceSlice";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  weekly_shift_template_id: yup
    .string()
    .required("weekly shift is required")
    .nullable(),
});

const ResourceForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isEdit = !!params.id;
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;
  const [activeTab] = useState<string | null>("resourcegroup");
  const [resourseGroupData, setResourceGroupData] = useState<any>();
  const paramsId = params && params.id;
  const resourceSelector = useAppSelector((state) => state.resource.resource);

  const [templateData, setTemplateData] = useState<any>();

  const defaultValues = {
    name: "",
    weekly_shift_template_id: "",
  };

  const { data: getResourceIdData, refetch: refetchResourcesById } =
    useGetResourcesByIdQuery(Number(paramsId), {
      skip: !paramsId,
      refetchOnMountOrArgChange: true,
    });

  const [createresourcesGroup, { isSuccess: createRgIsSuccess }] =
    useCreateresourcesGroupMutation<any>();

  const [deleteResourcesGroup] = useDeleteResourcesGroupMutation();
  const [updateResourcesGroup] = useUpdateResourcesGroupMutation();

  const [
    updateResources,
    {
      data: updateResource,
      isLoading: updateResourceIsLoading,
      error: updateResourceError,
    },
  ] = useUpdateResourcesMutation();

  const [
    createresources,
    {
      data: createResourceData,
      isLoading: resourceIsLoading,
      error: resourceError,
    },
  ] = useCreateresourcesMutation();

  const { data: getTemplateData, isLoading: templateIsLoading } =
    useGetAllTemplateQuery();

  const form = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // console.log(resourceSelector, "resourceSelector");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const boxStyle = {
    boxShadow: "0.3px 0.3px 1px rgba(0, 0, 0, 0.16)", // Adjust values as needed
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
  };

  const onSubmit = (data: any) => {
    const requestObj = {
      name: data.name,
      weekly_shift_template_id: data.weekly_shift_template_id,
    };
    if (isEdit) {
      updateResources({ id: params.id, data: requestObj });
    } else {
      createresources(requestObj);
    }
  };
  const handleCreateResourceGroup = async (values: any) => {
    if (values) {
      const requestObj = {
        name: values.name,
        resource_ids: [Number(paramsId)],
      };
      const response = await createresourcesGroup(requestObj);
      if (response) refetchResourcesById();
      return response;
    }
  };

  const handleEditResourceGroup = async (values: any) => {
    if (values) {
      const responce = await updateResourcesGroup({
        id: values.id,
        data: values,
      });
      return responce;
    }
  };

  const handleDeleteResourceGroup = async (row: any) => {
    if (row) {
      const response = await deleteResourcesGroup(row.id);
      if (response) refetchResourcesById();
      return response;
    }
  };

  useEffect(() => {
    if (!resourceIsLoading && createResourceData) {
      toast.success(`Resource Add Sucessfully`) && navigate("/resources");
    }
    if (!updateResourceIsLoading && updateResource) {
      toast.success(`Resource Update  Sucessfully`) && navigate("/resources");
    }
  }, [
    resourceIsLoading,
    resourceError,
    createResourceData,
    updateResourceIsLoading,
    updateResourceError,
    updateResource,
  ]);

  useEffect(() => {
    if (!templateIsLoading && getTemplateData) {
      const transformedJob = getTemplateData.map((jobdata: any) => ({
        label: jobdata.name,
        value: jobdata.id,
      }));
      setTemplateData(transformedJob);
    }
  }, [templateIsLoading, getTemplateData]);

  useEffect(() => {
    const excluded_fields = ["weekly_shift_template"];
    if (isEdit) {
      if (resourceSelector) {
        setResourceGroupData(resourceSelector.resource_groups);
        Object.entries(resourceSelector ?? []).forEach(([name, value]: any) => {
          if (excluded_fields.includes(name)) {
            setValue("weekly_shift_template_id", value.id);
            return;
          }
          form.setValue(name, value);
        });
      }
    }
  }, [resourceSelector]);

  useEffect(() => {
    if (getResourceIdData && isEdit) {
      dispatch(setResource(getResourceIdData));
    }
  }, [getResourceIdData]);

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
                {isEdit ? "Edit Resource" : "Create Resource"}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <FormInputText
                      name={"name"}
                      control={control}
                      label={"Name"}
                      placeholder={"Enter task Name"}
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
                            <MenuItem {...props} value={Number(option.value)}>
                              {option.label}
                            </MenuItem>
                          )}
                          fullWidth
                          onChange={onChange}
                        />
                      )}
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
                        onClick={() => navigate("/resources")}
                      >
                        {isEdit ? "Back" : "Cancel"}
                      </Button>
                      <LoadingButton
                        size="large"
                        type="submit"
                        loading={resourceIsLoading}
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
        {isEdit && (
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
        )}
      </Layout>
    </>
  );
};

export default ResourceForm;
