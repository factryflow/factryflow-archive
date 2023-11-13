import { useEffect, useState } from "react";
import Layout from "../Layout";
import { Box, Stack } from "@mui/material";

import Header from "../../components/table/Header";

import { Badge, Card } from "@mantine/core";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/loading/loading";
import {
  useDeleteDependencyMutation,
  useGetAllDependecyStatusQuery,
  useGetAllDependencyQuery,
} from "@/redux/api/dependencyApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import useTabs from "@/hooks/useTabs";
import DeleteModel from "@/components/table/Model/delete-model";
// import { DependencyResponse } from "@/types/api.types";
import deleteicon from "@/assets/images/delete.svg";
import editicon from "@/assets/images/border_color.svg";
import viewicon from "@/assets/images/visibility.svg";
import { getString } from "@/helpers";

type BadgeType = {
  [key in string]: string;
};
const Dependencys = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteDependency] = useDeleteDependencyMutation();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>("");
  const [deleteRowName, setDeleteRowName] = useState<any>("");

  const dependenciesSelector = useAppSelector(
    (state) => state.dependency.dependencies
  );

  const dependenciesStatusSelector = useAppSelector(
    (state) => state.dependency.dependencyStatus
  );

  const {
    data: getDependencyData,
    isLoading: dependencyIsLoading,
    error,
  } = useGetAllDependencyQuery(undefined);

  // call api jobstatus
  // const { data: dependencystatus, isLoading: dsIsLoading } =
  //   useGetAllDependecyStatusQuery(undefined, {});

  const [data, setData] = useState<Array<any> | []>();

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID" }, // Adjust the width as needed
    {
      field: "external_id",
      headerName: "external_id",
      width: 160,
    },
    {
      field: "name",
      headerName: "name",
      width: 160,
    },

    {
      field: "expected_close_datetime",
      headerName: "Expected Close",
      width: 160, // Adjust the width as needed
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
      width: 160, // Adjust the width as needed
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
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
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
            color={badgeColor[row.row.dependency_status.name]}
            sx={{
              textTransform: "unset",
              borderRadius: "5px",
              fontSize: "10px",
              padding: "10px",
              height: "35px",
            }}
          >
            {getString(row.row.dependency_status?.name)}
          </Badge>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const currentRowId = params.row.id;
        const currentRowName = params.row.name;
        const handleDeleteAction = () => {
          setDeleteModel(true);
          setDeleteId(currentRowId);
          setDeleteRowName(currentRowName);
        };
        return (
          <Stack direction="row" spacing={2}>
            <Link
              to={`/production/dependency/form/${currentRowId}`}
              state={{ viewmode: true }}
            >
              <img src={viewicon} alt="view_Icon" height={17} width={17} />
            </Link>

            <Link
              to={`/production/dependency/form/${currentRowId}`}
              state={{ viewmode: false }}
            >
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
    navigate(`/production/dependency/form`);
  };

  //handle cancle function  in custom delete modal
  const handleCancle = () => {
    setDeleteModel(false);
    if (deleteId) {
      setDeleteId("");
      setDeleteRowName("");
    }
    return;
  };
  //handle delete function  in custom delete modal
  const handleDelete = () => {
    if (deleteId) {
      deleteDependency(deleteId);
      setDeleteModel(false);
      // const newDependencyData = dependenciesSelector.filter(
      //   (item: any) => item.id !== deleteId
      // );
      // dispatch(setDependencies(newDependencyData));
    }
    return;
  };

  // useEffect(() => {
  //   if (!dsIsLoading && dependencystatus) {
  //     dispatch(setDependenciesStatus(dependencystatus));
  //   }
  // }, [dsIsLoading, dependencystatus]);

  useEffect(() => {
    if (!dependencyIsLoading && getDependencyData) {
      setData(getDependencyData);
    }
  }, [dependencyIsLoading, getDependencyData]);
  return (
    <>
      <Layout>
        <Box m="20px">
          <Header
            title="Dependency"
            buttonname="Create New Dependency"
            onClick={handleClick}
          />

          <Box
            m="30px 0 0 0"
            height="500px"
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
              {/* <StatusTabs
                statusTabs={[
                  "all",
                  ...dependenciesStatusSelector?.map(
                    (dependency) => dependency?.name
                  ),
                ]}
                data={dependenciesSelector ?? []}
                statusdata={dependenciesStatusSelector ?? []}
                setFilterData={setData}
              /> */}
              {dependencyIsLoading ? (
                <Loading />
              ) : (
                getDependencyData && (
                  <>
                    <DataGrid
                      className="dataGrid"
                      rows={getDependencyData ?? []}
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
                handleCancle={handleCancle}
                handleDelete={handleDelete}
                deleterowName={deleteRowName}
                deleteTitle={"Dependency"}
              />
            </Card>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Dependencys;

export const StatusTabs = ({
  statusTabs,
  statusdata,
  data,
  setFilterData,
}: {
  statusTabs: string[];
  statusdata: any[];
  data: any;
  setFilterData: any;
}) => {
  // console.log(data, "jhjhjhj");
  const { Tabs } = useTabs();
  const statusCount: { [key: string]: any } = {};

  const filterJobDataWithActiveTab = (tab: string) => {
    if (tab === "all") {
      setFilterData(data);
    } else {
      let tabid = statusdata.find((status: any) => status?.name === tab).id;
      if (tabid)
        setFilterData(
          data.filter(
            (dependancy: any) => dependancy?.dependency_status === tabid
          )
        );
    }
  };
  if (data) {
    // Iterate through the job list and count the status
    data.forEach((dependancy: any) => {
      const statusName = statusdata.find(
        (status: any) => status.id === dependancy.dependency_status
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
