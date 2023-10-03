import React, { useEffect } from "react";
import { Box, Button, Stack, useTheme } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/loading/loading";
import {
  useGetAllDependencyTypeQuery,
  useDeleteDependencytypeMutation,
} from "../../../service/dependencytypeApi";
import Header from "../../../components/table/Header";
import Layout from "../../Layout";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setDependenciestype } from "../../../features/dependencytypeSlice";
import { toast } from "react-toastify";

const DependencyType = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    data: dependencyTypeData,
    isLoading: dependencyTypeIsLoading,
    error: dependencyTypeError,
  } = useGetAllDependencyTypeQuery(undefined);

  const [deleteDependencytype] = useDeleteDependencytypeMutation();

  console.log(dependencyTypeData, "dependencyTypeData");

  const dependenciesTypeSelector = useAppSelector(
    (state) => state.dependencytype.dependenciestype
  );
  console.log(dependenciesTypeSelector, "dependenciesTypeSelector");

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "description",
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
            window.confirm(
              "Are you sure you want to remove this Dependency Type?"
            )
          ) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteDependencytype(currentRow?.id);
            const newDependenciestypeData = dependenciesTypeSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setDependenciestype(newDependenciestypeData));
            toast.success("Dependency Type Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/dependencys/dependencytype/form/${currentRow?.id}`);
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
    if (!dependencyTypeIsLoading && dependencyTypeData) {
      dispatch(setDependenciestype(dependencyTypeData));
    }
  }, [dependencyTypeIsLoading, dependencyTypeData, dependencyTypeError]);

  return (
    <>
      {" "}
      <Layout>
        <Box m="20px">
          <Header title="Dependency Type" subtitle="List of Dependency Type " />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/dependency/dependencytype/form">
              <Button variant="contained" startIcon={<AddBoxIcon />}>
                Dependency Type
              </Button>
            </Link>
            <Link to="/dependency/">
              <Button variant="contained" startIcon={<ArrowBackOutlinedIcon />}>
                Back to dependency
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
            {dependencyTypeIsLoading ? (
              <Loading />
            ) : (
              dependenciesTypeSelector && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={dependenciesTypeSelector ?? []}
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

export default DependencyType;
