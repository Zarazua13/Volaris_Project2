import { Route, Routes } from "react-router-dom";

import {
  Dashboard,
  Responsives,
  Employees,
  Settings,
  NewResponsive,
  Responsive,
  NotFound,
  Devices,
  UploadResponsives,
  Login,
  SignUp
} from "@/pages";

import { GeneralSettingsPage } from "@/pages/settings/pages/general";
import { ResponsivesSettingsPage } from "@/pages/settings/pages/responsives";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
       <Route path='/signup' element={<SignUp />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="responsives" element={<Responsives />} />
        <Route path="employees" element={<Employees />} />
        <Route path="upload-responsives" element={<UploadResponsives />} />
        <Route path="settings/" element={<Settings />}>
          <Route path="responsives" element={<ResponsivesSettingsPage />} />
          <Route path="general" element={<GeneralSettingsPage />} />
        </Route>
        <Route path="devices" element={<Devices />} />
        <Route path="new-responsive" element={<NewResponsive />} />
        <Route path="responsive/:id" element={<Responsive />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;