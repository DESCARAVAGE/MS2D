import MessageFlashContext from "@/context/MessageFlash";
import { Group } from "@/types/group.type";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";

interface UpdateGroupProps {
  group: Group;
  setGroup: () => void;
}

const UPDATE_ONE_GROUP = gql`
  mutation Mutation($group: UpdateGroupInputType!) {
    updateGroup(Group: $group) {
      id
      name
      subject
    }
  }
`;

const UpdateGroupForm = ({ group, setGroup,  }: UpdateGroupProps) => {
  // const { loading, error, data } =useQuery(GET_ONE_GROUP);
  const [updateGroupRequest] = useMutation(UPDATE_ONE_GROUP);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const router = useRouter();
  const messageFlashCtx = useContext(MessageFlashContext);

  // Vérification si empty et type
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    checkForm();
  };

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

  const [dataForm, setDataForm] = useState({
    name: "",
    subject: "",
  });

  // Vérifie si les données entrées sont conformes
  const checkForm = () => {
    const { name, subject } = dataForm;
    if (name.trim() !== "" && subject.trim() !== "") {
      setIsActivate(true);
    } else {
      setIsActivate(false);
    }
  };

  const updateGroup = async (event: FormEvent) => {
    event.preventDefault();

    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    updateGroupRequest({
      variables: {
        group: {
          id: group.id,
          name: formDataJson.name,
          subject: formDataJson.subject,
        },
      },
      onCompleted: (data: any) => {
        setIsUpdated(true);
        handleSuccessNotif();
        router.push("/groups/");
      },
    });
  };

  const handleSuccessNotif = () => {
    messageFlashCtx.success('Group has been updated');
  }

  // if (loading || !group) return <p>Loading...</p>;
  // if (error) return <p>Error :-(</p>;

  return (
    <>
      <form onSubmit={updateGroup}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Box display={"contents"} >
            <label htmlFor="name" >Name</label>
            <TextField
              variant="outlined"
              type="text "
              id="name"
              name="name"
              label={group.name}
              value={dataForm.name}
              onChange={handleFormChange}
              required
            />
          </Box>
          <Box display={"contents"}>
            <label htmlFor="subject">Subject</label>
            <TextField
              variant="outlined"
              type="text "
              id="subject"
              name="subject"
              label={group.subject}
              value={dataForm.subject}
              onChange={handleFormChange}
              required
            />
          </Box>
          <Box display={"contents"} padding={2}>
            <p>Total student : { group.totalStudents }</p>
          </Box>
          <Box padding={2}>
            {isActivate ? (
              <Button
              type="submit"
              color="success"
              disabled={!isActivate}
              variant="outlined"
            >
              Update
            </Button>
          ) : null}

            
          </Box>
        </Box>
      </form>
    </>
  );
};

export default UpdateGroupForm;
