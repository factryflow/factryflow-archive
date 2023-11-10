import { Card } from "@mantine/core";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import React from "react";

const DataTable = ({ rows, columns }: any) => {
  return (
    <div>
      <Box
        m="10px 0px 0px 0px"
        height="500px"
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
          ".MuiButtonBase-root-MuiCheckbox-root:hover": {
            backgroundColor: "transparent",
          },
          ".MuiButtonBase-root-MuiIconButton-root:hover": {
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
        <Card
          withBorder
          sx={{
            padding: "0px !important",
            marginTop: 10,
            height: "100%",
            borderRadius: "12px",
            border: "1px solid rgba(225, 227, 234, 0.50)",
          }}
        >
          <>
            <DataGrid
              className="dataGrid"
              rows={rows}
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
        </Card>
      </Box>
    </div>
  );
};

export default DataTable;
