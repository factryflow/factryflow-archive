import React, { useEffect } from "react";
import Layout from "../Layout";
import Header from "@/components/table/Header";
import { Box, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useGetAllTemplateQuery } from "@/redux/api/templateApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setTemplates } from "@/redux/features/templateSlice";
import { useDeleteTemplateMutation } from "@/redux/api/templateApi";
import Loading from "@/components/loading/loading";
import { toast } from "react-toastify";

const Template = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: templateData,
    isLoading: templateIsLoading,
    error: templateError,
  } = useGetAllTemplateQuery();

  const [deleteTemplate] = useDeleteTemplateMutation();

  const templateSelector = useAppSelector((state) => state.template.templates);

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleDeleteAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          if (
            window.confirm("Are you sure you want to remove this Template?")
          ) {
            // return alert(JSON.stringify(currentRow, null, 4));
            deleteTemplate(currentRow?.id);
            const newTemplateData = templateSelector.filter(
              (item: any) => item.id !== currentRow?.id
            );
            dispatch(setTemplates(newTemplateData));
            toast.success("Weekly Template Delete Successfully");
          }
          return;
        };

        const handleEditAction = (e: React.SyntheticEvent<any>) => {
          const currentRow = params.row;
          navigate(`/template/form/${currentRow?.id}`);
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
    if (!templateIsLoading && templateData) {
      dispatch(setTemplates(templateData));
    }
  }, [templateIsLoading, templateData, templateError]);

  return (
    <Layout>
      <Box m="20px">
        <Header title="Template" subtitle="List of Template " />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/template/form">
            <Button variant="contained" startIcon={<AddBoxIcon />}>
              Template
            </Button>
          </Link>
        </Box>

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
          {templateIsLoading ? (
            <Loading />
          ) : (
            templateSelector && (
              <>
                <DataGrid
                  className="dataGrid"
                  rows={templateSelector ?? []}
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
  );
};

export default Template;
