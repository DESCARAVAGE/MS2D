import { gql, useMutation } from "@apollo/client";
import { FormEvent, useContext, useState } from "react";
import styles from "../manipulateData/addGroup.module.css";
import { Button } from "@mui/material";
import MessageFlashContext from "@/context/MessageFlash";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const CREATE_GROUP = gql`
mutation Mutation($group: CreateGroupInputType!) {
  createGroup(group: $group) {
    name
    subject
    totalStudents
  }
}
`;

export default function ModalFormGroup({ isOpen, onClose, onUpdate }: ModalProps) {

  const messageFlashCtx = useContext(MessageFlashContext);

  const [isActivate, setIsActivate] = useState(false);

  const [createGroup] = useMutation(CREATE_GROUP);

  // Etat qui va enregistrer les valeurs des différents champs du form
  const [dataForm, setDataForm] = useState({
    name: "",
    subject: "",
    totalStudents: null as unknown as number,
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
    const { name, subject } = dataForm;
    if (name.trim() !== "" && subject.trim() !== "" ) {
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
    messageFlashCtx.success('Group add with success !')
  }

  // Création du group et rechargement de page
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    createGroup({
      variables: {
        group: {
          name: formDataJson.name,
          subject: formDataJson.subject,
          totalStudents: parseInt(formDataJson.totalStudents as string),
        },
      },
      onCompleted: () => {
        onClose();
        handleSuccessNotif();
        if (onUpdate) {
          onUpdate();
        }
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
          <h2 className="font-poppins">Add group</h2>
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={submit}>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="name">
                Name :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={dataForm.name}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="subject">
                Subject :
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={dataForm.subject}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
            <div className="contents mb-4">
              <label className="font-poppins" htmlFor="totalStudents">
                Total students :
              </label>
              <input
                type="number"
                id="totalStudents"
                name="totalStudents"
                value={dataForm.totalStudents}
                onChange={handleFormChange}
                className="input"
                
              />
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
