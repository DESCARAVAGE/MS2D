import * as React from "react";
import { useState, useContext,forwardRef, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Student } from "@/types/student.type";
import { useRouter } from "next/router";
import UpdateStudentModal from "../manipulateData/updateStudent";
import MessageFlashContext from "@/context/MessageFlash";

const GET_ALL_STUDENTS = gql`
  query Query {
    getAllStudents {
      id
      lastname
      firstname
      group {
        id
        name
        subject
      }
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

export interface StudentTab {
  id: number;
  firstname: string;
  lastname: string;
  group: {
    id: number;
    name: string;
    subject: string;
    totalStudents: number;

  };
  isNew?: boolean;
}

export interface DisplayStudentsTabHandle {
  refetchData: () => void;
}

const DisplayStudentsTab = forwardRef((props, ref) => { 
  const router = useRouter();
  const { id } = router.query;

  const [isPopUp, setIsPopUp] = useState(false);
  const messageFlashCtx = useContext(MessageFlashContext);

  const [students, setStudents] = useState<Student[] | StudentTab[]>([]);
  const { loading, error, refetch } = useQuery(GET_ALL_STUDENTS, {
    onCompleted: (data: any) => {
      setStudents(data?.getAllStudents);
    }
  });

  useImperativeHandle(ref, () => ({
    refetchData() {
      refetch().then(({ data }) => {
        setStudents(data?.getAllStudents);
      });
    }
  }));

  const [student, setStudent] = useState<Student | null>(null);
  const [getStudent] = useLazyQuery(GET_ONE_STUDENT, {
    variables: {
      getOneStudentId: Number(id),
    },
    onCompleted: (data: { getOneStudentId: Student }) => {
      setStudent(data.getOneStudentId)
    }
  });

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
              return existingStudents.filter((studentRef: any) => studentRef.__ref !== `Student:${id}`);
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
    messageFlashCtx.success('Student supp with success !')
  }

  const [rows, setRows] = useState(students);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
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
      field: "group",
      headerName: "Group",
      width: 180,
      editable: true,
      valueGetter: (params: GridValueGetter) => params.name,
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
            <UpdateStudentModal isOpen={isPopUp} onClose={closeModal} student={student} ></UpdateStudentModal>
          ) : (
            ""
          )}
      </Box>
    </Box>
  );
})

export default DisplayStudentsTab;