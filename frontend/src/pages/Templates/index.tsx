import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Header from "@/components/table/Header";
import { Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";

import { useGetAllTemplateQuery } from "@/redux/api/templateApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setTemplates } from "@/redux/features/templateSlice";
import { useDeleteTemplateMutation } from "@/redux/api/templateApi";

import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";
import DataTable from "@/components/table/DataTable";

const Template = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: templateData,
    isLoading: templateIsLoading,
    error: templateError,
  } = useGetAllTemplateQuery();

  const [deleteTemplate] = useDeleteTemplateMutation();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const [deleteRowName, setDeleteRowName] = useState<any>("");

  const templateSelector = useAppSelector((state) => state.template.templates);

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
              to={`/resource/template/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>
            <Link
              to={`/resource/template/form/${currentRowId}`}
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
      deleteTemplate(deleteId);
      setDeleteModel(false);
    }
    return;
  };

  const handleClick = () => {
    navigate("/resource/template/form");
  };

  useEffect(() => {
    if (!templateIsLoading && templateData) {
      dispatch(setTemplates(templateData));
    }
  }, [templateIsLoading, templateData, templateError]);

  return (
    <Layout>
      <Box m="20px">
        <Header
          title="Template Management"
          buttonname="Create New Template"
          onClick={handleClick}
        />
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/template/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}>
              Template
            </Button>
          </Link>
        </Box> */}

        {templateSelector && (
          <DataTable rows={templateSelector ?? []} columns={columns ?? []} />
        )}
      </Box>
      <DeleteModel
        deleteModel={deleteModel}
        setDeleteModel={setDeleteModel}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
        deleterowName={deleteRowName}
        deleteTitle={"Template"}
      />
    </Layout>
  );
};

export default Template;
