import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  useDeleteResourcesMutation,
  useGetAllResourcesQuery,
} from "@/redux/api/resourceApi";
import { setResourcesies } from "@/redux/features/resourceSlice";
import Layout from "../Layout";
import Header from "../../components/table/Header";

import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";
import DataTable from "@/components/table/DataTable";

const Resources = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const [deleteRowName, setDeleteRowName] = useState<any>("");

  const { data: resourceData, isLoading: resourceIsLoading } =
    useGetAllResourcesQuery();

  const [deleteResources, { isSuccess: deleteResourceissuccess }] =
    useDeleteResourcesMutation();

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "weekly_shift_template",
      headerName: "Template",
      flex: 1,
      renderCell: (params: any) => {
        return <p>{params?.row?.weekly_shift_template?.name}</p>;
      },
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
              to={`/resource/resources/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>
            <Link
              to={`/resource/resources/form/${currentRowId}`}
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

  const handleClick = () => {
    navigate(`/resource/resources/form`);
  };
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
      deleteResources(deleteId);
      setDeleteModel(false);
    }
    return;
  };

  return (
    <Layout>
      <Box m="20px">
        <Header
          title="Resourse Management"
          buttonname="Create New Resourse"
          onClick={handleClick}
        />
        <Box>
          <Link to="/resource/resources/resourcegroup">
            <Button variant="contained">Manage Resorce Group</Button>
          </Link>
        </Box>

        {resourceData && (
          <DataTable rows={resourceData ?? []} columns={columns ?? []} />
        )}
      </Box>

      <DeleteModel
        deleteModel={deleteModel}
        setDeleteModel={setDeleteModel}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
        deleterowName={deleteRowName}
        deleteTitle={"Resource"}
      />
    </Layout>
  );
};

export default Resources;
