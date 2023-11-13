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
import { useGetAllJobsQuery } from "@/redux/api/jobApi";
import { toast } from "react-toastify";
import { useGetAllTemplateQuery } from "@/redux/api/templateApi";

const ResourceDetails = ({
  data,
  handleCreateResource,
  handleEditResource,
  handleDeleteResource,
  isEdit,
  viewmode,
}: any) => {
  const { data: getTemplateData, isLoading: templateIsLoading } =
    useGetAllTemplateQuery();

  const [templatelist, setTemplateList] = useState<any>();

  const handleTemplate = (newValue: any) => {
    setTemplateList(newValue);
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
        accessorKey: "weekly_shift_template",
        header: "Template",
        editVariant: "select",
        mantineEditSelectProps: {
          data: getTemplateData?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: templatelist as any,
          onChange: handleTemplate,
        },
        Cell: ({ row }) => {
          return (
            <span>{row ? row.original.weekly_shift_template?.name : ""}</span>
          );
        },
      },
    ],
    [templatelist, handleTemplate]
  );
  //CREATE action
  const handleCreate: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    exitCreatingMode,
  }) => {
    if (values) {
      const responce = await handleCreateResource(values);
      if (!responce.error) exitCreatingMode(); //exit editing mode
      {
        responce.error
          ? toast.error(responce.error.data.message)
          : toast.success("Successfully Resourse  Add");
      }
    }
  };

  //UPDATE action
  const handleSave: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    if (values) {
      const responce = await handleEditResource(values);
      if (!responce.error) table.setEditingRow(null); //exit editing mode
      {
        responce.error
          ? toast.error(responce.error.data.message)
          : toast.success("Successfully Resourse  Update");
      }
    }
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this Task ?",
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDeleteResource(row);
      },
    });

  //when click edit button
  const handleEditRow = (row: any) => {
    setTemplateList(row.original.weekly_shift_template.id);
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
            setTemplateList("");
            table.setCreatingRow(true);
          }}
          disabled={viewmode}
        >
          Create Resource
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

export default ResourceDetails;
