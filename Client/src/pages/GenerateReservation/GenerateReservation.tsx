import { Box, Slider, Typography, Container } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

/**Context */
import { useContextUser } from "../../hooks/useContextUser";

/**Libreries */
import QRCode from "react-qr-code";

/**Functions */
import { formatPrice } from "../../generalFunctions/formaters";
import { generarCodigoReservaUX2 } from "../../generalFunctions/generateCodeReservation";

/**Rest Apis */
import { getMinMax, saveGenerateCode } from "../../utils/api/agent";

/**Interfaces */
import { IMinMax } from "../../interfaces/IAccompanist";
import { ICodeAgreedPrice } from "../../interfaces/IReservation";

/*Constant**/
import { VITE_URL_UI } from "../../constant/URL";

/**Component */
import ButtonComponent from "../../components/Buttons/ButtonComponent";

/**Styles */
import "./GenerateReservation.scss";

const GenerateReservation = () => {
  const [valueSlider, setValueSlider] = useState<number | number[]>(0);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const [saveCodeReservation, setSaveCodeReservation] =
    useState<ICodeAgreedPrice>({ code: "", agreedPrice: 0 });
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
      setSaveCodeReservation({
        code: data.code,
        agreedPrice: valueSlider as number,
      });
    }
  };

  useEffect(() => {
    const timeClosed = setTimeout(() => {
      setSaveCodeReservation({ code: "", agreedPrice: 0 });
    }, 15000);
    if (timeClosed) return () => clearTimeout(timeClosed);
  }, []);

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
      <Container className="d-flex container-qr justify-content-center">
        <Box className="justify-item-end">
          <ButtonComponent
            title="Generar QR"
            background="background-color-button-dark-blue"
            iconName="solar:qr-code-bold-duotone"
            onClick={onClickButton}
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
        {saveCodeReservation.code && (
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
