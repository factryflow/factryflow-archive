// import Loading from "@/components/loading/loading";
// import { Box, Stack } from "@mui/material";
// import { Badge } from "@mantine/core";
// import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

// import { useNavigate } from "react-router-dom";
// import { getString } from "@/helpers";
// import { useAppSelector } from "@/app/hooks";
// import { useEffect, useState } from "react";

// type BadgeType = {
//   [key in string]: string;
// };

// const DependencyDetails = () => {
//   const navigate = useNavigate();

//   const jobIddataSelector = useAppSelector((state: any) => state.job.job);
//   const [dependency, setDependency] = useState<any[]>();

//   const columns: GridColDef<any>[] = [
//     { field: "id", headerName: "ID" }, // Adjust the width as needed
//     {
//       field: "external_id",
//       headerName: "external_id",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "name",
//       flex: 1,
//     },

//     {
//       field: "expected_close_datetime",
//       headerName: "Expected Close",
//       flex: 1, // Adjust the width as needed
//       renderCell: (row) => {
//         return (
//           <span>
//             {row.row.expected_close_datetime
//               ? row.row.expected_close_datetime?.slice(0, 10)
//               : ""}
//           </span>
//         );
//       },
//     },
//     {
//       field: "actual_close_datetime",
//       headerName: "Actual Close",
//       flex: 1, // Adjust the width as needed
//       renderCell: (row) => {
//         return (
//           <span>
//             {row.row.actual_close_datetime
//               ? row.row.actual_close_datetime?.slice(0, 10)
//               : ""}
//           </span>
//         );
//       },
//     },
//     {
//       field: "notes",
//       headerName: "Notes",
//       flex: 1,
//     },
//     {
//       field: "dependency_status",
//       headerName: "Status",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (row) => {
//         const badgeColor: BadgeType = {
//           completed: "green",
//           "not-planned": "red",
//           planned: "violet",
//           "in-progress": "yellow",
//         };

//         return (
//           <Badge
//             variant="light"
//             color={badgeColor[`${row.row.dependency_status?.name as string}`]}
//             sx={{
//               textTransform: "unset",
//               borderRadius: "5px",
//               fontSize: "10px",
//               padding: "10px",
//               height: "35px",
//             }}
//           >
//             {getString(`${row.row.dependency_status?.name}`)}
//           </Badge>
//         );
//       },
//     },
//   ];

//   useEffect(() => {
//     if (jobIddataSelector) {
//       const { dependencies } = jobIddataSelector;
//       setDependency(dependencies);
//     }
//   }, [jobIddataSelector]);

//   return (
//     <>
//       <Box
//         m="30px 0 0 0"
//         height={"auto"}
//         width={"95%"}
//         sx={{
//           "& .MuiDataGrid-root": {},
//           "& .MuiDataGrid-cell": {
//             // borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: "bold !important",
//           },
//           "& .MuiDataGrid-row": {
//             cursor: "pointer",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#FAFAFA",
//             color: "	#000000",
//             fontSize: "13px",
//             fontWeight: "bold !important",
//             borderTop: "1px solid #F0F0F0",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: "#fff",
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: "#FFFFFF",
//           },
//           "& .MuiCheckbox-root": {
//             color: `1677FF !important`,
//           },
//           ".MuiDataGrid-cell:focus": {
//             outline: "none !important",
//           },
//           ".MuiDataGrid-columnHeader:focus-within": {
//             outline: "none !important",
//           },
//           ".MuiDataGrid-cell:focus-within": {
//             outline: "none !important",
//           },
//           ".MuiDataGrid-toolbarContainer": {
//             padding: "15px",
//             flexDirection: "row-reverse",
//           },
//         }}
//       >
//         {jobIddataSelector && (
//           <DataGrid
//             className="dataGrid"
//             autoHeight={true}
//             rows={dependency ?? []}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 10,
//                 },
//               },
//             }}
//             slots={{ toolbar: GridToolbar }}
//             slotProps={{
//               toolbar: {
//                 showQuickFilter: true,
//                 quickFilterProps: { debounceMs: 500 },
//               },
//             }}
//             pageSizeOptions={[5, 10, 25]}
//             checkboxSelection
//             disableRowSelectionOnClick
//             disableColumnFilter
//             disableColumnMenu
//             disableDensitySelector
//             disableColumnSelector
//             sx={{ m: 1 }}
//             // checkboxSelection
//             // rows={jobData}
//             // columns={columns}
//           />
//         )}
//       </Box>
//     </>
//   );
// };

// export default DependencyDetails;

import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMantineReactTable,
} from "mantine-react-table";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import dayjs from "dayjs";
import { useGetAllDependencyTypeQuery } from "@/redux/api/dependencytypeApi";
import { useGetAllDependecyStatusQuery } from "@/redux/api/dependencyApi";

