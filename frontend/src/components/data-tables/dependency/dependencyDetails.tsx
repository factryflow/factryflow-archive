import Loading from "@/components/loading/loading";
import { Box, Stack } from "@mui/material";
import { Badge } from "@mantine/core";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

type BadgeType = {
  [key in string]: string;
};

const DependencyDetails = ({ data }: any) => {
  const navigate = useNavigate();

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "Id" },
    {
      field: "dependency_name",
      headerName: "Dependency Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dependency_type",
      headerName: "Dependency Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "expected_close",
      headerName: "Expected Close",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actual_close",
      headerName: "Actual Close",
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
          Completed: "green",
          "in-progress": "yellow",
        };

        return (
          <Badge
            variant="light"
            color={badgeColor[row.value]}
            sx={{ textTransform: "unset" }}
          >
            {row.value}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <Box
        m="30px 0 0 0"
        height={"auto"}
        width={"95%"}
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
            fontSize: "13px",
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
        {false ? (
          <Loading />
        ) : (
          true && (
            <>
              <DataGrid
                className="dataGrid"
                autoHeight={true}
                rows={data ?? []}
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
                sx={{ m: 1 }}
                // checkboxSelection
                // rows={jobData}
                // columns={columns}
              />
            </>
          )
        )}
      </Box>
    </>
  );
};

export default DependencyDetails;
