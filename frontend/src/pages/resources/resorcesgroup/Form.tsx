import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import Layout from "../../Layout";
import { useAppSelector } from "../../../app/hooks";

import {
  useCreateresourcesGroupMutation,
  useUpdateResourcesGroupMutation,
} from "@/redux/api/resourcegroupApi";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
  resources_list: yup.array(),
});

const ResourceGroupForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const [selectedIds, setSelectedIds] = useState([]);
  // console.log(selectedIds, "selectedId");
  const handleSelectChange = (event: any) => {
    setSelectedIds(event.target.value);
  };

  const [
    updateResourcesGroup,
    {
      data: updateResourceGroup,
      isLoading: updateResourceGroupIsLoading,
      error: updateResourceGroupError,
    },
  ] = useUpdateResourcesGroupMutation();

  const [
    createresourcesGroup,
    {
      data: createResourceGroupData,
      isLoading: resourceGroupIsLoading,
      error: resourceGroupError,
    },
  ] = useCreateresourcesGroupMutation();

  const resourceGroupSelector = useAppSelector(
    (state) => state.resourceGroup.resourceGroups
  );

  const resourceSelector = useAppSelector(
    (state) => state.resource.resourcesies
  );
  // console.log(resourceSelector, "resourceSelector");

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
    const requestObj = {
      name: data.name,
      resources_list: selectedIds,
    };

    // console.log(data, "Data");
    if (isEdit) {
      updateResourcesGroup({ id: params.id, data: requestObj });
    } else {
      createresourcesGroup(requestObj);
    }
  };

  useEffect(() => {
    if (!resourceGroupIsLoading && createResourceGroupData) {
      createResourceGroupData.code >= 400
        ? toast.error(createResourceGroupData.message)
        : toast.success(createResourceGroupData.message) &&
          navigate("/resources/resourcegroup");
    }
  }, [resourceGroupIsLoading, resourceGroupError, createResourceGroupData]);

  useEffect(() => {
    if (!updateResourceGroupIsLoading && updateResourceGroup) {
      updateResourceGroup.code >= 400
        ? toast.error(updateResourceGroup.message)
        : toast.success(updateResourceGroup.message) &&
          navigate("/resources/resourcegroup");
    }
  }, [
    updateResourceGroupIsLoading,
    updateResourceGroupError,
    updateResourceGroup,
  ]);

  useEffect(() => {
    const excluded_fields = ["resources_list"];
    if (isEdit) {
      if (resourceGroupSelector) {
        const getresourceGroup = resourceGroupSelector.filter(
          (item: any) => item.id === Number(params.id)
        );

        Object.entries(getresourceGroup[0] ?? []).forEach(
          ([name, value]: any) => {
            if (excluded_fields.includes(name)) {
              setSelectedIds(value);
              return;
            }
            form.setValue(name, value);
          }
        );
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
                {isEdit ? "Edit Resource Group" : "Create Resource Group "}
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
                      <InputLabel>Resource List</InputLabel>
                      <Controller
                        name="resources_list"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            multiple
                            value={selectedIds}
                            onChange={handleSelectChange}
                            label="Resource  List"
                          >
                            {resourceSelector.map((item: any) => (
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
                      loading={
                        resourceGroupIsLoading || updateResourceGroupIsLoading
                      }
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

export default ResourceGroupForm;
