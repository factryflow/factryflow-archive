import { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useDeleteResourcesGroupMutation,
  useGetAllResourcesGroupQuery,
} from "@/redux/api/resourcegroupApi";
import Header from "../../../components/table/Header";
import Layout from "../../Layout";
import { setResourceGroups } from "@/redux/features/resourceGroupSlice";

import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";
import DataTable from "@/components/table/DataTable";

const ResourcesGroup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const [deleteRowName, setDeleteRowName] = useState<any>("");

  const resourceGroupSelector = useAppSelector(
    (state) => state.resourceGroup.resourceGroups
  );

  //   const { data: resourceData, isLoading: resourceIsLoading } =
  //     useGetAllResourcesQuery();

  const { data: resourceGroupData, isLoading: resourceGroupIsLoading } =
    useGetAllResourcesGroupQuery();

  //   const [deleteResources] = useDeleteResourcesMutation();

  const [deleteResourcesGroup] = useDeleteResourcesGroupMutation();

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const currentRowId = params.row.id;
        const currentRowName = params.row.name;
        const handleDeleteAction = () => {
          setDeleteModel(true);
          setDeleteId(currentRowId);
          setDeleteRowName(currentRowName);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Link
              to={`/resource/resources/resourcegroup/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>
            <Link
              to={`/resource/resources/resourcegroup/form/${currentRowId}`}
              state={{ viewmode: false }}
            >
              <img src={editicon} alt="edit_Icon" height={17} width={17} />
            </Link>
            <img
              src={deleteicon}
              alt="delete_Icon"
              height={17}
              width={17}
              onClick={handleDeleteAction}
            />
          </Stack>
        );
      },
    },
  ];

  //handle cancle function  in custom delete modal
  const handleCancle = () => {
    setDeleteModel(false);
    if (deleteId) {
      setDeleteId("");
      setDeleteRowName("");
    }
    return;
  };
  //handle delete function  in custom delete modal
  const handleDelete = () => {
    if (deleteId) {
      deleteResourcesGroup(deleteId);
      setDeleteModel(false);
    }
    return;
  };

  const handleClick = () => {
    navigate("/resource/resources/resourcegroup/form");
  };

  useEffect(() => {
    if (!resourceGroupIsLoading && resourceGroupData) {
      dispatch(setResourceGroups(resourceGroupData));
    }
  }, [resourceGroupIsLoading, resourceGroupData]);

  return (
    <Layout>
      <Box m="20px">
        <Header
          title="Resourse group"
          buttonname="Create New Resourse Group"
          onClick={handleClick}
        />
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/resources/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}></Button>
          </Link>
          <Link to="/resources/resourcegroup">
            <Button variant="contained">Manage Resorce Group</Button>
          </Link>
        </Box> */}

        {resourceGroupSelector && (
          <DataTable
            rows={resourceGroupSelector ?? []}
            columns={columns ?? []}
          />
        )}
      </Box>

      <DeleteModel
        deleteModel={deleteModel}
        setDeleteModel={setDeleteModel}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
        deleterowName={deleteRowName}
        deleteTitle={"Resource Group"}
      />
    </Layout>
  );
};

export default ResourcesGroup;
