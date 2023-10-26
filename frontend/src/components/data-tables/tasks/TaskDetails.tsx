// import Loading from "@/components/loading/loading";
// import { Box, Stack } from "@mui/material";
// import { Badge } from "@mantine/core";
// import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "@/app/hooks";
// import { useEffect, useState } from "react";
// import { getString } from "@/helpers";

// type BadgeType = {
//   [key in string]: string;
// };

// const TaskDetails = ({ data }: any) => {
//   const navigate = useNavigate();
//   const jobIddataSelector = useAppSelector((state: any) => state.job.job);
//   const [taskDetail, setTaskDetails] = useState<any[]>();
//   const columns: GridColDef<any>[] = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Task Name",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "item",
//       headerName: "Item",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "quantity",
//       headerName: "Quantity",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "run_time_per_unit",
//       headerName: "Run Time",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     // {
//     //   field: "planned_start",
//     //   headerName: "Planned Start",
//     //   flex: 1,
//     //   headerAlign: "center",
//     //   align: "center",
//     // },
//     // {
//     //   field: "planned_end",
//     //   headerName: "Planned End",
//     //   flex: 1,
//     //   headerAlign: "center",
//     //   align: "center",
//     // },
//     {
//       field: "task_type",
//       headerName: "Task Type",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (row) => {
//         return <span>{row?.row.task_type.name}</span>;
//       },
//     },
//     {
//       field: "task_status",
//       headerName: "Status",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (row) => {
//         // console.log("🚀 ~ file: index.tsx:78 ~ Jobs ~ param:", row);

//         const badgeColor: BadgeType = {
//           completed: "green",
//           "not-planned": "red",
//           planned: "violet",
//           "in-progress": "yellow",
//         };

//         return (
//           <Badge
//             variant="light"
//             color={badgeColor[`${row.row.task_status?.name as string}`]}
//             sx={{
//               textTransform: "unset",
//               borderRadius: "5px",
//               fontSize: "10px",
//               padding: "10px",
//               height: "35px",
//             }}
//           >
//             {getString(row?.row.task_status.name)}
//           </Badge>
//         );
//       },
//     },
//   ];

//   useEffect(() => {
//     if (jobIddataSelector) {
//       const { tasks } = jobIddataSelector;
//       setTaskDetails(tasks);
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
//             rows={taskDetail ?? []}
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

// export default TaskDetails;

import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMantineReactTable,
} from "mantine-react-table";
import { ActionIcon, Button, Flex, Tooltip } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  useGetTaskStatusQuery,
  useGetTaskTypeQuery,
} from "@/redux/api/taskApi";
import { useGetAllJobsQuery } from "@/redux/api/jobApi";

const TaskDetails = ({
  data,
  handleCreateTask,
  handleEditTask,
  handleDeleteTask,
  jobisenable,
  isEdit,
}: any) => {
  const [taskDetail, setTaskDetails] = useState<any[] | undefined>();
  const jobIddataSelector = useAppSelector((state: any) => state.job.job);
  //task-status
  const { data: taskStatusdata } = useGetTaskStatusQuery();
  //task-type
  const { data: tasktypedata } = useGetTaskTypeQuery();
  const { data: getjobData } = useGetAllJobsQuery();
  const [taskstatus, setTaskStatus] = useState<any>();
  const [tasktype, setTaskType] = useState<any>();
  const [job, setJob] = useState<any>();

  const handlejobChange = (newValue: any) => {
    setJob(newValue);
  };

  const handleTaskTypeChange = (newValue: any) => {
    setTaskType(newValue);
  };

  const handleTaskStatus = (newValue: any) => {
    setTaskStatus(newValue);
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
        accessorKey: "name",
        header: "Name",
        editVariant: "text",
      },
      {
        accessorKey: "external_id",
        header: "External Id",
        editVariant: "text",
      },
      {
        accessorKey: "item",
        header: "Item",
        mantineEditTextInputProps: {
          type: "number",
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        mantineEditTextInputProps: {
          type: "number",
        },
      },
      {
        accessorKey: "setup_time",
        header: "setup time",
        mantineEditTextInputProps: {
          type: "number",
        },
      },
      {
        accessorKey: "teardown_time",
        header: "Teardown Time",
        mantineEditTextInputProps: {
          type: "number",
        },
      },
      {
        accessorKey: "run_time_per_unit",
        header: "Run Time",
        mantineEditTextInputProps: {
          type: "number",
        },
      },
      {
        accessorKey: "job",
        header: "Job",
        enableEditing: jobisenable ? true : false,
        editVariant: "select",
        mantineEditSelectProps: {
          data: getjobData?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: job as any,
          onChange: handlejobChange,
        },

        Cell: ({ row }) => {
          return <span>{row ? row.original.job.name : ""}</span>;
        },
      },
      {
        accessorKey: "task_type",
        header: "Task Type",
        editVariant: "select",
        mantineEditSelectProps: {
          data: tasktypedata?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: tasktype as any,
          onChange: handleTaskTypeChange,
        },

        Cell: ({ row }) => {
          return <span>{row ? row.original.task_type.name : ""}</span>;
        },
      },
      {
        accessorKey: "task_status",
        header: "Task Status",
        editVariant: "select",
        mantineEditSelectProps: {
          data: taskStatusdata?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: taskstatus as any,
          onChange: handleTaskStatus,
        },

        Cell: ({ row }) => {
          return <span>{row ? row.original.task_status.name : ""}</span>;
        },
      },
    ],
    [taskstatus, tasktype, handleTaskStatus, handleTaskTypeChange]
  );
  //CREATE action
  const handleCreate: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    exitCreatingMode,
  }) => {
    if (values) {
      handleCreateTask(values);
    }
    exitCreatingMode();
  };

  //UPDATE action
  const handleSave: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    if (values) {
      handleEditTask({ id: values.id, values, taskstatus, tasktype, job });
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
        handleDeleteTask(row);
      },
    });

  //when click edit button
  const handleEditRow = (row: any) => {
    setTaskStatus(row.original.task_status.id);
    setTaskType(row.original.task_type.id);
    setJob(row.original.job.id);
    table.setEditingRow(row);
  };

  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableColumnActions: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableSorting: true,
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
            <ActionIcon onClick={() => handleEditRow(row)}>
              <IconEdit />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
      ),
    renderTopToolbarCustomActions: ({ table }) =>
      isEdit && (
        <Button
          onClick={() => {
            setTaskStatus("");
            setTaskType("");
            setJob("");
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          }}
        >
          Create task
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

export default TaskDetails;
