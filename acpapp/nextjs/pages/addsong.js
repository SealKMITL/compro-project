import { Box, Button, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, createTheme, ThemeProvider, CssBaseline, Select, InputLabel, FormControl, AppBar, Toolbar } from "@mui/material";
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

// List of allowed languages
const allowedLanguages = [
  "Mandarin Chinese", "English", "Spanish", "Portuguese", "Russian", 
  "Hindi", "Japanese", "Arabic", "French", "Thai",
];

// List of allowed genres
const allowedGenres = [
  "Pop", "Hip Hop", "R&B", "Dance", "Classic Rock",
];

// List of allowed keywords
const allowedKeywords = [
  "Joy", "Beauty", "Relaxation", "Sadness", 
  "Dreaminess", "Scariness", "Feeling Pumped Up"
];

export default function AddSongPage() {
  const [songName, setSongName] = useState("");
  const [songType, setSongType] = useState("");
  const [language, setLanguage] = useState("");
  const [keyword, setKeyword] = useState("");  // Added state for keyword
  const [songList, setSongList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddSong = () => {
    if (!songName || !songType || !language || !keyword) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newSong = { songName, songType, language, keyword };
    setSongList([...songList, newSong]);

    setSongName("");
    setSongType("");
    setLanguage("");
    setKeyword("");
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
        }}
      >
        {/* Song Input Form */}
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
            Add Song
          </Typography>

          {errorMessage && (
            <Box sx={{ color: "red", marginBottom: 2 }}>
              {errorMessage}
            </Box>
          )}

          {/* Song Name Input */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel shrink sx={{ color: 'text.secondary' }}>Song Name</InputLabel>
            <TextField
              label="Song Name"
              variant="outlined"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              fullWidth
              InputProps={{ style: { color: '#ffffff', backgroundColor: '#333' } }}
            />
          </FormControl>

          {/* Dropdown for Genre (Song Type) Selection */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel shrink sx={{ color: 'text.secondary' }}>Song Type (Genre)</InputLabel>
            <Select
              value={songType}
              onChange={(e) => setSongType(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
              label="Song Type (Genre)"
            >
              {allowedGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown for Language Selection */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel shrink sx={{ color: 'text.secondary' }}>Language</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
              label="Language"
            >
              {allowedLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown for Keyword Selection */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel shrink sx={{ color: 'text.secondary' }}>Keyword</InputLabel>
            <Select
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              sx={{ backgroundColor: '#333', color: '#fff' }}
              label="Keyword"
            >
              {allowedKeywords.map((kw) => (
                <MenuItem key={kw} value={kw}>
                  {kw}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleAddSong}
            fullWidth
            sx={{ backgroundColor: 'primary.main', color: '#ffffff' }}
          >
            Add Song
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
                <TableCell sx={{ color: '#ff8c00' }}>Keyword</TableCell> {/* Added column for keyword */}
              </TableRow>
            </TableHead>
            <TableBody>
              {songList.map((song, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: '#ffffff' }}>{song.songName}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{song.songType}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{song.language}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{song.keyword}</TableCell> {/* Display keyword */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
