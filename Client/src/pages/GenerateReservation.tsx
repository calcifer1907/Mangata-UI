import { Box, Slider, Typography, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useContextUser } from "../hooks/useContextUser";

import QRCode from "react-qr-code";

import { formatPrice } from "../generalFunctions/formaters";

import { getMinMax } from "../utils/api/agent";

import { IMinMax } from "../interfaces/IAccompanist";

import { VITE_URL_UI } from "../constant/URL";

const GenerateReservation = () => {
  const [valueSlider, setValueSlider] = useState<number | number[]>(0);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const { userInfo } = useContextUser();
  const { USER_INFO } = userInfo;

  const funcMinMax = useCallback(async () => {
    const { min, max } = await getMinMax.getListData();
    setMinMax({ MIN: Number(min), MAX: Number(max) });
    setValueSlider(Number(max));
  }, []);

  useEffect(() => {
    funcMinMax();
  }, [funcMinMax]);

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
          className="wd-100"
          sx={{
            maxWidth: 300,
            display: "flex",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body2"
              onClick={() => {
                setValueSlider(minmax.MIN);
              }}
              sx={{ cursor: "pointer" }}
            >
              {formatPrice(minmax.MIN)} min
            </Typography>
            <Typography
              variant="body2"
              onClick={() => {
                setValueSlider(minmax.MAX);
              }}
              sx={{ cursor: "pointer" }}
            >
              {formatPrice(minmax.MAX)} max
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
            className="wd-100 hg-100"
            viewBox={`0 0 250 250`}
            value={`${VITE_URL_UI}ReservationEmployee?id=${USER_INFO.ID_EMPLOYEE}&price=${valueSlider}&minPrice=${minmax.MIN}`}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default GenerateReservation;
