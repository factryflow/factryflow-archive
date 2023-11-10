import { useState } from "react";
import { Box, Stack, useTheme } from "@mui/material";

import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/table/Header";
import Layout from "../Layout";

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
import DataTable from "@/components/table/DataTable";

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
  const [deleteRowName, setDeleteRowName] = useState<any>("");
  const taskiesSelector = useAppSelector((state: any) => state.task.taskies);

  const handleClick = () => {
    navigate("/production/tasks/form");
  };

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "external_id",
      headerName: "External Number",
      width: 160,
    },
    {
      field: "name",
      headerName: "Name",
      width: 160,
    },
    {
      field: "task_status",
      headerName: "Task Status",
      width: 160,
      renderCell: (params: any) => {
        return <p>{params?.row?.task_status?.name}</p>;
      },
    },
    {
      field: "task_type",
      headerName: "Task Type",
      width: 160,
      renderCell: (params: any) => {
        return <p>{params?.row?.task_type?.name}</p>;
      },
    },

    {
      field: "job",
      headerName: "Job",
      width: 160,
      renderCell: (params: any) => {
        return <p>{params?.row?.job?.name}</p>;
      },
    },
    {
      field: "setup_time",
      headerName: "Setup Time",
      width: 160,
    },
    {
      field: "run_time_per_unit",
      headerName: "Run Time Per Unit",
      width: 160,
    },
    {
      field: "teardown_time",
      headerName: "Teardown Time",
      width: 160,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 160,
    },

    {
      field: "action",
      headerName: "Action",
      width: 160,
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
              to={`/production/tasks/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>
            <Link
              to={`/production/tasks/form/${currentRowId}`}
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
              to="/production/tasks"
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
          {getTaskData && (
            <DataTable rows={getTaskData ?? []} columns={columns ?? []} />
          )}
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            handleCancle={handleCancle}
            handleDelete={handleDelete}
            deleterowName={deleteRowName}
            deleteTitle={"Task"}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Tasks;
