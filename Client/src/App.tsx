import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Box from "@mui/material/Box";

import ContextUser from "./hooks/useContextUser";

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Reservation from "./pages/Reservations/ContainerContextReservation";
import ListOfCommissionsEmployee from "./pages/Sales/MainCommisionEmployee";
import MainSales from "./pages/Sales/MainSales";
import Logout from "./pages/Logout";
import MyNavbar from "./components/navbar/NavBar";
import GenerateReservation from "./pages/GenerateReservation/GenerateReservation";
import CheckReservation from "./pages/CheckReservation/CheckReservation";
import NotFound from "./pages/NotFound";
import CalendarPage from "./components/Calendar/CalendarPage/CalendarPage";
import DayTrip from "./pages/DayTrip/DayTrip";
import Lodging from "./pages/Lodging/Lodging";
import RoomDetail from "./pages/Lodging/RoomDetail";
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";
import Menu from "./pages/Menu/Menu";
import Boat from "./pages/Boat/Boat";
import BoartReservations from "./pages/Boat/BoatReservations";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton/WhatsAppFloatingButton";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <Router>
      <ContextUser>
        <ScrollToTop />
        <MyNavbar />
        <Box sx={{ flex: 1, position: "relative" }} id="contentPrimary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/Calendar" element={<CalendarPage />} />
            <Route path="/Boat" element={<Boat />} />
            <Route path="/BoatRental" element={<BoartReservations />} />
            <Route
              path="/GenerateReservation"
              element={<GenerateReservation />}
            />
            <Route path="/MangataReservation" element={<Reservation />} />
            <Route path="/DayTrip" element={<DayTrip />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Lodging" element={<Lodging />} />
            <Route path="/Lodging/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/Menu" element={<Menu />} />
            <Route
              path="/MyCommissions"
              element={<ListOfCommissionsEmployee />}
            />
            <Route path="/Reservations" element={<MainSales />} />
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
        <ScrollToTopButton />
        <WhatsAppFloatingButton />
      </ContextUser>
    </Router>
  );
};

export default App;
