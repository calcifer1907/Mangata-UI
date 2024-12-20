import { Box, Slider, Typography, Container } from "@mui/material";
import { useState } from "react";

import { useContextUser } from "../hooks/useContextUser";

import QRCode from "react-qr-code";

import { formatPrice } from "../generalFunctions/formaters";

const MIN = 290000;
const MAX = 380000;

interface IMinMax {
  MIN: string;
  MAX: string;
}

const GenerateReservation = () => {
  const [valueSlider, setValueSlider] = useState<number | number[]>(MAX);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: "", MAX: "" });
  const { userInfo } = useContextUser();
  const { USER_INFO } = userInfo;

  // const getMinMax =

  const handleOnChangeSlider = (_event: Event, newValue: number | number[]) => {
    setValueSlider(newValue);
  };
  return (
    <Box style={{ position: "relative", top: 64 }}>
      <Box>
        <h2
          style={{
            fontSize: 36,
            color: "#2B3D5E",
            fontWeight: 800,
            marginInlineStart: 24,
          }}
        >
          Generar Reserva
        </h2>
        <Box
          style={{
            backgroundColor: "#2B3D5E",
            height: 6,
            position: "absolute",
            top: 50,
            width: "85%",
            left: 0,
          }}
        />
        <h5
          style={{
            fontSize: 24,
            fontWeight: 300,
            color: "#2B3D5E",
            marginTop: 5,
            marginInlineStart: 24,
          }}
        >
          Precio de venta <span>{formatPrice(valueSlider as number)}</span>
        </h5>
      </Box>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Box
          sx={{
            maxWidth: 300,
            width: "100%",
            display: "flex",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <Slider
            aria-label="Always visible"
            marks
            value={valueSlider}
            step={5000}
            valueLabelDisplay="auto"
            shiftStep={30}
            min={MIN}
            max={MAX}
            onChange={handleOnChangeSlider}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body2"
              onClick={() => {
                setValueSlider(MIN);
              }}
              sx={{ cursor: "pointer" }}
            >
              {formatPrice(MIN)} min
            </Typography>
            <Typography
              variant="body2"
              onClick={() => {
                setValueSlider(MAX);
              }}
              sx={{ cursor: "pointer" }}
            >
              {formatPrice(MAX)} max
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            height: "50%",
            width: { sm: "50%", xs: "65%" },
          }}
        >
          <QRCode
            size={256}
            style={{ width: "100%", height: "100%" }}
            viewBox={`0 0 250 250`}
            value={`http://192.168.0.233:5173/ReservationEmployee/?id=${USER_INFO.ID_EMPLOYEE}&price=${valueSlider}`}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default GenerateReservation;
