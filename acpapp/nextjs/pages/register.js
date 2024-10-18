import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CssBaseline,
} from "@mui/material";

export default function AuthPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (registerPassword !== registerConfirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerName,
          email: registerEmail,
          password_hash: registerPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Handle successful registration (e.g., redirect)
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        style={{
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
          margin: 0,
          padding: 0,
          flexDirection: "column",
        }}
      >
        {/* Title in the middle */}
        <Typography
          variant="h3"
          sx={{
            color: "#ff8c00",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          MusicHUB
        </Typography>

        {/* Register Section */}
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={6}
            style={{
              padding: "30px",
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#ff8c00" }}>
              Register
            </Typography>
            <form onSubmit={handleRegisterSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                InputLabelProps={{ style: { color: "#ff8c00" } }}
                InputProps={{
                  style: { color: "#ffffff", backgroundColor: "#333" },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                InputLabelProps={{ style: { color: "#ff8c00" } }}
                InputProps={{
                  style: { color: "#ffffff", backgroundColor: "#333" },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#ff8c00" } }}
                InputProps={{
                  style: { color: "#ffffff", backgroundColor: "#333" },
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#ff8c00" } }}
                InputProps={{
                  style: { color: "#ffffff", backgroundColor: "#333" },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                style={{
                  marginTop: "16px",
                  backgroundColor: "#ff8c00",
                  color: "#ffffff",
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Snackbar for feedback messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