const DependencyDetails = ({
  data,
  handleCreateDependency,
  handleEditDependency,
  handleDeleteDependency,
  isEdit,
  viewmode,
}: any) => {
  const [dependencystatus, setdependencyStatus] = useState<any>();
  const [dependencyType, setDependencyType] = useState<any>();
  const [expectdate, setexpectedDate] = useState<any>("");
  const [actualdate, setActualDate] = useState<any>("");

  const { data: dependencytypedata } = useGetAllDependencyTypeQuery();
  const { data: dependencystatusdata } =
    useGetAllDependecyStatusQuery(undefined);

  const handleDependencyTypeChange = (newValue: any) => {
    setDependencyType(newValue);
  };

  const handleDependencyStatus = (newValue: any) => {
    setdependencyStatus(newValue);
  };

  const handleExpectDate = (e: any) => {
    e.preventDefault();
    setexpectedDate(e.target.value);
  };

  const handleActualDate = (e: any) => {
    e.preventDefault();
    setActualDate(e.target.value);
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "external_id",
        header: "External Id",
        editVariant: "text",
        size: 80,
      },

      {
        accessorKey: "name",
        header: "Name",
        editVariant: "text",
      },
      {
        accessorKey: "expected_close_datetime",
        header: "Expected Close",

        mantineEditTextInputProps: {
          type: "datetime-local",
          value: expectdate.slice(0, 16) ?? "",
          onChange: (e) => handleExpectDate(e),
        },
        Cell: ({ row }) => {
          return (
            <span>
              {row ? row.original.expected_close_datetime?.slice(0, 10) : ""}
            </span>
          );
        },
      },
      {
        accessorKey: "actual_close_datetime",
        header: "Actual Close",
        mantineEditTextInputProps: {
          type: "datetime-local",
          value: actualdate?.slice(0, 16) ?? "",
          onChange: (e) => handleActualDate(e),
        },

        Cell: ({ row }) => {
          return (
            <span>
              {row ? row.original.actual_close_datetime?.slice(0, 10) : ""}
            </span>
          );
        },
      },
      {
        accessorKey: "notes",
        header: "Notes",
        editVariant: "text",
      },
      {
        accessorKey: "dependency_type",
        header: "Dependency Type",
        editVariant: "select",
        mantineEditSelectProps: {
          data: dependencytypedata?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: dependencyType as any,
          onChange: handleDependencyTypeChange,
        },
        Cell: ({ row }) => {
          return <span>{row ? row.original.dependency_type.name : ""}</span>;
        },
      },
      {
        accessorKey: "dependency_status",
        header: "Dependency Status",
        editVariant: "select",
        mantineEditSelectProps: {
          data: dependencystatusdata?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: dependencystatus as any,
          onChange: handleDependencyStatus,
        },

        Cell: ({ row }) => {
          return <span>{row ? row.original.dependency_status.name : ""}</span>;
        },
      },
    ],
    [
      dependencyType,
      dependencystatus,
      expectdate,
      actualdate,
      handleDependencyTypeChange,
      handleDependencyStatus,
      handleExpectDate,
      handleActualDate,
    ]
  );
  //CREATE action
  const handleCreate: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    exitCreatingMode,
  }) => {
    if (values) {
      handleCreateDependency(values);
      // console.log(requestObj, "requestObj");
    }
    exitCreatingMode();
  };

  //UPDATE action
  const handleSave: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    if (values) {
      handleEditDependency({ id: values?.id, values });
    }
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this Task ?",
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDeleteDependency(row);
      },
    });

  //when click edit button
  const handleEditRow = (row: any) => {
    setdependencyStatus(row.original.dependency_status.id);
    setDependencyType(row.original.dependency_type.id);
    setexpectedDate(row.original.expected_close_datetime);
    setActualDate(row.original.actual_close_datetime);
    table.setEditingRow(row);
  };

  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableSorting: true,
    enableColumnActions: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    initialState: {
      sorting: [{ id: "id", desc: false }],
    },
    getRowId: (row) => row.id,

    mantineTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => {},
    onCreatingRowSave: handleCreate,
    onEditingRowCancel: () => {},
    onEditingRowSave: handleSave,
    renderRowActions: ({ row, table }) =>
      isEdit && (
        <Flex gap="md">
          <Tooltip label="Edit">
            <ActionIcon onClick={() => handleEditRow(row)} disabled={viewmode}>
              <IconEdit />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              onClick={() => openDeleteConfirmModal(row)}
              disabled={viewmode}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
      ),
    renderTopToolbarCustomActions: ({ table }) =>
      isEdit && (
        <Button
          onClick={() => {
            setdependencyStatus("");
            setDependencyType("");
            setexpectedDate("");
            setActualDate("");
            table.setCreatingRow(true);
          }}
          disabled={viewmode}
        >
          Create Dependency
        </Button>
      ),
    state: {
      //   isLoading: isLoadingUsers,
      //   isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      //   showAlertBanner: isLoadingUsersError,
      //   showProgressBars: isFetchingUsers,
      // isSaving:
      //   uptemplateIsLoading || crTempDetaileIsLoading || deleteTempIsLoading,
      // isLoading: templateDetailisLoading || deleteTempIsLoading,
      // showAlertBanner: templateDetailsisError,
      // showProgressBars: templateDetailsIsFetching,
    },
  });

  return (
    <ModalsProvider>
      <MantineReactTable table={table} />
    </ModalsProvider>
  );
};

export default DependencyDetails;
