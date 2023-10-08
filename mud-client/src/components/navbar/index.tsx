import * as React from "react";
import styles from "./NavBar.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  return (
    <Box className={styles["flex-grow"]}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className={styles["flex-grow"]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className={styles["flex-grow"]}
          >
            Multi User Dungeon
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
