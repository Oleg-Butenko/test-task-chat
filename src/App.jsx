import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Rooms from "./pages/Rooms/Rooms";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { myTheme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Login />
      {/* <Rooms /> */}
      {/* <Chat /> */}
    </ThemeProvider>
  );
};

export default App;
