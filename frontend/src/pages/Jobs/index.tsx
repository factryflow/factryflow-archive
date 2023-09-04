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
interface JobData {
  id: Number;
  name: string;
  priority: Number;
  due_date: Date;
  customer: string;
  description: string;
}

const Jobs = () => {
  const [jobData, setJobData] = useState<JobData[]>();
  const { data: getjobData, isLoading: jobisLoading } = useGetAllJobsQuery();
  // console.log(jobData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [
    deleteJobs,
    {
      data: deleteJobData,
      error: deleteError,
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
    },
  ] = useDeleteJobsMutation();
  console.log(deleteJobData, "deleteJobData");
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params: any) => {
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;

          if (window.confirm("Are you sure you want to remove this?")) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteJobs(currentRow?.id);
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
      setJobData(getjobData);
    }
  }, [jobisLoading, getjobData]);
  useEffect(() => {
    if (deleteIsSuccess && deleteJobData) {
      deleteJobData.code >= 400
        ? toast.error(deleteJobData.message)
        : toast.success(deleteJobData.message);
    }
  }, [deleteJobData, deleteIsSuccess]);

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
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[500],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[400],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            {jobisLoading ? (
              <>
                <h1>Loading...</h1>
              </>
            ) : (
              jobData && (
                <>
                  <DataGrid
                    className="dataGrid"
                    rows={jobData}
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
