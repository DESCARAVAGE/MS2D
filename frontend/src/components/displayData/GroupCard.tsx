import { Box, Card, CardContent, Typography } from "@mui/material";
import SubjectSharpIcon from '@mui/icons-material/SubjectSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import { GroupType } from "@/types/group.type";

export type GroupCardProps = {
  id: number;
  name: string;
  subject: string;
};

export const GroupCard = ({
  id,
  name,
  subject,
}: GroupCardProps ) => {
  return (
    <>
      <Box width={"fit-content"} margin={1}>
        <Card>
          <CardContent>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h5" gutterBottom>
                {name}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"space"}
            >
              <Box display={"flex"  } margin={1} mx={4}>
                <SubjectSharpIcon />
                <Typography>{subject}</Typography>
              </Box>
              <Box display={"flex" } margin={1} mx={4}>
                <ContactsSharpIcon />
                <Typography>17</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

