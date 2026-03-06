import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccompanist, getMinMax } from "../../utils/api/agent";
import { formatDate } from "../../generalFunctions/formatDate";
import { generarCodigoReservaUX2 } from "../../generalFunctions/generateCodeReservation";
import { useTranslation } from "react-i18next";
import { sanitizeInput, sanitizeEmail } from "../../constant/SanatizedInputs";
import { formatPrice } from "../../generalFunctions/formaters";
import { validEmail } from "../../generalFunctions/generalFunction";
import { IMinMaxResponse } from "../../interfaces/IAccompanist";
import { CountryType } from "../../interfaces/ICountry";

import { messageSnackbar } from "../../generalFunctions/message";

const BOAT_ID = 30;

const useReservationBoat = () => {
  const [minmax, setMinMax] = useState<IMinMaxResponse[]>([
    { min: 0, max: 0, description: "" },
  ]);
  const [valueCel, setValueCel] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valueName, setValueName] = useState<string>("");
  const [dateChange, setDateChange] = useState<string>("");
  const [valueRadio, setValueRadio] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const { t } = useTranslation("reserve");

  // Código de reserva generado
  const CODE_RESERVATION = useMemo(() => {
    return generarCodigoReservaUX2();
  }, []);

  const handleOnChengeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio(event.target.value);
  };

  // Manejar cambio de fecha
  const handleChangeDate = (date: string) => {
    setDateChange(date);
  };

  // Manejar cambio de celular
  const handleOnchangeCel = (value: string) => {
    if (value.length <= 10) setValueCel(sanitizeInput(value));
  };

  // Manejar cambio de email
  const handleOnChangeEmail = (value: string) => {
    if (value.length < 50) setValueEmail(sanitizeEmail(value));
  };

  const handleOnChangeName = (value: string) => {
    if (value.length < 100) setValueName(sanitizeInput(value));
  };

  // Crear reserva

  // Validar horas (no permitir reservas entre 22:00 y 6:00)
  const handleValidHours = useMemo((): boolean => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    return !(currentHours >= 22 || currentHours <= 6);
  }, []);

  // Manejar siguiente paso
  const handleNext = () => {
    if (activeStep === 0 && validDate()) {
      return;
    }

    if (activeStep === 2) {
      if (!validateStep1()) {
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Manejar paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Formatear precio
  const handleFormatPrice = (price: number): string => {
    return formatPrice(Number(price));
  };

  const validDate = (): boolean => {
    if (!dateChange) {
      messageSnackbar(t("requiredDate"), "error");
      return true;
    }
    return false;
  };
  // Validar campos del paso 1 (fecha y contacto)
  const validateStep1 = (): boolean => {
    if (!selectedCountry) {
      messageSnackbar(t("chooseCountryRequired"), "error");

      return false;
    }

    if (!valueCel || valueCel.trim() === "" || !validCelphone()) {
      messageSnackbar(t("celphoneRequired"), "error");

      return false;
    }

    if (!valueName || valueName.trim() === "") {
      messageSnackbar(t("nameRequired"), "error");

      return false;
    }

    if (!valueEmail || valueEmail.trim() === "" || !validEmail(valueEmail)) {
      messageSnackbar(t("emailRequired"), "error");

      return false;
    }

    return true;
  };

  // Validar campos (para compatibilidad)
  const validateFields = (): boolean => {
    return validateStep1();
  };

  const validPrice = useMemo((): boolean => {
    const findPrice = minmax.find((item) => item.max.toString() === valueRadio);
    return !!findPrice && Number(valueRadio) > 0;
  }, [valueRadio]);

  const validCelphone = (): boolean => valueCel.length === 10;

  const handleReservation = async () => {
    setLoading(true);
    if (!validateFields()) {
      setLoading(false);
      return;
    }
    try {
      if (!validPrice) {
        throw new Error("Invalid price");
      }
      if (!validCelphone) {
        messageSnackbar(t("celphoneRequired"), "error");
      } else {
        const body = {
          CODE_RESERVATION,
          ID_EMPLOYEE: BOAT_ID,
          TELEPHONE: `+${selectedCountry?.phone}/${valueCel}`,
          ACCOMPANIST: [
            { name: valueName, lunch: { label: "boat", value: 1 } },
          ],
          EMAIL: valueEmail,
          AGREED_PRICE: valueRadio,
          MIN_PRICE: valueRadio,
          CREATED_AT: dateChange,
          CREATED_ON: formatDate(""),
        };

        const data = await getAccompanist.saveReservation(body);
        if (data.message === "success") {
          messageSnackbar(t("successMessage"), "success");
          // Avanzar al paso de pago si aún no está ahí
          if (activeStep === 3) {
            handleNext();
          }
        }
      }
    } catch {
      messageSnackbar(t("errorMessage"), "error");
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = useCallback(async () => {
    try {
      const response = await getMinMax.getListData("BOAT_RESERVE");
      if (response) {
        setValueRadio(response[0].max.toString());
      }
      setMinMax(response);
    } catch {
      messageSnackbar(t("loadingError"), "error");
    }
  }, []);

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    CODE_RESERVATION,
    handleReservation,
    loading,
    handleOnchangeCel,
    handleOnChangeEmail,
    handleChangeDate,
    handleFormatPrice,
    activeStep,
    handleNext,
    handleBack,
    valueName,
    setSelectedCountry,
    valueCel,
    minmax,
    valueEmail,
    valueRadio,
    dateChange,
    setDateChange,
    selectedCountry,
    handleValidHours,
    handleOnChangeName,
    handleOnChengeRadio,
  };
};

export default useReservationBoat;
