import React, { useState } from "react";
import "./App.css";
import { createStyles, makeStyles } from "@material-ui/core";
import AppHeader from "./components/AppHeader";
import NavDrawer from "./components/NavDrawer";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      // backgroundColor: "#ee7800",
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <header className={classes.header}>
        <AppHeader handleDrawerOpen={handleDrawerOpen} />
      </header>
      <nav>
        <NavDrawer open={open} handleDrawerClose={handleDrawerClose} />
      </nav>
    </div>
  );
};

export default App;
