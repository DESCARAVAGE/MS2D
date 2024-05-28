import { Group } from "@/types/group.type";
import { Box, Card, CardContent, Typography } from "@mui/material";
import SubjectSharpIcon from "@mui/icons-material/SubjectSharp";
import ContactsSharpIcon from "@mui/icons-material/ContactsSharp";
import { Student } from "@/types/student.type";
import { wrap } from "module";
import Link from "next/link";

function GroupCard({ group }: { group: Group }) {
  // const groups: Group[] = [];
  // const students: Student[] = [];

  // const assignStudentsToGroups = (groups: Group[], students: Student[]) => {
  //   groups.forEach(group => {
  //     group.students = students.filter(student => student.group.id === group.id);
  //     group.totalStudents = group.students.length;
  //   });
  // };

  // assignStudentsToGroups(groups, students);

  return (
    <>
      <Link href={`http://localhost:3000/groups/${group.id}`}
      style={{ textDecoration: "none"}}>
        <Box width={"fit-content"} margin={1}>
          <Card>
            <CardContent>
              <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
                <Typography variant="h5" gutterBottom>
                  {group.name}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"space"}
              >
                <Box display={"flex"} margin={1} mx={4}>
                  <SubjectSharpIcon />
                  <Typography>{group.subject}</Typography>
                </Box>
                <Box display={"flex"} margin={1} mx={4}>
                  <ContactsSharpIcon />
                  <Typography>{group.totalStudents}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Link>
    </>
  );
}

export default GroupCard;
