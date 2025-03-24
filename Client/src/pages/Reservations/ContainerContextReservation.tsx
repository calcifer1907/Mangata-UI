/**Hooks */
import ContextAccompanist from "../../hooks/useReservationContext";

/**Pages */
import Reservations from "./Reservations";

const ContainerContextReservation = () => {
  return (
    <ContextAccompanist>
      <Reservations />
    </ContextAccompanist>
  );
};

export default ContainerContextReservation;
