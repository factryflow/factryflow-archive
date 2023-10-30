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
  Autocomplete,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Tabs } from "@mantine/core";
import Layout from "../../Layout";
import { useAppSelector } from "../../../app/hooks";

import {
  useCreateresourcesGroupMutation,
  useGetresourceGroupByIdQuery,
  useUpdateResourcesGroupMutation,
} from "@/redux/api/resourcegroupApi";
import { FormInputText } from "@/components/form-components/FormInputText";
import { useGetAllResourcesQuery } from "@/redux/api/resourceApi";
import ResourceDetails from "@/components/data-tables/resource/resourceDetails";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").nullable(),
});

const ResourceGroupForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;
  const TabsList = Tabs.List;
  const TabsPannel = Tabs.Panel;
  const [activeTab] = useState<string | null>("resource");
  const [resourseData, setResourceData] = useState<any>();
  const paramsId = params && params.id;
  const [resourcelist, setresourceList] = useState<any>();

  // const { data: resourceData, isLoading: resourceIsLoading } =
  //   useGetAllResourcesQuery();

  const { data: rgdata, isLoading: rgisLoading } = useGetresourceGroupByIdQuery(
    Number(paramsId),
    {
      skip: !paramsId,
    }
  );

  const [updateResourcesGroup, { data: urgData, isLoading: urgisLoading }] =
    useUpdateResourcesGroupMutation();

  const [createresourcesGroup, { data: crgData, isLoading: crgisLoading }] =
    useCreateresourcesGroupMutation();

  const resourceGroupSelector = useAppSelector(
    (state) => state.resourceGroup.resourceGroups
  );

  // console.log(resourceSelector, "resourceSelector");

  const form = useForm({
    defaultValues: { name: "" },
    resolver: yupResolver(validationSchema),
  });
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

  const onSubmit = (values: any) => {
    const requestObj = {
      name: values.name,
      resource_ids: [],
    };
    // // console.log(data, "Data");
    if (isEdit) {
      updateResourcesGroup({ id: params.id, data: requestObj });
    } else {
      createresourcesGroup(requestObj);
    }
  };

  useEffect(() => {
    if (rgdata && isEdit) {
      Object.entries(rgdata ?? []).forEach(([name, value]: any) => {
        form.setValue(name, value);
      });
      setResourceData(rgdata.resources);
    }
  }, [isEdit, rgdata]);

  useEffect(() => {
    if (!crgisLoading && crgData) {
      toast.success("Resource Group Create successfully") &&
        navigate("/resources/resourcegroup");
    }
    if (!urgisLoading && urgData) {
      toast.success("Resource Group Update successfully") &&
        navigate("/resources/resourcegroup");
    }
  }, [crgisLoading, crgData, urgisLoading, urgData]);

  // useEffect(() => {
  //   if (!resourceIsLoading && resourceData) {
  //     const transformedresource = resourceData.map((jobdata: any) => ({
  //       label: jobdata.name,
  //       value: jobdata.id,
  //     }));
  //     setresourceList(transformedresource);
  //   }
  // }, [resourceIsLoading, resourceData]);

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
                {isEdit ? "Edit Resource Group" : "Create Resource Group"}
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
                      placeholder={"Enter Name"}
                      type={"text"}
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
                        onClick={() => navigate("/resources/resourcegroup")}
                      >
                        {isEdit ? "Back" : "Cancel"}
                      </Button>
                      <LoadingButton
                        size="large"
                        type="submit"
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
                    <Tabs.Tab value="resource">Resource</Tabs.Tab>
                  </TabsList>
                  <TabsPannel value="resource">
                    {activeTab === "resource" && (
                      <div style={{ height: "auto", width: "100%" }}>
                        <ResourceDetails
                          data={resourseData ?? []}
                          // handleCreateResourceGroup={handleCreateResourceGroup}
                          // handleEditResourceGroup={handleEditResourceGroup}
                          // handleDeleteResourceGroup={handleDeleteResourceGroup}
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

export default ResourceGroupForm;
