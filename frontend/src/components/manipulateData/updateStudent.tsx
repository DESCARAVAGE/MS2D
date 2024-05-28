import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useContext, useState, useEffect } from "react";
import styles from "../manipulateData/addGroup.module.css";
import { Group } from "@/types/group.type";
import { Button } from "@mui/material";
import MessageFlashContext from "@/context/MessageFlash";
import { Student } from "@/types/student.type";

const GET_ALL_GROUPS = gql`
  query GetAllGroups {
    getAllGroups {
      id
      name
      subject
      totalStudents
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation Mutation($student: UpdateStudentInputType!) {
    updateStudent(student: $student) {
      id
      firstname
      lastname
      group {
        id
      }
    }
  }
`;

interface ModalProps {
  isOpen: boolean;
  student: Student;
  onClose: () => void;
}

export default function UpdateStudentModal({
  student,
  isOpen,
  onClose,
}: ModalProps) {
  const [isActivate, setIsActivate] = useState(false);
  const messageFlashCtx = useContext(MessageFlashContext);
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const [dataForm, setDataForm] = useState({
    firstname: student.firstname || "",
    lastname: student.lastname || "",
  });

  useEffect(() => {
    setDataForm({
      firstname: student.firstname || "",
      lastname: student.lastname || "",
    });
  }, [student]);

  const [selectName, setSelectName] = useState<{ name: string } | null>(null);

  const { data } = useQuery(GET_ALL_GROUPS, {
    onCompleted: (data: any) => {
      const initialGroup = data.getAllGroups.find(
        (group: Group) => group.id === student.group?.id
      );
      setSelectName(initialGroup || null);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    checkForm();
  };

  const checkForm = () => {
    const { firstname, lastname } = dataForm;
    if (firstname.trim() !== "" && lastname.trim() !== "") {
      setIsActivate(true);
    } else {
      setIsActivate(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSuccessNotif = () => {
    messageFlashCtx.success("Student updated !");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    updateStudent({
      variables: {
        student: {
          id: student.id,
          firstname: formDataJson.firstname,
          lastname: formDataJson.lastname,
          group: parseInt(formDataJson.group as string),
        },
      },
      onCompleted: () => {
        onClose();
        handleSuccessNotif();
      },
    });
  };

  return (
    <dialog open={isOpen} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span onClick={handleClose} className={styles.closeModal}>
            &times;
          </span>
          <h2 className="font-poppins">Update Student</h2>
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={submit}>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="firstname">
                Firstname :
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder={student.firstname}
                value={dataForm.firstname}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="lastname">
                Lastname :
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder={student.lastname}
                value={dataForm.lastname}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className=" contents mb-4">
              <label className="font-poppins" htmlFor="group">Group :</label>
              <select
                name="group"
                defaultValue={student.group?.id}
                onChange={(e) =>
                  setSelectName(
                    data.getAllGroups.find(
                      (group: Group) => group.id === parseInt(e.target.value, 10)
                    ) || null
                  )
                }
              >
                {data?.getAllGroups.map((group: Group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            {isActivate && (
              <Button
                type="submit"
                color="success"
                variant="outlined"
              >
                Update
              </Button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}
