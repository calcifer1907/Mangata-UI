import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";

import ContextUser from "./hooks/useContextUser";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Reservation from "./pages/Reservations/ContainerContextReservation";
import ListOfCommissionsEmployee from "./pages/ListOfCommissionsEmployee";
import LIstOFCommissionAdmin from "./pages/Sales/LIstOfCommissionAdmin";
import Logout from "./pages/Logout";
import MyNavbar from "./components/navbar/NavBar";
import GenerateReservation from "./pages/GenerateReservation/GenerateReservation";
import CheckReservation from "./pages/CheckReservation/CheckReservation";
import NotFound from "./pages/NotFound";
import Calendar from "./components/Calendar/CalendarPage/CalendarPage";

// import PayMenetMethod from "./pages/PayMenetMethod";

const App = () => {
  return (
    <Router>
      <ContextUser>
        <MyNavbar />
        <Box sx={{ flex: 1, position: "relative" }} id="contentPrimary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route
              path="/GenerateReservation"
              element={<GenerateReservation />}
            />
            <Route path="/MangataReservation" element={<Reservation />} />
            <Route
              path="/MyCommissions"
              element={<ListOfCommissionsEmployee />}
            />
            <Route path="/Reservations" element={<LIstOFCommissionAdmin />} />
            <Route path="/check-reservation" element={<CheckReservation />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
            {/* <Route
              path="/PayMenetMethod"
              element={<PayMenetMethod amount={10} payment_id={12} />}
            /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ContextUser>
    </Router>
  );
};

export default App;
