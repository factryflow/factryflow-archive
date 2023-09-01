import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import Layout from "../Layout";
import { useGetAllJobsQuery } from "../../service/jobApi";
import { useEffect, useState } from "react";
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
  const { data, isLoading, isSuccess } = useGetAllJobsQuery();
  // console.log(jobData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  ];

  useEffect(() => {
    if (isSuccess) {
      setJobData(data);
    }
  });

  return (
    <Layout>
      <Box m="20px">
        <Header title="Jobs" subtitle="List of Jobs " />
        <Box
          m="40px 0 0 0"
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
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          {isLoading ? (
            <>
              <h1>Loading...</h1>
            </>
          ) : (
            jobData && (
              <>
                <DataGrid checkboxSelection rows={jobData} columns={columns} />
              </>
            )
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Jobs;
