import NavBar from "@/components/navigation/Navbar";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddGroup from "@/components/manipulateData/addGroup";
import { gql, useQuery } from "@apollo/client";
import { GroupType } from "@/types/group.type";
import { GroupCard } from "@/components/displayData/GroupCard";
import { useRouter } from "next/router";

const GET_ALL_GROUPS = gql`
  query Query {
    getAllGroups {
      id
      name
      subject
    }
  }
`;

function Groups() {
  const router = useRouter();
  const redirectGroups = () => {
    router.push("/groups");
  };

  const [groups, setGroups] = useState<[]>([]);

  const { loading, error } = useQuery(GET_ALL_GROUPS, {
    onCompleted: (data: any) => {
      setGroups(data);
      console.log(data?.getAllGroups)
    },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <NavBar />
      <AddGroup />
      <Box>
        {groups?.map((group: GroupType, i) => (
          <Box padding={2} onClick={redirectGroups} key={i}>
            <GroupCard
              id={group.id}
              name={group.name}
              subject={group.subject}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Groups;
