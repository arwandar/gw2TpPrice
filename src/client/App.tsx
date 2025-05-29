import "./App.css";

import { AppBar, Box, Button, IconButton, Menu, Toolbar } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import ApiKeysModal from "./components/ApiKeysModal";
import CurrentOrderModal from "./components/CurrentOrderModal/CurrentOrderModal";
import EfficiencyGenerator from "./pages/EfficiencyGenerator/EfficiencyGenerator";
import GuildTreks from "./pages/GuildTraks/GuildTreks";
import ListingModal from "./components/ListingModal/ListingModal";
import RecipesProcess from "./pages/RecipesProcess/RecipesProcess";
import TpPrices from "./pages/TpPrices/TpPrices";
import { useState } from "react";
import CleanStorage from "./pages/CleanStorage/CleanStorage";

const pages = [
  "TpPrices",
  "RecipesProcess",
  "EfficiencyGenerator",
  "GuildTreks",
  "CleanStorage",
];

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentContent, setCurrentContent] = useState("EfficiencyGenerator");

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
              <ListingModal
                handleOpen={handleClose}
                title="T5"
                isSelling
                idList={[
                  24294, 24341, 24350, 24276, 24356, 24288, 24299, 24282,
                ]}
              />
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div className="app">
        {currentContent === "TpPrices" && <TpPrices />}
        {currentContent === "RecipesProcess" && <RecipesProcess />}
        {currentContent === "EfficiencyGenerator" && <EfficiencyGenerator />}
        {currentContent === "GuildTreks" && <GuildTreks />}
        {currentContent === "CleanStorage" && <CleanStorage />}
      </div>
    </>
  );
}

export default App;
