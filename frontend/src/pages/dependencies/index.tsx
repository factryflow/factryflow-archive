import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Box, Button, Stack, useTheme } from "@mui/material";

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
import {
  setDependencies,
  setDependenciesStatus,
} from "@/redux/features/dependencySlice";
import useTabs from "@/hooks/useTabs";
import DeleteModel from "@/components/table/Model/delete-model";
import { DependencyResponse } from "@/types/api.types";
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

  const [data, setData] = useState<Array<DependencyResponse> | []>();

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
      flex: 1,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleDeleteAction = () => {
          const currentRowId = params.row.id;
          setDeleteModel(true);
          setDeleteId(currentRowId);
        };
        const handleEditAction = () => {
          const currentRow = params.row;
          navigate(`/dependency/form/${currentRow?.id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            <img src={viewicon} alt="view_Icon" height={17} width={17} />
            <img
              src={editicon}
              alt="edit_Icon"
              height={17}
              width={17}
              onClick={handleEditAction}
            />
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
    navigate(`/dependency/form`);
  };

  //handle cancle function  in custom delete modal
  const handleCancle = () => {
    setDeleteModel(false);
    if (deleteId) {
      setDeleteId("");
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
            height="auto"
            sx={{
              "& .MuiDataGrid-root": { border: 0 },

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
              "& .MuiCheckbox-root svg": {
                width: 23,
                height: 23,
                backgroundColor: "#F1F1F2",
                border: `0px solid #E1E3EA`,
                borderRadius: 1,
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
              "& .MuiDataGrid-columnHeader:focus-within": {
                outline: "none !important",
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: "15px",
                flexDirection: "row-reverse",
              },
            }}
          >
            <Card withBorder sx={{ padding: "0px !important" }}>
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
                      autoHeight={true}
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
