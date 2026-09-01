import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/userSlice";
import { useFormik } from "formik";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "Enter the name";
      } else if (values.username.trim().length < 3) {
        errors.username = "At least 3 symbols";
      }
      return errors;
    },

    onSubmit: (values) => {
      dispatch(setLogin(values.username));
      navigate("/rooms");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "400px",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center">
          Join Chat
        </Typography>

        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <TextField
            id="username"
            name="username"
            label="Name"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <Button type="submit" variant="contained" size="large">
            JOIN CHAT
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
