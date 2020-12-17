import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <AppHeader />
      </header>
    </div>
  );
};

export default App;
