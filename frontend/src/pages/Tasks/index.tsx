import React, { useEffect } from "react";
import { Box, Button, Stack, useTheme } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { toast } from "react-toastify";
import Loading from "@/components/loading/loading";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Layout from "../Layout";
import { setTaskies } from "../../features/taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useGetAllTasksQuery,
  useDeleteTasksMutation,
} from "../../service/taskApi";

const Tasks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const {
    data: getTaskData,
    isLoading: taskIsLoading,
    error,
  } = useGetAllTasksQuery(undefined);

  const [deleteTasks] = useDeleteTasksMutation();
  const dispatch = useAppDispatch();
  const taskiesSelector = useAppSelector((state) => state.task.taskies);

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
      width: 180,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;

          if (window.confirm("Are you sure you want to remove this Task?")) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteTasks(currentRow?.id);
            const newTaskiesData = taskiesSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setTaskies(newTaskiesData));
            toast.success("Task Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/tasks/form/${currentRow?.id}`);
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
    if (!taskIsLoading && getTaskData) {
      dispatch(setTaskies(getTaskData));
    }
  }, [taskIsLoading, getTaskData]);
  return (
    <>
      <Layout>
        <Box m="20px">
          <Header title="Tasks" subtitle="List of Tasks " />
          <Link to="/tasks/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}>
              Task
            </Button>
          </Link>
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
            {taskIsLoading ? (
              <>
                <Loading />
              </>
            ) : (
              taskiesSelector && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={taskiesSelector ?? []}
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

export default Tasks;
