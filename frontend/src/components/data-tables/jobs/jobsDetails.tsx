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

import { useGetJobStatusQuery, useGetJobTypeQuery } from "@/redux/api/jobApi";

const JobDetails = ({
  data,
  handleCreateJob,
  handleEditJob,
  handleDeleteJob,
  isEdit,
}: any) => {
  // call api jobstatus
  const { data: jobstatusdata } = useGetJobStatusQuery(undefined, {});

  // call api jobtype
  const { data: jobtypedata } = useGetJobTypeQuery(undefined, {});
  const [jobstatus, setJobStatus] = useState<any>();
  const [jobtype, setJobType] = useState<any>();

  const handleJobType = (newValue: any) => {
    setJobType(newValue);
  };

  const handleJobStatus = (newValue: any) => {
    setJobStatus(newValue);
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
      },
      {
        accessorKey: "name",
        header: "Name",
        editVariant: "text",
      },
      {
        accessorKey: "customer",
        header: "Customer",
        editVariant: "text",
      },
      {
        accessorKey: "due_date",
        header: "Due Date",
        mantineEditTextInputProps: {
          type: "date",
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        mantineEditTextInputProps: {
          type: "number",
        },
      },
      {
        accessorKey: "job_status",
        header: "Job status",
        editVariant: "select",
        mantineEditSelectProps: {
          data: jobstatusdata?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: jobstatus as any,
          onChange: handleJobStatus,
        },

        Cell: ({ row }) => {
          return <span>{row ? row.original.job_status.name : ""}</span>;
        },
      },

      {
        accessorKey: "job_type",
        header: "Job Type",
        editVariant: "select",
        mantineEditSelectProps: {
          data: jobtypedata?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: jobtype as any,
          onChange: handleJobType,
        },

        Cell: ({ row }) => {
          return <span>{row ? row.original.job_type.name : ""}</span>;
        },
      },
    ],
    [jobstatus, jobtype, handleJobStatus, handleJobType]
  );
  //CREATE action
  const handleCreate: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    exitCreatingMode,
  }) => {
    if (values) {
      handleCreateJob(values);
    }
    exitCreatingMode();
  };

  //UPDATE action
  const handleSave: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    if (values) {
      handleEditJob({ id: values.id, values, jobstatus, jobtype });
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
        handleDeleteJob(row);
      },
    });

  //when click edit button
  const handleEditRow = (row: any) => {
    setJobStatus(row.original.job_status.id);
    setJobType(row.original.job_type.id);
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
            setJobStatus("");
            setJobType("");
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          }}
        >
          Create Job
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

export default JobDetails;
