import React, { useEffect } from "react";
import Layout from "../Layout";
import { Box, Button, Stack, useTheme } from "@mui/material";

import Header from "../../components/table/Header";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useDeleteTasksMutation } from "../../service/taskApi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "@/components/loading/loading";
import {
  useDeleteDependencyMutation,
  useGetAllDependencysQuery,
} from "../../service/dependencyApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDependencies } from "../../features/dependencySlice";
const Dependencys = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const {
    data: getDependencyData,
    isLoading: dependencyIsLoading,
    error,
  } = useGetAllDependencysQuery(undefined);

  const [deleteDependency] = useDeleteDependencyMutation();
  const dispatch = useAppDispatch();
  const dependenciesSelector = useAppSelector(
    (state) => state.dependency.dependencies
  );
  //   console.log(dependenciesSelector, "selector");

  //   "id": 1,
  //   "name": "dependency test",
  //   "dependency_type": 1,
  //   "dependency_status": 1,
  //   "expected_closed": "2023-09-12T09:00:00Z",
  //   "closed_date": "2023-09-01T08:00:00Z",
  //   "notes": "test notes",
  //   "jobs": 1,
  //   "tasks": 1,
  //   "is_active": true,
  //   "is_deleted": false

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "dependency_type",
      headerName: "Dependency Type",
      flex: 1,
    },

    {
      field: "dependency_status",
      headerName: "Dependency Status",
      flex: 1, // Adjust the width as needed
    },
    {
      field: "expected_closed",
      headerName: "Expecte Closed",
      flex: 1, // Adjust the width as needed
    },
    {
      field: "closed_date",
      headerName: "Closed Date",
      flex: 1,
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1, // Adjust the width as needed
    },
    {
      field: "jobs",
      headerName: "Jobes",
      flex: 1,
    },
    {
      field: "tasks",
      headerName: "Tasks",
      flex: 1,
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
            window.confirm("Are you sure you want to remove this Dependency?")
          ) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteDependency(currentRow?.id);
            const newDependenciesData = dependenciesSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setDependencies(newDependenciesData));
            toast.success("Dependency Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/dependencys/form/${currentRow?.id}`);
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
    if (!dependencyIsLoading && getDependencyData) {
      dispatch(setDependencies(getDependencyData));
    }
  }, [dependencyIsLoading, getDependencyData]);
  return (
    <>
      <Layout>
        <Box m="20px">
          <Header title="Dependency" subtitle="List of Dependency " />
          <Box
            sx={{
              width: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/dependency/form">
              <Button variant="contained" startIcon={<AddBoxIcon />}>
                Dependency
              </Button>
            </Link>
            <Link to="/dependency/dependencytype">
              <Button variant="contained">Manage Dependency type</Button>
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
            {dependencyIsLoading ? (
              <Loading />
            ) : (
              dependenciesSelector && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={dependenciesSelector ?? []}
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
    </>
  );
};

export default Dependencys;
