import React, { useState } from "react";
import "./App.css";
import { createStyles, makeStyles } from "@material-ui/core";
import AppHeader from "./components/AppHeader";
import NavDrawer from "./components/NavDrawer";
import ShopCard from "./components/ShopCard";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      // backgroundColor: "#ee7800",
      height: 50,
    },
    main: {
      marginTop: 20,
    },
  })
);

export type Shop = {
  shopName: string;
  shopNameKana: string;
  image: any;
  pr: any;
  shopUrl: string;
};

const App: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  let rows: any;
  const [shops, setShops] = useState<any>();

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(fetchApi);
  };

  const fetchApi = async (position: any) => {
    const res = await fetch(
      `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=a8e3837e9f2439392dc6235ab285541a&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&range=2`
    );
    rows = await res.json();
    setShops(rows);
    console.log(rows.rest[count].name);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const nextShopCard = () => {
    setCount((prevCount) => {
      if (count < shops.rest.length - 1) {
        return prevCount + 1;
      } else {
        return 0;
      }
    });
    console.log(shops.rest[count].name);
    console.log(count);
  };

  return (
    <div className="App">
      <header className={classes.header}>
        <AppHeader
          handleDrawerOpen={handleDrawerOpen}
          getCurrentPosition={getCurrentPosition}
        />
      </header>
      <main className={classes.main}>
        <ShopCard
          shopName={shops?.rest[count].name}
          shopNameKana={shops?.rest[count].name_kana}
          image={shops?.rest[count].image_url.shop_image1}
          pr={shops?.rest[count].pr.pr_short}
          shopUrl={shops?.rest[count].url_mobile}
          nextShopCard={nextShopCard}
        />
      </main>
      <nav>
        <NavDrawer open={open} handleDrawerClose={handleDrawerClose} />
      </nav>
    </div>
  );
};

export default App;
