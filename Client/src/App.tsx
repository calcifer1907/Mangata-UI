import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ContextUser from "./hooks/useContextUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import ReservationEmployee from "./pages/ContainerContextReservation";
import ListOfCommissionsEmployee from "./pages/ListOfCommissionsEmployee";
import LIstOFCommissionAdmin from "./pages/LIstOfCommissionAdmin";
import Logout from "./pages/Logout";

import MyNavbar from "./components/navbar/NavBar";
import GenerateReservation from "./pages/GenerateReservation";
import Box from "@mui/material/Box";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <ContextUser>
        <MyNavbar />
        <Box sx={{ flex: 1, position: "relative" }}>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/Logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ContextUser>
    </Router>
  );
};

export default App;
