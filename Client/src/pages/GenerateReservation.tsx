import { Box, Slider, Typography, Container } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**Context */
import { useContextUser } from "../hooks/useContextUser";

/**Libreries */
import QRCode from "react-qr-code";

/**Functions */
import { formatPrice } from "../generalFunctions/formaters";

/**Rest Apis */
import { getMinMax, saveGenerateCode } from "../utils/api/agent";

/**Interfaces */
import { IMinMax } from "../interfaces/IAccompanist";

/*Constant**/
import { VITE_URL_UI } from "../constant/URL";

/**Component */
import ButtonComponent from "../components/Buttons/ButtonComponent";
import { generarCodigoReservaUX2 } from "../generalFunctions/generateCodeReservation";

const GenerateReservation = () => {
  const [valueSlider, setValueSlider] = useState<number | number[]>(0);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const [saveCodeReservation, setSaveCodeReservation] = useState<string>("");
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

  const CODE_RESERVATION = useMemo(() => {
    return generarCodigoReservaUX2();
  }, []);

  const onClickButton = async () => {
    const body = {
      id: userInfo.USER_INFO.ID_EMPLOYEE,
      code: CODE_RESERVATION,
      status: 0,
    };
    const data = await saveGenerateCode(body);
    if (data.status === 201) {
      setSaveCodeReservation(data.code);
      console.log(data);
    }
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
        <Box className="justify-item-end">
          <ButtonComponent
            title="Generar QR"
            background="background-color-button-dark-blue"
            iconName="solar:qr-code-bold-duotone"
            onClick={onClickButton}
          />
        </Box>
        <Box
          className="wd-100"
          sx={{
            maxWidth: 300,
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
            min={minmax.MIN}
            max={minmax.MAX}
            onChange={handleOnChangeSlider}
          />
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
        {saveCodeReservation && (
          <Box
            sx={{
              margin: "0 auto",
              height: "50%",
              width: { xs: "100%", sm: "45%" },
            }}
          >
            <QRCode
              size={256}
              className="wd-100 hg-100"
              viewBox={`0 0 250 250`}
              value={`${VITE_URL_UI}ReservationEmployee?id=${USER_INFO.ID_EMPLOYEE}&price=${valueSlider}&minPrice=${minmax.MIN}`}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GenerateReservation;
