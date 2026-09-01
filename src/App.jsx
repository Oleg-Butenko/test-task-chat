import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Rooms from "./pages/Rooms/Rooms";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { myTheme } from "./theme";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/chat/:roomId" element={<Chat />}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
