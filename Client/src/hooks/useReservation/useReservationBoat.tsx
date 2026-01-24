import { useEffect, useMemo, useState } from "react";
import { getAccompanist, getMinMax, methodUser } from "../../utils/api/agent";
import { enqueueSnackbar } from "notistack";
import { formatDate } from "../../generalFunctions/formatDate";
import { generarCodigoReservaUX2 } from "../../generalFunctions/generateCodeReservation";
import { addDays } from "date-fns";
import { t } from "i18next";
import { sanitizeInput, sanitizeEmail } from "../../constant/SanatizedInputs";
import { formatPrice } from "../../generalFunctions/formaters";
import { validEmail } from "../../generalFunctions/generalFunction";
import { IMinMax } from "../../interfaces/IAccompanist";
import { CountryType } from "../../interfaces/ICountry";

const useReservationBoat = () => {
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const [valueCel, setValueCel] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valueName, setValueName] = useState<string>("");
  const [dateChange, setDateChange] = useState<string>(
    formatDate(addDays(new Date(), 1), "YYYY-MM-DD")
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [systemUserId, setSystemUserId] = useState<number>(-1);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Código de reserva generado
  const CODE_RESERVATION = useMemo(() => {
    return generarCodigoReservaUX2();
  }, []);

  // Precios
  const PRICES = useMemo(
    () => ({
      PRICE_MAX: minmax.MAX,
      PRICE_MIN: minmax.MIN,
    }),
    [minmax]
  );

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
    if (activeStep === 0) {
      if (validateStep1()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Manejar paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Calcular precio total
  const calculatePrice = (): number => {
    return Number(PRICES.PRICE_MAX);
  };

  // Formatear precio
  const handleFormatPrice = (): string => {
    const newPrice = calculatePrice();
    return formatPrice(newPrice);
  };
  // Validar campos del paso 1 (fecha y contacto)
  const validateStep1 = (): boolean => {
    if (!dateChange || dateChange === formatDate("", "YYYY-MM-DD")) {
      enqueueSnackbar(t("selectDateValid"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!valueName || valueName.trim() === "") {
      enqueueSnackbar(t("nameRequired"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!valueCel || valueCel.trim() === "") {
      enqueueSnackbar(t("celphoneRequired"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!valueEmail || valueEmail.trim() === "" || !validEmail(valueEmail)) {
      enqueueSnackbar(t("emailRequired"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!selectedCountry) {
      enqueueSnackbar(t("chooseCountryRequired"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    return true;
  };

  // Validar campos (para compatibilidad)
  const validateFields = (): boolean => {
    return validateStep1();
  };

  const handleReservation = async () => {
    setLoading(true);
    if (!validateFields()) {
      setLoading(false);
      return;
    }
    try {
      const body = {
        CODE_RESERVATION,
        ID_EMPLOYEE: systemUserId,
        TELEPHONE: `+${selectedCountry?.phone}/${valueCel}`,
        ACCOMPANIST: [{ name: valueName, lunch: { label: "boat", value: 1 } }],
        EMAIL: valueEmail,
        AGREED_PRICE: Number(PRICES.PRICE_MAX),
        MIN_PRICE: Number(PRICES.PRICE_MIN),
        CREATED_AT: dateChange,
        CREATED_ON: formatDate(""),
      };

      const data = await getAccompanist.saveReservation(body);
      if (data.message === "success") {
        enqueueSnackbar("¡Reserva creada exitosamente!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        // Avanzar al paso de pago si aún no está ahí
        if (activeStep === 1) {
          handleNext();
        }
      }
    } catch {
      enqueueSnackbar(
        "Error al crear la reserva. Por favor, intenta nuevamente.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Cargar precios min/max
        const { min, max } = await getMinMax.getListData("DAY_TRIP");
        setMinMax({ MIN: Number(min), MAX: Number(max) });

        // Obtener ID de usuario del sistema
        const resultUserSystem = await methodUser.getUserId({ id: -1 });
        setSystemUserId(resultUserSystem.id);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        enqueueSnackbar(
          "Error al cargar datos. Por favor, recarga la página.",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      }
    };

    loadInitialData();
  }, []);
  return {
    CODE_RESERVATION,
    handleReservation,
    loading,
    handleOnchangeCel,
    handleOnChangeEmail,
    handleChangeDate,
    handleFormatPrice,
    calculatePrice,
    activeStep,
    handleNext,
    handleBack,
    valueName,
    setSelectedCountry,
    valueCel,
    valueEmail,
    dateChange,
    selectedCountry,
    handleValidHours,
    handleOnChangeName,
  };
};

export default useReservationBoat;
