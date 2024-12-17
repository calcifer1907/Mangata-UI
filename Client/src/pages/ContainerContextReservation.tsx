/**Hooks */
import ContextAccompanist from "../hooks/useAccompanist";

/**Papages */
import Reservations from "./ReservationEmployee";

const ContainerContextReservation = () => {
  return (
    <ContextAccompanist>
      <Reservations />
    </ContextAccompanist>
  );
};

export default ContainerContextReservation;
