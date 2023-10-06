import { Box, Stack } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { toast } from "react-toastify";
import { Badge, Card } from "@mantine/core";

import Header from "../../components/table/Header";
import Layout from "../Layout";
import { useGetAllJobsQuery, useDeleteJobsMutation } from "@/redux/api/jobApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setJobies } from "@/redux/features/jobSlice";
import Loading from "@/components/loading/loading";
import useTabs from "@/hooks/useTabs";
import { getString } from "@/helpers";
import { JobResponse } from "@/types/api.types";
import jobs from "@/data/jobs.json";
// import { ReactComponent as DeleteIcon } from "@/assets/images/delete.svg";
import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import DeleteModel from "@/components/table/Model/delete-model";

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
  const [data, setData] = useState<
    Array<Omit<WithJobResponse, excluded_fields>> | []
  >([]);
  const dispatch = useAppDispatch();
  const jobsSelector = useAppSelector((state: any) => state.job.jobies);
  const [filterData, setFilterData] = useState<any[]>(jobs);
  // console.log(filterData, "dataaaaaaa");
  const { data: getjobData, isLoading: jobLoading } = useGetAllJobsQuery(
    undefined,
    {}
  );

  const navigate = useNavigate();
  const [deleteJobs] = useDeleteJobsMutation();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);

  const columns: GridColDef<Omit<WithJobResponse, excluded_fields>>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "priority",
      headerName: "Priority Number",
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
      field: "customer",
      headerName: "Customer",
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
        // console.log("🚀 ~ file: index.tsx:78 ~ Jobs ~ param:", row);

        const badgeColor: BadgeType = {
          completed: "green",
          "not-planned": "red",
          planned: "violet",
          progress: "yellow",
        };

        return (
          <Badge
            variant="light"
            color={badgeColor[row.value]}
            sx={{ textTransform: "unset" }}
          >
            {getString(row.value)}
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
        //   const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
        //     const currentRow = params.row;
        //     // setDeleteModel(true);
        //     // if (window.confirm("Are you sure you want to remove this Job?")) {
        //     //   // return alert(JSON.stringify(currentRow, null, 4));
        //     //   deleteJobs(currentRow?.id);
        //     //   const newJobiesData = jobsSelector.filter(
        //     //     (item: any) => item.id !== currentRow?.id
        //     //   );
        //     //   dispatch(setJobies(newJobiesData));
        //     //   toast.success("Job Delete Successfully");
        //     // }
        //     // return;
        //   };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/jobs/form/${currentRow?.id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            {/* <ModeEditOutlinedIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={handleEditAction}
            /> */}

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
              onClick={() => setDeleteModel(true)}
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
  // const setJobDataList = (data: WithJobResponse[]) => {
  //   console.log(data, "setJobDataList");
  //   setData(data);
  // };

  useEffect(() => {
    if (!jobLoading && getjobData) {
      dispatch(setJobies(getjobData));
    }
    // [TODO]: letter set status in state => tabs
  }, [jobLoading, getjobData]);

  useEffect(() => {
    if (jobs.length) {
      setData(jobs as any);
    }
  }, [jobs]);

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
              "& .MuiDataGrid-root": {
                mt: 4,
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
            <Card withBorder>
              <StatusTabs
                statusTabs={[
                  "all",
                  ...new Set(data.map((job: any) => job.status)),
                ]}
                data={data}
                setFilterData={setFilterData}
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
                      rows={jobsSelector ?? []}
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
  data,
  setFilterData,
}: {
  statusTabs: string[];

  data: any;
  setFilterData: any;
}) => {
  const { Tabs } = useTabs();

  const filterJobDataWithActiveTab = (tab: string) => {
    // console.log(tab, "tabssss");
    if (tab === "all") {
      setFilterData(data);
    } else {
      setFilterData(data.filter((job: any) => job.status === tab));
    }
  };

  const statusCounts = data.reduce((acc: any, item: any) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    acc["all"] = (acc["all"] || 0) + 1;
    return acc;
  }, {});

  // console.log(statusCounts, "statusCounts");

  return (
    <Tabs
      tabs={statusTabs}
      filterDataWithActiveTab={filterJobDataWithActiveTab}
      statusCounts={statusCounts}
    />
  );
};
