import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

import Loading from "@/components/loading/loading";
import { setexceptions } from "@/redux/features/exceptionSlice";
import {
  useGetAllExceptionQuery,
  useDeleteExceptionMutation,
} from "@/redux/api/exceptionApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Layout from "../Layout";
import Header from "../../components/table/Header";

import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";
import { Card } from "@mantine/core";
const Exception = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: exceptiondata,
    isLoading: exceptionIsLoading,
    error: exceptionError,
  } = useGetAllExceptionQuery();

  const [deleteException] = useDeleteExceptionMutation();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const [deleteRowName, setDeleteRowName] = useState<any>("");

  const exceptionSelector = useAppSelector(
    (state) => state.exception.exceptions
  );

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "external_id",
      headerName: "External Id",
      width: 170,
    },
    {
      field: "operational_exception_type",
      headerName: "Exception Type",
      width: 170,
      renderCell: (row) => {
        return (
          <p>
            {row.row.operational_exception_type
              ? row.row.operational_exception_type.name
              : ""}
          </p>
        );
      },
    },
    {
      field: "start_datetime",
      headerName: "Start Datetime",
      width: 170,
      renderCell: (row) => {
        return (
          <p>
            {row.row.start_datetime ? row.row.start_datetime?.slice(0, 16) : ""}
          </p>
        );
      },
    },
    {
      field: "end_datetime",
      headerName: "End Datetime",
      width: 170,
      renderCell: (row) => {
        return (
          <p>
            {row.row.end_datetime ? row.row.end_datetime?.slice(0, 16) : ""}
          </p>
        );
      },
    },
    {
      field: "notes",
      headerName: "Notes",
    },
    {
      field: "weekly_shift_template",
      headerName: "Template",
      width: 170,
      renderCell: (row) => {
        return (
          <p>
            {row.row.weekly_shift_template
              ? row.row.weekly_shift_template.name
              : ""}
          </p>
        );
      },
    },
    {
      field: "resource",
      headerName: "Resource",
      width: 170,
      renderCell: (row) => {
        return <p>{row.row.resource ? row.row.resource.name : ""}</p>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 170,
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
              to={`/resource/exception/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>

            <Link
              to={`/resource/exception/form/${currentRowId}`}
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
      deleteException(deleteId);
      setDeleteModel(false);
    }
    return;
  };

  const handleClick = () => {
    navigate("/resource/exception/form");
  };

  useEffect(() => {
    if (!exceptionIsLoading && exceptiondata) {
      dispatch(setexceptions(exceptiondata));
    }
  }, [exceptionIsLoading, exceptiondata]);

  return (
    <>
      <Layout>
        <Box m="20px">
          <Header
            title="Exception Management"
            buttonname="Create New Exception"
            onClick={handleClick}
          />
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/resources/form">
              <Button variant="contained" startIcon={<AddBoxIcon />}>
                Exception
              </Button>
            </Link>
            <Link to="/exception/exception-type">
              <Button variant="contained">Manage Exceptional Type</Button>
            </Link>
          </Box> */}

          <Box
            m="30px 0 0 0"
            height="500px"
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
              ".MuiButtonBase-root-MuiCheckbox-root:hover": {
                backgroundColor: "transparent",
              },
              ".MuiButtonBase-root-MuiIconButton-root:hover": {
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
            <Card
              withBorder
              sx={{
                padding: "0px !important",
                marginTop: 10,
                borderRadius: "12px",
                border: "1px solid rgba(225, 227, 234, 0.50)",
                height: "100%",
              }}
            >
              {exceptionIsLoading ? (
                <Loading />
              ) : (
                exceptionSelector && (
                  <>
                    <DataGrid
                      className="dataGrid"
                      rows={exceptionSelector ?? []}
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
          deleteTitle={"Exception"}
        />
      </Layout>
    </>
  );
};

export default Exception;
