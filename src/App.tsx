import React from "react";
import { Routes, Route } from "react-router-dom";
import LifePathPlannerPage from "./components/LifePlannerPage";
import SettingPage from "./components/SettingsPage";

const App: React.FC = () => {
  console.log('App component rendering');
  return (
    <Routes>
      <Route path="/" element={<LifePathPlannerPage />} />
      <Route path="/settings" element={<SettingPage />} />
    </Routes>
  );
};

export default App;
