import { Box, Stack } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Badge, Card } from "@mantine/core";
import Header from "../../components/table/Header";
import Layout from "../Layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setJobies, setJobStatus } from "@/redux/features/jobSlice";
import Loading from "@/components/loading/loading";
import useTabs from "@/hooks/useTabs";
import { getString } from "@/helpers";
import { JobResponse } from "@/types/api.types";
import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";
import {
  useGetAllJobsQuery,
  useDeleteJobsMutation,
  useGetJobStatusQuery,
} from "@/redux/api/jobApi";

type BadgeType = {
  [key in string]: string;
};

type excluded_fields =
  | "planned_start"
  | "planned_end"
  | "is_active"
  | "is_deleted";

interface WithJobResponse extends JobResponse {
  customer: string;
  status?: string;
}

const Jobs = () => {
  const dispatch = useAppDispatch();
  const jobsSelector = useAppSelector((state: any) => state.job.jobies);
  const jobstatusSelector = useAppSelector((state: any) => state.job.jobstatus);
  const [data, setData] = useState<
    Array<Omit<WithJobResponse, excluded_fields>> | []
  >();

  //call api joblist
  const { data: getjobData, isLoading: jobLoading } = useGetAllJobsQuery(
    undefined,
    {}
  );

  // call api jobstatus
  const { data: jobstatus, isLoading: jsIsLoading } = useGetJobStatusQuery(
    undefined,
    {}
  );

  const navigate = useNavigate();
  const [deleteJobs] = useDeleteJobsMutation();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");

  const columns: GridColDef<Omit<WithJobResponse, excluded_fields>>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Job Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "planned_start_datetime",
      headerName: "Planned Start",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        return (
          <span>
            {row.row.planned_start_datetime
              ? row.row.planned_start_datetime?.slice(0, 10)
              : ""}
          </span>
        );
      },
    },
    {
      field: "planned_end_datetime",
      headerName: "Planned End",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        return (
          <span>
            {row.row.planned_end_datetime
              ? row.row.planned_end_datetime?.slice(0, 10)
              : ""}
          </span>
        );
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        const filterjobstatus = jobstatusSelector.filter(
          (job: any) => job.id === row.row.job_status
        );

        const badgeColor: BadgeType = {
          completed: "green",
          "not-planned": "red",
          planned: "violet",
          progress: "yellow",
        };

        return (
          <Badge
            variant="light"
            color={badgeColor[filterjobstatus[0].name]}
            sx={{ textTransform: "unset" }}
          >
            {getString(filterjobstatus[0].name)}
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
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRowId = params.row.id;
          setDeleteModel(true);
          setDeleteId(currentRowId);

          // if (window.confirm("Are you sure you want to remove this Job?")) {
          //   // return alert(JSON.stringify(currentRow, null, 4));
          //   deleteJobs(currentRow?.id);
          //   const newJobiesData = jobsSelector.filter(
          //     (item: any) => item.id !== currentRow?.id
          //   );
          //   dispatch(setJobies(newJobiesData));
          //   toast.success("Job Delete Successfully");
          // }
          // return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/jobs/form/${currentRow?.id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            <img src={viewicon} alt="view_Icon" height={30} width={24} />
            <img
              src={editicon}
              alt="edit_Icon"
              height={30}
              width={24}
              onClick={handleEditAction}
            />
            <img
              src={deleteicon}
              alt="delete_Icon"
              height={30}
              width={24}
              onClick={handleDeleteAction}
            />
            {/*<DeleteIcon onClick={handleDeleteAction} /> */}
          </Stack>
        );
      },
    },
  ];

  const handleClick = () => {
    navigate("/jobs/form");
  };

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
      deleteJobs(deleteId);
      setDeleteModel(false);
      const newJobiesData = jobsSelector.filter(
        (item: any) => item.id !== deleteId
      );
      dispatch(setJobies(newJobiesData));
    }
    return;
  };

  useEffect(() => {
    if (!jobLoading && getjobData) {
      dispatch(setJobies(getjobData));
    }
    // [TODO]: letter set status in state => tabs
  }, [jobLoading, getjobData]);

  useEffect(() => {
    if (!jsIsLoading && jobstatus) {
      dispatch(setJobStatus(jobstatus));
    }
  }, [jsIsLoading, jobstatus]);

  useEffect(() => {
    setData(jobsSelector);
  }, [jobsSelector]);

  return (
    <>
      <Layout>
        <Box>
          <Header
            title="Job Management"
            buttonname="Create New job"
            onClick={handleClick}
          />

          <Box
            m="30px 0 0 0"
            height="auto"
            sx={{
              "& .MuiDataGrid-root": {},

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
              },
              "& .MuiCheckbox-root svg": {
                width: 23,
                height: 23,
                backgroundColor: "#F1F1F2",
                border: `0px solid #E1E3EA`,
                borderRadius: 1,
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
              },
            }}
          >
            <Card withBorder sx={{ padding: "0px !important" }}>
              <StatusTabs
                statusTabs={[
                  "all",
                  ...jobstatusSelector?.map((status: any) => status?.name),
                ]}
                data={jobsSelector ?? []}
                jobstatus={jobstatusSelector}
                setFilterData={setData}
              />
              {jobLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                jobsSelector && (
                  <>
                    <DataGrid
                      className="dataGrid"
                      autoHeight={true}
                      rows={data ?? []}
                      // rows={filterData ?? []}
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
                    />
                  </>
                )
              )}
              <DeleteModel
                deleteModel={deleteModel}
                setDeleteModel={setDeleteModel}
                handleCancle={handleCancle}
                handleDelete={handleDelete}
              />
            </Card>
          </Box>
        </Box>
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
  // console.log(data, "jhjhjhj");
  const { Tabs } = useTabs();
  const statusCount: { [key: string]: any } = {};

  const filterJobDataWithActiveTab = (tab: string) => {
    if (tab === "all") {
      setFilterData(data);
    } else {
      let tabid = jobstatus.find((status) => status.name === tab).id;
      if (tabid)
        setFilterData(data.filter((job: any) => job.job_status === tabid));
    }
  };
  if (data) {
    // Iterate through the job list and count the status
    data.forEach((job: any) => {
      const statusName = jobstatus.find(
        (status: any) => status.id === job.job_status
      ).name;
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
