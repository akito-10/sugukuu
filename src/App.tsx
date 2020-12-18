import React, { useState } from "react";
import "./App.css";
import { createStyles, makeStyles } from "@material-ui/core";
import AppHeader from "./components/AppHeader";
import NavDrawer from "./components/NavDrawer";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      // backgroundColor: "#ee7800",
      height: 50,
    },
    main: {},
  })
);

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(fetchApi);
};

const fetchApi = async (position: any) => {
  const res = await fetch(
    `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=a8e3837e9f2439392dc6235ab285541a&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&range=2`
  );
  const rows = await res.json();
  console.log(rows);
};

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
      <main>
        <p onClick={getCurrentPosition}>api</p>
      </main>
      <nav>
        <NavDrawer open={open} handleDrawerClose={handleDrawerClose} />
      </nav>
    </div>
  );
};

export default App;
