import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useDeleteResourcesGroupMutation,
  useGetAllResourcesGroupQuery,
} from "@/redux/api/resourcegroupApi";
import Header from "../../../components/table/Header";
import Layout from "../../Layout";
import { setResourceGroups } from "@/redux/features/resourceGroupSlice";
import Loading from "@/components/loading/loading";
import { Card } from "@mantine/core";

import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";

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
      field: "resources_list",
      headerName: "Resource List",
      flex: 1, // Adjust the width as needed
      renderCell: (params: any) => {
        return <p>{params?.row?.resources[0]?.name}</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleDeleteAction = () => {
          const currentRowId = params.row.id;
          const currentRowName = params.row.name;
          setDeleteModel(true);
          setDeleteId(currentRowId);
          setDeleteRowName(currentRowName);
        };
        const handleEditAction = () => {
          const currentRow = params.row;
          navigate(`/resource/resources/resourcegroup/form/${currentRow?.id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            <img src={viewicon} alt="view_Icon" height={17} width={17} />
            <img
              src={editicon}
              alt="edit_Icon"
              height={17}
              width={17}
              onClick={handleEditAction}
            />
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

        <Box
          m="30px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "unset",
              marginTop: "10px",
            },

            "& .name-column--cell": {
              color: "bold !important",
            },
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FAFAFA",
              color: "	#000000",
              fontSize: "14px",
              fontWeight: "bold !important",
              borderTop: "1px solid #F0F0F0",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FFFFFF",
              width: "100%",
            },
            "& .MuiTablePagination-root": {
              background: "#FAFAFB",
              width: "100%",
            },
            "& .MuiTablePagination-spacer": {
              display: "none",
            },
            "& .MuiTablePagination-selectLabel": {
              flex: "0 0 6%",
            },
            "& .MuiTablePagination-displayedRows": {
              flex: "0 0 60%",
              textAlign: "right",
            },
            "& .css-1hgjne-MuiButtonBase-root-MuiIconButton-root": {
              background: "#FFFFFF !important",
              border: "1px solid #E1E3EA80",
            },
            "& .MuiCheckbox-root svg": {
              width: "30px",
              height: "30px",
              backgroundColor: "#F1F1F2",
              borderRadius: "7px",
              padding: "6px 7px",
            },
            "& .MuiCheckbox-root svg path": {
              display: "none",
            },
            "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg":
              {
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              },
            ".MuiDataGrid-cell:focus": {
              outline: "none !important",
            },
            ".MuiDataGrid-columnHeader:focus-within": {
              outline: "none !important",
            },
            ".MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            ".MuiDataGrid-toolbarContainer": {
              padding: "15px",
              flexDirection: "row-reverse",
              marginBottom: "10px",
            },
            ".MuiFormControl-root": {
              border: "1px solid #E1E3EA",
              borderRadius: "6px",
              width: "450px",
              paddingBottom: "0",
              padding: "0 10px",
              ".MuiInput-underline": {
                "&:before": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            },
            ".MuiSvgIcon-root": {
              width: "24px",
              height: "24px",
              color: "#A1A5B7",
            },
            ".MuiDataGrid-iconSeparator": {
              display: "none",
            },
            ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root:hover": {
              backgroundColor: "transparent",
            },
            ".css-9vna8i-MuiButtonBase-root-MuiIconButton-root:hover": {
              backgroundColor: "transparent",
            },
            ".MuiTablePagination-select": {
              paddingRight: "34px",
              paddingTop: "10px",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontSize: "14px",
              color: "#181C32",
              fontWeight: 600,
            },
            ".MuiDataGrid-sortIcon": {
              color: "#7E8299",
              opacity: "inherit !important",
            },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-cellContent": {
              fontSize: "14px",
            },
          }}
        >
          <Card withBorder sx={{ padding: "0px !important", marginTop: 10 }}>
            {false ? (
              <Loading />
            ) : (
              true && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={resourceGroupSelector ?? []}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableColumnMenu
                    disableDensitySelector
                    disableColumnSelector
                    // checkboxSelection
                    // rows={jobData}
                    // columns={columns}
                  />
                </>
              )
            )}
          </Card>
        </Box>
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
