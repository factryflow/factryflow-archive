import React, { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { toast } from "react-toastify";
import Loading from "@/components/loading/loading";
// import { setexceptions } from "../../features/exceptionSlice";
// import { useGetAllExceptionQuery } from "../../service/exceptionApi";
import { setexceptionTypes } from "../../../features/exceptiontypeSlice";
import {
  useGetAllExceptionTypeQuery,
  useDeleteExceptionTypeMutation,
} from "../../../service/exceptionTypeApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Header from "../../../components/Header";
import Layout from "../../Layout";

const ExceptionType = () => {
  // "id": 1,
  //         "external_id": null,
  //         "operational_exception_type": null,
  //         "start_datetime": "2023-08-30T07:29:00Z",
  //         "end_datetime": "2023-09-01T10:00:00Z",
  //         "notes": "test",
  //         "weekly_shift_template": null,
  //         "is_active": true,
  //         "is_deleted": false

  const dispatch = useAppDispatch();

  const exceptionTypeSelector = useAppSelector(
    (state) => state.exceptiontype.exceptionTypes
  );

  const [deleteExceptionType] = useDeleteExceptionTypeMutation();

  const {
    data: exceptionTypeData,
    isLoading: exceptionTypeIsLoading,
    error: exceptionTypeError,
  } = useGetAllExceptionTypeQuery();

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
      flex: 1,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          if (
            window.confirm(
              "Are you sure you want to remove this Exception type?"
            )
          ) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteExceptionType(currentRow?.id);
            const newExceptionTypeData = exceptionTypeSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setexceptionTypes(newExceptionTypeData));
            toast.success("Exception type Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          //   const currentRow = params.row;
          //   navigate(`/resources/form/${currentRow?.id}`);
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
    if (!exceptionTypeIsLoading && exceptionTypeData) {
      dispatch(setexceptionTypes(exceptionTypeData));
    }
  }, [exceptionTypeIsLoading, exceptionTypeData]);

  return (
    <>
      <Layout>
        <Box m="20px">
          <Header title="Exception Type" subtitle="List of Exception Type" />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/resources/form">
              <Button variant="contained" startIcon={<AddBoxIcon />}>
                Exception Type
              </Button>
            </Link>
            <Link to="/exception">
              <Button variant="contained" startIcon={<ArrowBackOutlinedIcon />}>
                Back to Exception
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
            {exceptionTypeIsLoading ? (
              <Loading />
            ) : (
              exceptionTypeSelector && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={exceptionTypeSelector ?? []}
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

export default ExceptionType;
