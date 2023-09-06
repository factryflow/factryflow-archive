import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import Layout from "../Layout";
import {
  useGetAllJobsQuery,
  useDeleteJobsMutation,
} from "../../service/jobApi";
import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setJobies } from "../../features/jobSlice";
interface JobData {
  id: Number;
  name: string;
  priority: Number;
  due_date: Date;
  customer: string;
  description: string;
  note: string;
}

const Jobs = () => {
  const dispatch = useAppDispatch();
  const jobiesSelector = useAppSelector((state) => state.job.jobies);
  // console.log(jobiesSelector, "jobiesSelector");

  const [mount, setMount] = useState(false);

  const {
    data: getjobData,
    isLoading: jobisLoading,
    // refetch,
  } = useGetAllJobsQuery(undefined, {});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [deleteJobs] = useDeleteJobsMutation();

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority Number",
      flex: 1,
    },
    {
      field: "due_date",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params: any) => {
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;

          if (window.confirm("Are you sure you want to remove this Job?")) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteJobs(currentRow?.id);
            const newJobiesData = jobiesSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setJobies(newJobiesData));
            toast.success("Job Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/jobs/form/${currentRow?.id}`);
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
    if (!jobisLoading && getjobData) {
      dispatch(setJobies(getjobData));
    }
  }, [jobisLoading, getjobData]);
  // useEffect(() => {
  //   if (!deleteIsLoading && deleteJobData) {
  //     deleteJobData.code >= 400
  //       ? toast.error(deleteJobData.message)
  //       : toast.success(deleteJobData.message);
  //   }
  // }, [deleteJobData, deleteIsSuccess]);

  // useEffect(() => {
  //   if (mount) {
  //     console.log(`>>> call`);

  //     refetch();
  //   }
  // }, [mount]);

  // useEffect(() => {
  //   setMount(true);

  //   return () => setMount(false);
  // }, []);

  return (
    <>
      <Layout>
        <Box m="20px">
          <Header title="Jobs" subtitle="List of Jobs " />
          <Link to="/jobs/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}>
              Job
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
                fontSize: "14px",
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
            {jobisLoading ? (
              <>
                <h3>Loading...</h3>
              </>
            ) : (
              jobiesSelector && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={jobiesSelector ?? []}
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

export default Jobs;
