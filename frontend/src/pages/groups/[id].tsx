import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Group } from "@/types/group.type";
import Link from "next/link";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ConfirmChose from "@/components/confirmeChose";
import UpdateGroupForm from "@/components/manipulateData/updateGroup";
import ShowStudentsGroup from "@/components/displayData/showStudentsGroup";
import MessageFlashContext from "@/context/MessageFlash";

const GET_ONE_GROUP = gql`
  query Query($getOneGroupByIdId: Float!) {
    getOneGroupById(id: $getOneGroupByIdId) {
      id
      name
      subject
      totalStudents
    }
  }
`;

const DELETE_GROUP = gql`
  mutation Mutation($deleteGroupId: Float!) {
    deleteGroup(id: $deleteGroupId)
  }
`;

interface GroupDetailProps {
  onUpdate: () => void;
}

const GroupDetailComponent = () => {
  const router = useRouter();

  const { id } = router.query;

  const messageFlashCtx = useContext(MessageFlashContext);

  const [group, setGroup] = useState<Group | undefined | void>();
  const [getGroup, { loading, error }] = useLazyQuery(GET_ONE_GROUP, {
    variables: {
      getOneGroupByIdId: Number(id),
    },
    onCompleted: (data: { getOneGroupById: Group }) => {
      setGroup(data.getOneGroupById);
    },
  });

  useEffect(() => {
    if (id) {
      getGroup();
    }
  }, [id]);

  const [deleteGroupRequest] = useMutation(DELETE_GROUP);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState(false);

  const deleteGroup = async () => {
    if (confirmed) {
      console.log("suppression côté back");
      deleteGroupRequest({
        variables: {
          deleteGroupId: group?.id,
        },
      });
      setIsDeleted(true);
      handleSuccessNotif();
      router.push("/groups");
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
    deleteGroup();
    
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleSuccessNotif = () => {
    messageFlashCtx.success('Group has been deleted')
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  if (loading || !group) return <p>Loading...</p>;
  if (error) return <p>Error :-(</p>;

  return (
    <>
      <Box padding={3}>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <Grid display={"flex"} justifyContent={"center"} item xs={2}>
            <Link href={"http://localhost:3000/groups/"}>
              <Button variant="outlined">
                <ArrowBackIcon />
              </Button>
            </Link>
          </Grid>
          <Grid display={"flex"} justifyContent={"center"} item xs={8}>
            <Typography variant="h4">{group.name}</Typography>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            item
            xs={2}
          >
            <ConfirmChose onConfirm={handleConfirm} />
            {/* <Button variant="contained" color="error" onClick={deleteGroup}>
              Delete Group
              <DeleteForeverIcon />
            </Button> */}
            {/* <button className="button" onClick={deleteGroup}>
              Supprimer
            </button> */}
          </Grid>
        </Grid>
      </Box>

      <hr className="separator" />

      <Box display={"flex"} justifyContent={"center"}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          <Tab icon={<SettingsIcon />} label="General" {...a11yProps(0)} />
          <Tab icon={<PeopleIcon />} label="Students" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <CustomTabPanel value={value} index={0}>
          <UpdateGroupForm group={group} setGroup={setGroup} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ShowStudentsGroup />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default GroupDetailComponent;
