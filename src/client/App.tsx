import "./App.css";

import { AppBar, Box, Button, IconButton, Menu, Toolbar } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import ApiKeysModal from "./components/ApiKeysModal";
import CurrentOrderModal from "./components/CurrentOrderModal/CurrentOrderModal";
import RecipesProcess from "./pages/RecipesProcess/RecipesProcess";
import TpPrices from "./pages/TpPrices/TpPrices";
import { useState } from "react";

const pages = ["TpPrices", "RecipesProcess"];

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentContent, setCurrentContent] = useState("TpPrices");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" className="app-bar">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentContent(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <ApiKeysModal handleOpen={handleClose} />
              <CurrentOrderModal handleOpen={handleClose} />
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div className="app">
        {currentContent === "TpPrices" && <TpPrices />}
        {currentContent === "RecipesProcess" && <RecipesProcess />}
      </div>
    </>
  );
}

export default App;
