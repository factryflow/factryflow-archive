import React, { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useDeleteResourcesMutation,
  useGetAllResourcesQuery,
} from "@/redux/api/resourceApi";
import { setResourcesies } from "@/redux/features/resourceSlice";
import Layout from "../Layout";
import Header from "../../components/table/Header";
import Loading from "@/components/loading/loading";

const Resources = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resourceSelector = useAppSelector(
    (state) => state.resource.resourcesies
  );

  const { data: resourceData, isLoading: resourceIsLoading } =
    useGetAllResourcesQuery();

  const [deleteResources] = useDeleteResourcesMutation();

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "resource_groups_list",
      headerName: "Resource Groups List",
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
            window.confirm("Are you sure you want to remove this Resource?")
          ) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteResources(currentRow?.id);
            const newresourceData = resourceSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setResourcesies(newresourceData));
            toast.success("Resource Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/resources/form/${currentRow?.id}`);
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
    if (!resourceIsLoading && resourceData) {
      dispatch(setResourcesies(resourceData));
    }
  }, [resourceIsLoading, resourceData]);

  return (
    <Layout>
      <Box m="20px">
        <Header title="Resource" subtitle="List of Resource " />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/resources/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}>
              Resourse
            </Button>
          </Link>
          <Link to="/resources/resourcegroup">
            <Button variant="contained">Manage Resorce Group</Button>
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
          {resourceIsLoading ? (
            <Loading />
          ) : (
            resourceSelector && (
              <>
                <DataGrid
                  className="dataGrid"
                  rows={resourceSelector ?? []}
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

export default Resources;
