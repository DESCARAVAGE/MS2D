import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import styles from "../manipulateData/addGroup.module.css";
import { Button } from "@mui/material";
import MessageFlashContext from "@/context/MessageFlash";
import { Group } from "@/types/group.type";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GET_All_GROUPS = gql`
  query Query {
    getAllGroups {
      id
      name
      subject
      totalStudents
    }
  }
`;

const CREATE_STUDENT = gql`
  mutation Mutation($student: CreateStudentInputType!) {
    createStudent(Student: $student) {
      lastname
      firstname
    }
  }
`;

export default function ModalFormStudents({ isOpen, onClose }: ModalProps) {
  const router = useRouter();

  const messageFlashCtx = useContext(MessageFlashContext);

  const [isActivate, setIsActivate] = useState(false);

  const [selectName, setSelectName] = useState<{ name: string }>({
    name: "",
  });

  const { data } = useQuery(GET_All_GROUPS, {
    onCompleted: (data: any) => {
      setSelectName(data.getAllGroups[0]);
    },
  });

  const [createStudent] = useMutation(CREATE_STUDENT);

  // Etat qui va enregistrer les valeurs des différents champs du form
  const [dataForm, setDataForm] = useState({
    firstname: "",
    lastname: "",
  });

  // Fonction qui gère les changements des champs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataForm({
      ...dataForm,
      [name]: name.startsWith("number")
        ? value === ""
          ? null
          : parseFloat(value)
        : value,
    });
  };

  // Vérifie si les données entrées sont conformes
  const checkForm = () => {
    const { firstname, lastname } = dataForm;
    if (firstname.trim() !== "" && lastname.trim() !== "") {
      setIsActivate(true);
    } else {
      setIsActivate(false);
    }
  };

  // Vérification si empty et type
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    checkForm();
  };

  // Fonction qui permet de fermer la modal
  const handleClose = () => {
    onClose();
  };

  const handleSuccessNotif = () => {
    messageFlashCtx.success("Student add with success !");
  };

  // Création du group et rechargement de page
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    createStudent({
      variables: {
        student: {
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
          <h2 className="font-poppins">Add Student</h2>
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
                value={dataForm.firstname}
                onChange={handleFormChange}
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
                value={dataForm.lastname}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className=" contents mb-4">
              <select
                name="group"
                onChange={(e) =>
                  setSelectName(
                    data.getAllGroups[parseInt(e.target.value, 10) - 1]
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
            {isActivate ? (
              <Button
                type="submit"
                color="success"
                disabled={!isActivate}
                variant="outlined"
              >
                Créer
              </Button>
            ) : null}
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </dialog>
  );
}
