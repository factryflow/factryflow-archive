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
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import { useAppSelector } from "../../app/hooks";

import {
  useCreateresourcesMutation,
  useUpdateResourcesMutation,
} from "@/redux/api/resourceApi";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  resource_groups_list: yup.array(),
});

const ResourceForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const [selectedIds, setSelectedIds] = useState([]);
  // console.log(selectedIds, "selectedId");
  const handleSelectChange = (event: any) => {
    setSelectedIds(event.target.value);
  };

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

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  //   const dependenciestypeSelector = useAppSelector(
  //     (state) => state.dependencytype.dependenciestype
  //   );

  const resourceGroupSelector = useAppSelector(
    (state) => state.resourceGroup.resourceGroups
  );

  const resourceSelector = useAppSelector(
    (state) => state.resource.resourcesies
  );

  // console.log(resourceSelector, "resourceSelector");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: any) => {
    const requestObj = {
      name: data.name,
      resource_groups_list: selectedIds,
    };

    // console.log(data, "Data");
    if (isEdit) {
      updateResources({ id: params.id, data: requestObj });
    } else {
      createresources(requestObj);
    }
  };

  useEffect(() => {
    if (!resourceIsLoading && createResourceData) {
      createResourceData.code >= 400
        ? toast.error(createResourceData.message)
        : toast.success(createResourceData.message) && navigate("/resources");
    }
  }, [resourceIsLoading, resourceError, createResourceData]);

  useEffect(() => {
    if (!updateResourceIsLoading && updateResource) {
      updateResource.code >= 400
        ? toast.error(updateResource.message)
        : toast.success(updateResource.message) && navigate("/resources");
    }
  }, [updateResourceIsLoading, updateResourceError, updateResource]);

  useEffect(() => {
    const excluded_fields = ["resource_groups_list"];
    if (isEdit) {
      if (resourceSelector) {
        const getresource = resourceSelector.filter(
          (item: any) => item.id === Number(params.id)
        );

        Object.entries(getresource[0] ?? []).forEach(([name, value]: any) => {
          if (excluded_fields.includes(name)) {
            setSelectedIds(value);
            return;
          }
          form.setValue(name, value);
        });
      }
    }
  }, [isEdit]);

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
                {isEdit ? "Edit Resource " : "Create Resource "}
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
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Resource Group</InputLabel>
                      <Controller
                        name="resource_groups_list"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            multiple
                            value={selectedIds}
                            onChange={handleSelectChange}
                            label="Resource Groups List"
                          >
                            {resourceGroupSelector.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
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
                      loading={resourceIsLoading || updateResourceIsLoading}
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

export default ResourceForm;
