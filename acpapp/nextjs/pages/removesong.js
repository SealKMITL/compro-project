import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, createTheme, ThemeProvider, CssBaseline, FormControl, AppBar, Toolbar } from "@mui/material";
import React, { useState } from "react";

// Dark theme with black and orange
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#000000", // Black background
      paper: "#1e1e1e",   // Dark grey box color for containers
    },
    primary: {
      main: '#ff8c00', // Orange for primary accents (buttons, labels)
    },
    text: {
      primary: "#ffffff",  // White text
      secondary: "#ff8c00", // Orange text for emphasis
    },
  },
});

export default function RemoveSongPage() {
  const [songNameToRemove, setSongNameToRemove] = useState("");
  const [songList, setSongList] = useState([
    { songName: "Song 1", songType: "Pop", language: "English" },
    { songName: "Song 2", songType: "R&B", language: "Mandarin Chinese" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRemoveSong = () => {
    if (!songNameToRemove) {
      setErrorMessage("Please enter a song name to remove.");
      return;
    }

    const filteredSongs = songList.filter((song) => song.songName !== songNameToRemove);
    if (filteredSongs.length === songList.length) {
      setErrorMessage("Song not found.");
      return;
    }

    setSongList(filteredSongs);
    setSongNameToRemove("");
    setErrorMessage("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#1e1e1e' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MusicApp
          </Typography>
          <Button color="inherit" href="/mainpage" sx={{ color: '#ff8c00' }}>
            Back to Main Page
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: "background.default",
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative', // Set relative position for parent
        }}
      >
        {/* Remove Song Input Form and Title in the same box */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: '600px',
          }}
        >
          {/* Title */}
          <Typography variant="h5" gutterBottom sx={{ color: "text.secondary" }}>
            Remove Song
          </Typography>

          {errorMessage && (
            <Box sx={{ color: "red", marginBottom: 2 }}>
              {errorMessage}
            </Box>
          )}

          {/* Input for Song Name to Remove */}
          <FormControl fullWidth>
            <TextField
              label="Song Name"
              variant="outlined"
              value={songNameToRemove}
              onChange={(e) => setSongNameToRemove(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }} // Matches input background color
            />
          </FormControl>

          <Button
            variant="contained"
            onClick={handleRemoveSong}
            fullWidth
            sx={{ backgroundColor: 'primary.main', color: '#fff', '&:hover': { backgroundColor: '#ff9c33' } }}
          >
            Remove Song
          </Button>
        </Box>

        {/* Song List Table */}
        <TableContainer component={Paper} sx={{ marginTop: 4, backgroundColor: "background.paper", width: '100%', maxWidth: '900px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ff8c00' }}>Song Name</TableCell>
                <TableCell sx={{ color: '#ff8c00' }}>Song Type (Genre)</TableCell>
                <TableCell sx={{ color: '#ff8c00' }}>Language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {songList.map((song, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: '#ffffff' }}>{song.songName}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{song.songType}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{song.language}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
