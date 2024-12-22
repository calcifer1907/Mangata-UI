import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextUser from "./hooks/useContextUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import ReservationEmployee from "./pages/ContainerContextReservation";
import ListOfCommissionsEmployee from "./pages/ListOfCommissionsEmployee";
import LIstOFCommissionAdmin from "./pages/LIstOfCommissionAdmin";

// import About from './pages/About';
// import Services from './pages/Services';
import MyNavbar from "./components/navbar/NavBar";
import GenerateReservation from "./pages/GenerateReservation";
import Box from "@mui/material/Box";

const App: React.FC = () => {
  return (
    <Router>
      <ContextUser>
        <MyNavbar />
        <Box sx={{ flex: 1, paddingTop: "16px", position: "relative" }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route
              path="/GenerateReservation"
              element={<GenerateReservation />}
            />
            <Route
              path="/ReservationEmployee"
              element={<ReservationEmployee />}
            />
            <Route
              path="/MyCommissions"
              element={<ListOfCommissionsEmployee />}
            />
            <Route path="/Reservations" element={<LIstOFCommissionAdmin />} />

            <Route path="/Login" element={<Login />} />
          </Routes>
        </Box>
      </ContextUser>
    </Router>
  );
};

export default App;
