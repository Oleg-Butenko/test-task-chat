import { useSelector } from "react-redux";
import { Chip, Box } from "@mui/material";

const UserBadge = () => {
  const currentLogin = useSelector((state) => state.user.login);

  if (!currentLogin) return null;

  return (
    <Box>
      <Chip label={currentLogin} color="primary" variant="outlined" />
    </Box>
  );
};

export default UserBadge;
