import { Student } from "@/types/student.type";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  GridValueGetter,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import MessageFlashContext from "@/context/MessageFlash";
import UpdateStudentModal from "../manipulateData/updateStudent";

const GET_STUDENTS_BY_GROUP = gql`
  query Query($groupId: Float!) {
    getStudentsByGroup(groupId: $groupId) {
      id
      lastname
      firstname
    }
  }
`;

const GET_ONE_STUDENT = gql`
  query Query($getOneStudentId: Float!) {
    getOneStudent(id: $getOneStudentId) {
      id
      firstname
      lastname
      group {
        id
        name
        subject
      }
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation Mutation($deleteStudentId: Float!) {
    deleteStudent(id: $deleteStudentId)
  }
`;

function ShowStudentsGroup() {
  const router = useRouter();
  const { id } = router.query;
  const [isPopUp, setIsPopUp] = useState(false);
  const messageFlashCtx = useContext(MessageFlashContext);
  const [students, setStudents] = useState<Student[]>([]);
  const [getStudents, { loading, error }] = useLazyQuery(
    GET_STUDENTS_BY_GROUP,
    {
      variables: {
        groupId: Number(id),
      },
      onCompleted: (data) => {
        setStudents(data.getStudentsByGroup || []);
      },
    }
  );

  const [student, setStudent] = useState<Student | null>(null);
  const [getStudent] = useLazyQuery(GET_ONE_STUDENT, {
    variables: {
      getOneStudentId: Number(id),
    },
    onCompleted: (data: { getOneStudentId: Student }) => {
      setStudent(data.getOneStudentId);
    },
  });

  useEffect(() => {
    if (id) {
      getStudents();
    }
  }, [id]);

  const [deleteStudentRequest] = useMutation(DELETE_STUDENT);
  const handleDeleteClick = (id: GridRowId) => async () => {
    await deleteStudentRequest({
      variables: {
        deleteStudentId: Number(id),
      },
      update: (cache) => {
        cache.modify({
          fields: {
            getAllStudents(existingStudents = []) {
              return existingStudents.filter(
                (studentRef: any) => studentRef.__ref !== `Student:${id}`
              );
            },
          },
        });
      },
    });
    setStudents((prevRows) => prevRows.filter((row) => row.id !== id));
    handleSuccessNotif();
  };

  const openModal = (studentData: Student) => {
    setIsPopUp(true);
    setStudent(studentData);
  };
  const closeModal = () => {
    setIsPopUp(false);
    setStudent(null);
  };

  const handleSuccessNotif = () => {
    messageFlashCtx.success("Student supp with success !");
  };

  const [rows, setRows] = useState(students);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    const editStudent = students.find((student) => student.id === id);
    if (editStudent) {
      openModal(editStudent);
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Firstname", width: 180, editable: true },
    {
      field: "lastname",
      headerName: "Lastname",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={students}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <Box>
        {isPopUp && student ? (
          <UpdateStudentModal
            isOpen={isPopUp}
            onClose={closeModal}
            student={student}
          ></UpdateStudentModal>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default ShowStudentsGroup;
