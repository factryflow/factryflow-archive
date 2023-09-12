import React from "react";
import Layout from "../Layout";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
const Resources = () => {
  return (
    <Layout>
      <Box m="20px">
        <Header title="Resource" subtitle="List of Resource " />
        <Link to="/tasks/form">
          <Button variant="contained" startIcon={<AddBoxIcon />}>
            Resourse
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
          {false ? (
            <>
              <h3>Loading...</h3>
            </>
          ) : (
            false && (
              <>
                <DataGrid
                  className="dataGrid"
                  rows={[]}
                  columns={[]}
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
  );
};

export default Resources;
