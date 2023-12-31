// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import {
//   GridRowsProp,
//   GridRowModesModel,
//   GridRowModes,
//   DataGrid,
//   GridColDef,
//   GridToolbarContainer,
//   GridActionsCellItem,
//   GridEventListener,
//   GridRowId,
//   GridRowModel,
//   GridRowEditStopReasons,
// } from "@mui/x-data-grid";

// const roles = ["Market", "Finance", "Development"];

// interface EditToolbarProps {
//   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//   setRowModesModel: (
//     newModel: (oldModel: GridRowModesModel) => GridRowModesModel
//   ) => void;
// }
// function generateRandomId() {
//   return Math.random().toString(36).substring(2);
// }
// function EditToolbar(props: EditToolbarProps) {
//   const { setRows, setRowModesModel } = props;
//   const id = generateRandomId();
//   const handleClick = () => {
//     setRows((oldRows) => [...oldRows, { name: "", age: "", isNew: true }]);

//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// export default function FullFeaturedCrudGrid() {
//   const [rows, setRows] = React.useState();
//   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
//     {}
//   );

//   const handleRowEditStop: GridEventListener<"rowEditStop"> = (
//     params,
//     event
//   ) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (id: GridRowId) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id: GridRowId) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   const handleDeleteClick = (id: GridRowId) => () => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const handleCancelClick = (id: GridRowId) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow!.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   const processRowUpdate = (newRow: GridRowModel) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const columns: GridColDef[] = [
//     { field: "name", headerName: "Name", width: 180, editable: true },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       width: 80,
//       align: "left",
//       headerAlign: "left",
//       editable: true,
//     },
//     {
//       field: "joinDate",
//       headerName: "Join date",
//       type: "date",
//       width: 180,
//       editable: true,
//     },
//     {
//       field: "role",
//       headerName: "Department",
//       width: 220,
//       editable: true,
//       type: "singleSelect",
//       valueOptions: ["Market", "Finance", "Development"],
//     },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 100,
//       cellClassName: "actions",
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               sx={{
//                 color: "primary.main",
//               }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         height: 500,
//         width: "100%",
//         "& .actions": {
//           color: "text.secondary",
//         },
//         "& .textPrimary": {
//           color: "text.primary",
//         },
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         slots={{
//           toolbar: EditToolbar,
//         }}
//         slotProps={{
//           toolbar: { setRows, setRowModesModel },
//         }}
//       />
//     </Box>
//   );
// }

// import React, { useState } from 'react';

// function TimeCalculator() {
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');

//   function calculateTimeDifference() {
//     const currentDate = new Date();
//     const startDate = new Date(`${currentDate.toISOString().split('T')[0]}T${startTime}`);
//     const endDate = new Date(`${currentDate.toISOString().split('T')[0]}T${endTime}`);

//     if (endDate <= startDate) {
//       alert("End date and time must be after start date and time.");
//       return null;
//     }

//     const diffInMilliseconds = endDate - startDate;
//     const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

//     return diffInHours;
//   }

//   return (
//     <div>
//       <div>
//         <label>Start Time:</label>
//         <input
//           type="time"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>End Time:</label>
//         <input
//           type="time"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//         />
//       </div>
//       <div>
//         <button onClick={() => {
//           const difference = calculateTimeDifference();
//           if (difference !== null) {
//             alert(`Difference in hours: ${difference}`);
//           }
//         }}>
//           Calculate
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TimeCalculator;
