import { Box, Slider, Typography, Container } from "@mui/material";
import { useEffect } from "react";

/**Libreries */
import QRCode from "react-qr-code";

/**Functions */
import { formatPrice } from "../../generalFunctions/formaters";

/**Hooks */
import useGenerateReservation from "../../hooks/useGenerateReservation";

/*Constant**/
import { VITE_URL_UI } from "../../constant/URL";

/**Component */
import ButtonComponent from "../../components/Buttons/ButtonComponent";

/**Styles */
import "./GenerateReservation.scss";

const GenerateReservation = () => {
  const {
    saveCodeReservation,
    setSaveCodeReservation,
    setValueSlider,
    valueSlider,
    minmax,
    onClickSaveButton,
  } = useGenerateReservation();

  const handleOnChangeSlider = (_event: Event, newValue: number | number[]) => {
    setValueSlider(newValue);
  };

  useEffect(() => {
    const timeClosed = setTimeout(() => {
      setSaveCodeReservation("");
    }, 60000);
    if (timeClosed) return () => clearTimeout(timeClosed);
  }, [setSaveCodeReservation]);

  return (
    <Box className="container-generate-reservation">
      <Box>
        <h2 className="generate-reservation-title">Generar Reserva</h2>
        {/** Esto puede ser un componente */}
        <Box className="background-blue-dark lineHorizontal " />
        <h5 className="color-blue-dark title-generate-sale-price">
          Precio de venta <span>{formatPrice(valueSlider as number)}</span>
        </h5>
      </Box>
      <Container className="d-flex container-qr justify-content-center margin-top-8">
        <Box className="justify-item-end">
          <ButtonComponent
            title="Generar QR"
            background="background-color-button-dark-blue"
            iconName="solar:qr-code-bold-duotone"
            onClick={onClickSaveButton}
          />
        </Box>
        <Box className="wd-100 d-flex  content-value-slider">
          <Slider
            aria-label="Always visible"
            marks
            value={valueSlider}
            step={5000}
            valueLabelDisplay="auto"
            shiftStep={30}
            min={minmax.MIN}
            max={minmax.MAX}
            onChange={handleOnChangeSlider}
          />
          <Box className="d-flex justify-content-between ">
            <Typography
              variant="body2"
              onClick={() => {
                setValueSlider(minmax.MIN);
              }}
              sx={{ cursor: "pointer" }}
            >
              {formatPrice(minmax.MIN)} Min
            </Typography>
            <Typography
              variant="body2"
              onClick={() => {
                setValueSlider(minmax.MAX);
              }}
              sx={{ cursor: "pointer" }}
            >
              {formatPrice(minmax.MAX)} Max
            </Typography>
          </Box>
        </Box>
        {saveCodeReservation && (
          <Box
            className="content-qr"
            sx={{
              width: { xs: "100%", sm: "45%" },
            }}
          >
            <QRCode
              size={256}
              className="wd-100 hg-100"
              viewBox={`0 0 250 250`}
              value={`${VITE_URL_UI}MangataReservation?id=${saveCodeReservation}`}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GenerateReservation;
