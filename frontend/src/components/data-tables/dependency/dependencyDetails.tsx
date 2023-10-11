import Loading from "@/components/loading/loading";
import { Box, Stack } from "@mui/material";
import { Badge } from "@mantine/core";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { getString } from "@/helpers";
import { useAppSelector } from "@/app/hooks";

type BadgeType = {
  [key in string]: string;
};

const DependencyDetails = ({ data }: any) => {
  const navigate = useNavigate();

  const dependenciesSelector = useAppSelector(
    (state) => state.dependency.dependencies
  );

  const dependenciesStatusSelector = useAppSelector(
    (state) => state.dependency.dependencyStatus
  );

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "external_id",
      headerName: "external_id",
      flex: 1,
    },
    {
      field: "name",
      headerName: "name",
      flex: 1,
    },

    {
      field: "expected_close_datetime",
      headerName: "Expected Close",
      flex: 1, // Adjust the width as needed
      renderCell: (row) => {
        return (
          <span>
            {row.row.expected_close_datetime
              ? row.row.expected_close_datetime?.slice(0, 10)
              : ""}
          </span>
        );
      },
    },
    {
      field: "actual_close_datetime",
      headerName: "Actual Close",
      flex: 1, // Adjust the width as needed
      renderCell: (row) => {
        return (
          <span>
            {row.row.actual_close_datetime
              ? row.row.actual_close_datetime?.slice(0, 10)
              : ""}
          </span>
        );
      },
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        const filterjobstatus = dependenciesStatusSelector.filter(
          (dependency: any) => dependency.id === row.row.dependency_status
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
            color={badgeColor[filterjobstatus[0]?.name]}
            sx={{
              textTransform: "unset",
              borderRadius: "5px",
              fontSize: "10px",
              padding: "10px",
              height: "35px",
            }}
          >
            {getString(filterjobstatus[0]?.name)}
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
                rows={dependenciesSelector ?? []}
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
