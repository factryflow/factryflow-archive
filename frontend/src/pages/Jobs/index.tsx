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

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "../../assets/images/home.svg";

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
  const [data, setData] = useState<Array<WithJobResponse> | []>();

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

  const columns: GridColDef<Omit<WithJobResponse, excluded_fields>>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Job Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
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
    // {
    //   field: "planned_start_datetime",
    //   headerName: "Planned Start",
    //   flex: 1,
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
    //   flex: 1,
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
        const badgeColor: BadgeType = {
          completed: "green",
          "not-planned": "red",
          planned: "violet",
          progress: "yellow",
        };

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
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          setDeleteModel(true);
          setDeleteId(currentRowId);
        };

        return (
          <Stack direction="row" spacing={2}>
            <img src={viewicon} alt="view_Icon" height={17} width={17} />
            <Link to={`/jobs/form/${currentRowId}`}>
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
      // const newJobiesData = jobsSelector.filter(
      //   (item: any) => item.id !== deleteId
      // );
      // dispatch(setJobies(newJobiesData));
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
          <Box
            m="10px 0px 0px 0px"
            height="auto"
            width={"auto"}
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
                flex: "0 0 78%",
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
              {/* <StatusTabs
            statusTabs={[
              "all",
              ...jobstatusSelector?.map((status: any) => status?.name),
            ]}
            data={data ?? []}
            jobstatus={jobstatusSelector}
            setFilterData={setData}
          /> */}
              {jobLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                getjobData && (
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
            </Card>
          </Box>
        </Box>
        <DeleteModel
          deleteModel={deleteModel}
          setDeleteModel={setDeleteModel}
          handleCancle={handleCancle}
          handleDelete={handleDelete}
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
