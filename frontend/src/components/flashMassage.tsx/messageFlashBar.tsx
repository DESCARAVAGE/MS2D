import Alert, { AlertColor } from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import MessageFlashContext from "../../context/MessageFlash";
import { Box } from "@mui/material";

const MessageFlashBar = () => {
  const messageFlashCtx = useContext(MessageFlashContext);

  let alertType: AlertColor | undefined;
  let icon: JSX.Element | null = null;
  switch (messageFlashCtx.messageFlash) {
    case "success":
      alertType = "success";
      icon = <CheckIcon fontSize="inherit" />;
      break;
    case "error":
      alertType = "error";
      icon = <CloseIcon fontSize="inherit" />;
      break;
  }

  return (
    messageFlashCtx.messageFlash !== null && (
      <>
        <Box px={2}>
          <Alert icon={icon} severity={alertType}>
            {messageFlashCtx.messageFlashText}
          </Alert>
        </Box>
      </>
    )
  );
};

export default MessageFlashBar;
