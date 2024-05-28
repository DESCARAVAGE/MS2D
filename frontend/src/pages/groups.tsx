import NavBar from "@/components/navigation/Navbar";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import AddGroup from "@/components/manipulateData/addGroup";
import { gql, useQuery } from "@apollo/client";
import { Group } from "@/types/group.type";
import GroupCard from "@/components/displayData/GroupCard";
import { useRouter } from "next/router";

const GET_ALL_GROUPS = gql`
  query Query {
    getAllGroups {
      id
      name
      subject
      totalStudents
    }
  }
`;

const Groups = () => {
  const router = useRouter();

  const [groups, setGroups] = useState<[]>([]);

  const { loading, error, refetch } = useQuery(GET_ALL_GROUPS, {
    onCompleted: (data: any) => {
      setGroups(data?.getAllGroups);
    },
  });

  const handleUpdate = () => {
    console.log("handleUpdate called");
    refetch().then(({ data }) => {
      setGroups(data?.getAllGroups);
      console.log("refetch complete", data);
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Box>
      <NavBar />
      <Box px={32}>
        <Box display={"flex"} justifyContent={"end"} mb={2}>
           <AddGroup onUpdate={handleUpdate}  /> 
        </Box>
        <Grid
          container
          spacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
          justifyContent={"center"}
        >
          {groups.map((group: Group, i) => (
            <Box padding={0} key={i}>
              <GroupCard group={group} />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Groups;
