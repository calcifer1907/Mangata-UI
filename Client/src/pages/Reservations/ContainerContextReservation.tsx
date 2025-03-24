/**Hooks */
import ContextAccompanist from "../../hooks/useAccompanist";

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
