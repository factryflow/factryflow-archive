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
import {
  useCreateTemplateDetailsMutation,
  useDeleteTemplateDetailsMutation,
  useGetAllTemplateDetailsQuery,
  useUpdateTemplateDetailsMutation,
} from "@/redux/api/templateDetailsApi";
import { renderToStaticNodeStream } from "react-dom/server";
import { toast } from "react-toastify";

const TemplateDetails = ({
  templateDetailsIsFetching,
  templateDetailsisError,
  templateDetailisLoading,
  templateId,
}: any) => {
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [selectedDayValue, setSelectedDayValue] = useState<any>("");

  console.log(selectedValue, "selectedvalue");
  // Function to handle select change
  const handleSelectChange = (newValue: any) => {
    setSelectedValue(newValue);
  };
  const handleDayChange = (newDay: any) => {
    setSelectedDayValue(newDay);
  };

  const weekDay = [
    { id: 1, day: "Monday" },
    { id: 2, day: "Tuesday" },
    { id: 3, day: "Wednesday" },
    { id: 4, day: "Thursday" },
    { id: 5, day: "Friday" },
    { id: 6, day: "Saturday" },
    { id: 7, day: "Sunday" },
  ];

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const templateDetailsSelector = useAppSelector(
    (state) => state.templatedetail.templateDetails
  );

  const [
    updateTemplateDetails,
    {
      data: upTempDetailsData,
      isLoading: uptemplateIsLoading,
      error: uptempDetailsError,
    },
  ] = useUpdateTemplateDetailsMutation();

  const [
    createTemplateDetails,
    {
      data: crTempDetailedata,
      isLoading: crTempDetaileIsLoading,
      error: crTempDetaileError,
    },
  ] = useCreateTemplateDetailsMutation();

  const [
    deleteTemplateDetails,
    {
      data: deleteTempDetailsData,
      isLoading: deleteTempIsLoading,
      error: deleteTempDetailsError,
    },
  ] = useDeleteTemplateDetailsMutation();

  const templateSelector = useAppSelector((state) => state.template.templates);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "template",
        enableEditing: false,
        header: "Template",
        editVariant: "select",
        mantineEditSelectProps: {
          data: templateSelector.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
          value: selectedValue, // Set the selected value here
          onChange: handleSelectChange,
          // error: validationErrors?.state,
          //remove any previous validation errors when user focuses on the input
          // onFocus: () =>
          //   setValidationErrors({
          //     ...validationErrors,
          //     firstName: undefined,
          //   }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "day_of_week",
        header: "day_of_week",
        editVariant: "select",
        mantineEditSelectProps: {
          data: weekDay.map((item: any) => ({
            value: item.id,
            label: item.day,
          })),
          value: selectedDayValue,
          onChange: handleDayChange,
        },
        Cell: ({ row }) => {
          const selectedDay = weekDay.find(
            (item) => item.id === row.original.day_of_week
          );
          return <span>{selectedDay ? selectedDay.day : ""}</span>;
        },
      },
      {
        accessorKey: "start_time",
        header: "start_time",
        mantineEditTextInputProps: {
          type: "time",
          required: true,
          // error: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          // onFocus: () =>
          //   setValidationErrors({
          //     ...validationErrors,
          //     lastName: undefined,
          //   }),
        },
        Cell: ({ row }) => {
          return <span>{row.original.start_time?.slice(0, 5)}</span>;
        },
      },
      {
        accessorKey: "end_time",
        header: "end_time",
        mantineEditTextInputProps: {
          type: "time",
          required: true,
          // error: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          // onFocus: () =>
          //   setValidationErrors({
          //     ...validationErrors,
          //     lastName: undefined,
          //   }),
        },
        Cell: ({ row }) => {
          return <span>{row.original.end_time?.slice(0, 5)}</span>;
        },
      },
      {
        header: "Duration",
        enableEditing: false,
        mantineEditTextInputProps: {
          type: "time",
          required: true,
          // error: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          // onFocus: () =>
          //   setValidationErrors({
          //     ...validationErrors,
          //     lastName: undefined,
          //   }),
        },
        Cell: ({ row }) => {
          const startTime = row.original.start_time;
          const endTime = row.original.end_time;
          const currentDate = new Date();
          const startDate = new Date(
            `${currentDate.toISOString().split("T")[0]}T${startTime}`
          ) as any;
          const endDate = new Date(
            `${currentDate.toISOString().split("T")[0]}T${endTime}`
          ) as any;
          if (startTime && endTime) {
            const timeDifference = Math.abs(endDate - startDate);
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor(
              (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );

            return <span>{`${hours} hours ${minutes} minutes`}</span>;
          }
        },
      },
    ],
    [
      validationErrors,
      templateSelector,
      selectedValue,
      handleSelectChange,
      handleDayChange,
    ]
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

  // const {
  //   data: templateDetailsr,
  //   isLoading: templateIsLoading,
  //   isError,
  //   isFetching,
  //   error: templateError,
  // } = useGetAllTemplateQuery();

  // console.log(templateData, "templateData");

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
    if (values.start_time && values.end_time) {
      const currentDate = new Date();
      const startDate = new Date(
        `${currentDate.toISOString().split("T")[0]}T${values.start_time}`
      );
      const endDate = new Date(
        `${currentDate.toISOString().split("T")[0]}T${values.end_time}`
      );
      if (endDate <= startDate) {
        alert("End date and time must be after start date and time.");
        return exitCreatingMode();
      } else {
        await createTemplateDetails(values);
        exitCreatingMode();
      }
    }
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<any>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    console.log(values, "edit values");
    if (values) {
      const requesObject = {
        day_of_week: values.day_of_week,
        template: values.template,
        start_time: values.start_time,
        end_time: values.end_time,
      };

      await updateTemplateDetails({ id: values.id, data: requesObject });
      table.setEditingRow(null); //exit editing mode
    }
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});

    // await updateTemplateDetails(values);
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this TempleteDetails ?",
      // children: <Text>Are you sure you want to delete templete Details.</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteTemplateDetails(row.original.id),
    });

  //when click edit button then set setSelectedDayValue
  const handleEditRow = (row: any) => {
    setSelectedDayValue(row.original.day_of_week);
    table.setEditingRow(row);
  };

  const table = useMantineReactTable({
    columns,
    data: templateDetailsSelector ?? [],
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableSorting: true,
    initialState: {
      sorting: [{ id: "day_of_week", desc: false }],
    },
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: templateDetailsisError
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          setSelectedDayValue("");
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New Template details
      </Button>
    ),
    state: {
      //   isLoading: isLoadingUsers,
      //   isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      //   showAlertBanner: isLoadingUsersError,
      //   showProgressBars: isFetchingUsers,
      isSaving:
        uptemplateIsLoading || crTempDetaileIsLoading || deleteTempIsLoading,
      isLoading: templateDetailisLoading || deleteTempIsLoading,
      showAlertBanner: templateDetailsisError,
      showProgressBars: templateDetailsIsFetching,
    },
  });

  useEffect(() => {
    if (!uptemplateIsLoading && upTempDetailsData) {
      upTempDetailsData.code >= 400
        ? toast.error(upTempDetailsData.message)
        : toast.success(upTempDetailsData.message);
    }
  }, [uptemplateIsLoading, uptempDetailsError, upTempDetailsData]);

  useEffect(() => {
    if (!crTempDetaileIsLoading && crTempDetailedata) {
      if (crTempDetailedata.code === 201) {
        toast.success(crTempDetailedata.message);
      }
    }
  }, [crTempDetaileIsLoading, crTempDetaileError, crTempDetailedata]);

  useEffect(() => {
    if (!deleteTempIsLoading && deleteTempDetailsData) {
      if (deleteTempDetailsData.code === 201) {
        toast.success(deleteTempDetailsData.message);
      }
    }
  }, [deleteTempIsLoading, crTempDetaileError, deleteTempDetailsData]);

  return <MantineReactTable table={table} />;
};

const TemplateDetailsProviders = ({
  templateDetailsIsFetching,
  templateDetailsisError,
  templateDetailisLoading,
  templateId,
}: any) => (
  //Put this with your other react-query providers near root of your app

  <ModalsProvider>
    <TemplateDetails
      templateDetailsIsFetching={templateDetailsIsFetching}
      templateDetailsisErrors={templateDetailsisError}
      templateDetailisLoading={templateDetailisLoading}
      templateId={templateId}
    />
  </ModalsProvider>
);

export default TemplateDetailsProviders;

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
