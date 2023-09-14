import React, { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Layout from "../../Layout";
import {
  useDeleteResourcesGroupMutation,
  useGetAllResourcesGroupQuery,
} from "../../../service/resourcegroupApi";
import { setResourceGroups } from "../../../features/resourceGroupSlice";
const ResourcesGroup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;

          if (
            window.confirm(
              "Are you sure you want to remove this Resource Group?"
            )
          ) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteResourcesGroup(currentRow?.id);
            const newresourceGroupData = resourceGroupSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setResourceGroups(newresourceGroupData));
            toast.success("Resource Group Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/resources/resourceGroup/form/${currentRow?.id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            <ModeEditOutlinedIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={handleEditAction}
            />

            <DeleteOutlinedIcon
              sx={{ color: "red", cursor: "pointer" }}
              onClick={handleDeleteAction}
            />
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    if (!resourceGroupIsLoading && resourceGroupData) {
      dispatch(setResourceGroups(resourceGroupData));
    }
  }, [resourceGroupIsLoading, resourceGroupData]);

  return (
    <Layout>
      <Box m="20px">
        <Header title="Resource Group" subtitle="List of Resource Group " />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/resources/resourceGroup/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}>
              Resourse Group
            </Button>
          </Link>
          <Link to="/resources">
            <Button variant="contained" startIcon={<ArrowBackOutlinedIcon />}>
              Back To Resourse
            </Button>
          </Link>
        </Box>

        <Box
          m="30px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {},
            "& .MuiDataGrid-cell": {
              // borderBottom: "none",
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
              fontSize: "10px",
              fontWeight: "bold !important",
              textTransform: "uppercase",
              borderTop: "1px solid #F0F0F0",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FFFFFF",
            },
            "& .MuiCheckbox-root": {
              color: `1677FF !important`,
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
            },
          }}
        >
          {resourceGroupIsLoading ? (
            <>
              <h3>Loading...</h3>
            </>
          ) : (
            resourceGroupSelector && (
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
        </Box>
      </Box>
    </Layout>
  );
};

export default ResourcesGroup;
