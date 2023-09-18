import { useMemo, useState } from "react";
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
import { useGetAllTemplateQuery } from "@/service/templateApi";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

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
        mantineEditTextInputProps: {
          type: "text",
          required: true,
          error: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
    ],
    [validationErrors]
  );

  //   //call CREATE hook
  //   const { mutateAsync: createUser, isLoading: isCreatingUser } =
  //     useCreateUser();
  //   //call READ hook
  //   const {
  //     data: fetchedUsers = [],
  //     isError: isLoadingUsersError,
  //     isFetching: isFetchingUsers,
  //     isLoading: isLoadingUsers,
  //   } = useGetUsers();
  //   //call UPDATE hook
  //   const { mutateAsync: updateUser, isLoading: isUpdatingUser } =
  //     useUpdateUser();
  //   //call DELETE hook
  //   const { mutateAsync: deleteUser, isLoading: isDeletingUser } =
  //     useDeleteUser();

  const {
    data: templateData,
    isLoading: templateIsLoading,
    isError,
    isFetching,
    error: templateError,
  } = useGetAllTemplateQuery();

  console.log(templateData, "templateData");

  //CREATE action
  const handleCreateUser: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    exitCreatingMode,
  }) => {
    console.log(values);
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    // await createUser(values);
    // exitCreatingMode();
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    console.log(values);
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    // await updateUser(values);
    // table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.firstName}{" "}
          {row.original.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      //   onConfirm: () => deleteUser(row.original.id),
    });

  const table = useMantineReactTable({
    columns,
    data: [],
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      //   isLoading: isLoadingUsers,
      //   isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      //   showAlertBanner: isLoadingUsersError,
      //   showProgressBars: isFetchingUsers,
      isLoading: templateIsLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });

  return <MantineReactTable table={table} />;
};

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app

  <ModalsProvider>
    <Example />
  </ModalsProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: any) {
  return {
    Name: !validateRequired(user.name) ? "First Name is Required" : "",
    // lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    // email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
