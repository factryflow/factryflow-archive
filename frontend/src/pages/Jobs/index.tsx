import { Box, Stack } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Badge, Card } from "@mantine/core";
import Header from "../../components/table/Header";
import Layout from "../Layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setJobies, setJobStatus } from "@/redux/features/jobSlice";
import Loading from "@/components/loading/loading";
import useTabs from "@/hooks/useTabs";
import { getString } from "@/helpers";
import { Job } from "@/types/api.types";
import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";
import {
  useGetAllJobsQuery,
  useDeleteJobsMutation,
  useGetJobStatusQuery,
} from "@/redux/api/jobApi";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "../../assets/images/home.svg";
import DataTable from "@/components/table/DataTable";

const Jobs = () => {
  const dispatch = useAppDispatch();
  const jobsSelector = useAppSelector((state: any) => state.job.jobies);
  const jobstatusSelector = useAppSelector((state: any) => state.job.jobstatus);
  const [data, setData] = useState<Array<Job> | undefined>();

  //call api joblist
  const { data: getjobData, isLoading: jobLoading } = useGetAllJobsQuery();

  // call api jobstatus
  const { data: jobstatus, isLoading: jsIsLoading } = useGetJobStatusQuery(
    undefined,
    {}
  );

  const navigate = useNavigate();
  const [deleteJobs] = useDeleteJobsMutation();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const [deleteRowName, setDeleteRowName] = useState<any>("");

  const columns: GridColDef<Job>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Job Name",
      width: 170,
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   width: 170,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "customer",
      headerName: "Customer",
      width: 170,
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 170,
    },
    // {
    //   field: "planned_start_datetime",
    //   headerName: "Planned Start",
    //   width: 170,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (row) => {
    //     return (
    //       <span>
    //         {row.row.planned_start_datetime
    //           ? row.row.planned_start_datetime?.slice(0, 10)
    //           : ""}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   field: "planned_end_datetime",
    //   headerName: "Planned End",
    //   width: 170,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (row) => {
    //     return (
    //       <span>
    //         {row.row.planned_end_datetime
    //           ? row.row.planned_end_datetime?.slice(0, 10)
    //           : ""}
    //       </span>
    //     );
    //   },
    // },
    {
      field: "priority",
      headerName: "Priority",
      width: 170,
    },
    {
      field: "note",
      headerName: "Note",
      width: 170,
    },

    {
      field: "status",
      headerName: "Status",
      width: 170,

      renderCell: (row: any) => {
        return (
          <Badge
            variant="light"
            // color={badgeColor[`${row.row.job_status?.name as string}`]}
            sx={{
              textTransform: "unset",
              borderRadius: "5px",
              fontSize: "10px",
              padding: "10px",
              height: "35px",
            }}
          >
            {getString(`${row.row.job_status?.name}`)}
          </Badge>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      renderCell: (params: any) => {
        const currentRowId = params.row.id;
        const currentRowName = params.row.name;
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          setDeleteModel(true);
          setDeleteId(currentRowId);
          setDeleteRowName(currentRowName);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Link
              to={`/production/jobs/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>
            <Link
              to={`/production/jobs/form/${currentRowId}`}
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

  const handleClick = () => {
    navigate("/production/jobs/form");
  };

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
      deleteJobs(deleteId);
      setDeleteModel(false);
    }
    return;
  };

  useEffect(() => {
    if (!jobLoading && getjobData) {
      setData(getjobData);
      // dispatch(setJobies(getjobData));
    }
    // [TODO]: letter set status in state => tabs
  }, [jobLoading, getjobData]);

  useEffect(() => {
    if (!jsIsLoading && jobstatus) {
      dispatch(setJobStatus(jobstatus));
    }
  }, [jsIsLoading, jobstatus]);

  // useEffect(() => {
  // }, [jobsSelector]);

  return (
    <>
      <Layout>
        <Box sx={{ padding: "20px 40px" }}>
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
              to="/jobs"
            >
              Job
            </Link>
            <Typography color="#A1A5B7">Overview</Typography>
          </Breadcrumbs>

          <Header
            title="Job Management"
            buttonname="Create New job"
            onClick={handleClick}
          />
          {getjobData && (
            <DataTable rows={data ?? []} columns={columns ?? []} />
          )}
        </Box>
        <DeleteModel
          deleteModel={deleteModel}
          setDeleteModel={setDeleteModel}
          handleCancle={handleCancle}
          handleDelete={handleDelete}
          deleterowName={deleteRowName}
          deleteTitle={"Job"}
        />
      </Layout>
    </>
  );
};

export default Jobs;

export const StatusTabs = ({
  statusTabs,
  jobstatus,
  data,
  setFilterData,
}: {
  statusTabs: string[];
  jobstatus: any[];
  data: any;
  setFilterData: any;
}) => {
  const { Tabs } = useTabs();
  const statusCount: { [key: string]: any } = {};

  const filterJobDataWithActiveTab = (tab: string) => {
    if (tab === "all") {
      setFilterData(data);
    } else {
      let tabid = jobstatus.find((status) => status?.name === tab).id;
      if (tabid)
        setFilterData(data?.filter((job: any) => job?.job_status.id === tabid));
    }
  };
  if (data) {
    // Iterate through the job list and count the status
    data.forEach((job: any) => {
      const statusName = jobstatus.find(
        (status: any) => status.id === job.job_status.id
      )?.name;
      statusCount[statusName] = (statusCount[statusName] || 0) + 1;
      statusCount["all"] = data.length;
    });
  }

  return (
    <Tabs
      tabs={statusTabs}
      filterDataWithActiveTab={filterJobDataWithActiveTab}
      statusCounts={statusCount}
    />
  );
};
