import { Box } from "@mui/material";

import "./styleInitialSummary.css";

const InitialSummary = () => {
  return (
    <Box
      className="initial-summary-container"
      sx={{ marginBottom: { xs: 0, md: "250px", lg: "250px" } }}
    >
      <Box className="initial-summary-image">
        <img src="/images/MangataEat.webp" />{" "}
      </Box>
      <Box>
        <h2 className="initial-summary-title">
          Ven y disfruta el caribe colombiano{" "}
        </h2>
        <p className="initial-summary-text">
          Mangata es un beach club y hotel frente al mar ubicado en Isla Grande,
          en el corazón de las Islas del Rosario, a minutos en lancha de
          Cartagena. Nació para quienes buscan algo más que un simple día de
          playa: una experiencia completa en el Caribe colombiano, con buen
          servicio, buena comida y un ambiente relajado pero sofisticado.
        </p>
      </Box>
    </Box>
  );
};

export default InitialSummary;
