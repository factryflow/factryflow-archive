import React, { useEffect, useState } from "react";
import { Box, Button, Stack, useTheme } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Card } from "@mantine/core";
import { toast } from "react-toastify";
import Loading from "@/components/loading/loading";

import Header from "../../components/table/Header";
import Layout from "../Layout";
import { setTaskies } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useGetAllTasksQuery,
  useDeleteTasksMutation,
} from "@/redux/api/taskApi";

import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import { getString } from "@/helpers";
import DeleteModel from "@/components/table/Model/delete-model";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "../../assets/images/home.svg";

const Tasks = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const {
    data: getTaskData,
    isLoading: taskIsLoading,
    error,
  } = useGetAllTasksQuery(undefined);

  const [deleteTasks] = useDeleteTasksMutation();
  const dispatch = useAppDispatch();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const taskiesSelector = useAppSelector((state: any) => state.task.taskies);

  const handleClick = () => {
    navigate("/tasks/form");
  };

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "external_id",
      headerName: "External Number",
      width: 130,
    },
    {
      field: "name",
      headerName: "Name",
      width: 100,
    },
    {
      field: "task_status",
      headerName: "Task Status",
      width: 100,
      renderCell: (params: any) => {
        return <p>{params?.row?.task_status?.name}</p>;
      },
    },
    {
      field: "task_type",
      headerName: "Task Type",
      width: 100,
      renderCell: (params: any) => {
        return <p>{params?.row?.task_type?.name}</p>;
      },
    },

    {
      field: "job",
      headerName: "Job",
      width: 100,
      renderCell: (params: any) => {
        return <p>{params?.row?.job?.name}</p>;
      },
    },
    {
      field: "setup_time",
      headerName: "Setup Time",
      width: 100,
    },
    {
      field: "run_time_per_unit",
      headerName: "Run Time Per Unit",
      width: 130,
    },
    {
      field: "teardown_time",
      headerName: "Teardown Time",
      width: 120,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "predecessors",
      headerName: "Predecessors",
      width: 120,
    },
    {
      field: "item",
      headerName: "Item",
      width: 100,
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
          setDeleteModel(true);
          setDeleteId(currentRowId);
        };
        const handleEditAction = () => {
          const currentRow = params.row;
          navigate(`/tasks/form/${currentRow?.id}`);
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
    }
    return;
  };
  //handle delete function  in custom delete modal
  const handleDelete = () => {
    if (deleteId) {
      deleteTasks(deleteId);
      setDeleteModel(false);
    }
    return;
  };

  return (
    <>
      <Layout>
        <Box m="20px">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ marginBottom: "10px" }}
          >
            <Link color="inherit" to="/">
              <img
                src={HomeIcon}
                alt="view_Icon"
                height={14}
                width={14}
                style={{ marginTop: "4px" }}
              />
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#5E6278" }}
              to="/tasks"
            >
              Task
            </Link>
            <Typography color="#A1A5B7">Overview</Typography>
          </Breadcrumbs>
          <Header
            title="Tasks Management"
            buttonname="Create New Tasks"
            onClick={handleClick}
          />
          <Box
            m="30px 0 0 0"
            height="auto"
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
                flex: "0 0 70%",
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
              {taskIsLoading ? (
                <Loading />
              ) : (
                getTaskData && (
                  <>
                    <DataGrid
                      className="dataGrid"
                      autoHeight={true}
                      rows={getTaskData ?? []}
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
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            handleCancle={handleCancle}
            handleDelete={handleDelete}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Tasks;
