import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Modal,
  Alert,
  Autocomplete,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { Icon } from "@iconify/react";

/**Components */
import Calendar from "../../components/Calendar/Calendar";
import DialogPayMents from "../../components/Dialogs/DialogPayMents";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import TextFieldComponent from "../../components/TextField/TextFieldComponent";
import { countries } from "../../constant/Country";
import { CountryType } from "../../interfaces/ICountry";

/**Hooks */
import { getAccompanist, getMinMax, methodUser } from "../../utils/api/agent";

/**Interfaces */
import { IMinMax } from "../../interfaces/IAccompanist";

/**Functions */
import { formatPrice } from "../../generalFunctions/formaters";
import { formatDate } from "../../generalFunctions/formatDate";
import { generarCodigoReservaUX2 } from "../../generalFunctions/generateCodeReservation";
import { validEmail } from "../../generalFunctions/generalFunction";
import { addDays } from "date-fns";

/**Styles */
import "./Boat.scss";

const Boat: React.FC = () => {
  const { t } = useTranslation("reserve");

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDialogPayment, setOpenDialogPayment] = useState<boolean>(false);
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

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Cargar precios min/max
        const { min, max } = await getMinMax.getListData("BOAT_RENTAL");
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

  // Validar campos del paso 1 (fecha y contacto)
  const validateStep1 = (): boolean => {
    if (!dateChange || dateChange === formatDate("", "YYYY-MM-DD")) {
      enqueueSnackbar("Por favor, selecciona una fecha.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!valueName || valueName.trim() === "") {
      enqueueSnackbar("El nombre es requerido.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!valueCel || valueCel.trim() === "") {
      enqueueSnackbar("El número de celular es requerido.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!valueEmail || valueEmail.trim() === "" || !validEmail(valueEmail)) {
      enqueueSnackbar("El correo electrónico es requerido y debe ser válido.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }

    if (!selectedCountry) {
      enqueueSnackbar("Por favor, selecciona un país.", {
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

  // Manejar cambio de fecha
  const handleChangeDate = (date: string) => {
    setDateChange(date);
  };

  // Manejar cambio de celular
  const handleOnchangeCel = (value: string) => {
    if (value.length <= 10) setValueCel(value);
  };

  // Manejar cambio de email
  const handleOnChangeEmail = (value: string) => {
    if (value.length < 100) setValueEmail(value);
  };

  const handleOnChangeName = (value: string) => {
    if (value.length < 100) setValueName(value);
  };

  // Crear reserva
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
        ACCOMPANIST: [],
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
        setOpenModal(false);
        setOpenDialogPayment(true);
        // Avanzar al paso de pago si aún no está ahí
        if (activeStep < 1) {
          setActiveStep(1);
        }
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
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

  // Validar horas (no permitir reservas entre 22:00 y 6:00)
  const handleValidHours = useMemo((): boolean => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    return !(currentHours >= 22 || currentHours <= 6);
  }, []);

  // Abrir modal de confirmación
  const handleOpenModal = () => {
    if (validateFields()) {
      setOpenModal(true);
    }
  };

  // Cerrar modal
  const handleClose = () => {
    setOpenModal(false);
  };

  // Manejar siguiente paso
  const handleNext = () => {
    if (activeStep === 0) {
      if (validateStep1()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
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

  // Pasos del stepper
  const steps = [
    {
      label: "Fecha y Datos de Contacto",
      description: "Selecciona la fecha y completa tus datos",
    },
    {
      label: "Resumen y Pago",
      description: "Revisa tu reserva y procede al pago",
    },
  ];

  return (
    <>
      <Box className="boat-container">
        <Box className="boat-content-wrapper">
          {/* Título principal */}
          <Box className="boat-header">
            <Typography
              variant="h4"
              className="boat-title"
              sx={{
                fontWeight: 800,
                color: "#2B3D5E",
                marginBottom: 3,
              }}
            >
              {t("reserveD")} - {t("boatRental")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                marginBottom: 3,
              }}
            >
              {t("completeForm")}
            </Typography>
          </Box>

          {/* Stepper */}
          <Box className="boat-stepper-container">
            <Stepper activeStep={activeStep} orientation="vertical">
              {/* Paso 1: Fecha y Datos de Contacto */}
              <Step>
                <StepLabel>{steps[0].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    {steps[0].description}
                  </Typography>
                  <Box className="boat-form-container">
                    {/* Selector de fecha */}
                    <Box sx={{ marginBottom: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#2B3D5E",
                          marginBottom: 2,
                        }}
                      >
                        {t("date")}
                      </Typography>
                      <Calendar callback={handleChangeDate} />
                    </Box>

                    {/* Información de contacto */}
                    <Box sx={{ marginBottom: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#2B3D5E",
                          marginBottom: 2,
                        }}
                      >
                        {t("contactDetails")}
                      </Typography>
                      <Box className="d-flex gap-16 flex-wrap flex-dirrection-row">
                        <Autocomplete
                          sx={{
                            maxWidth: { lg: 328 },
                            width: "100%",
                          }}
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          value={selectedCountry}
                          onChange={(_, newValue) => {
                            setSelectedCountry(newValue);
                          }}
                          renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                              <Box
                                key={key}
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...optionProps}
                              >
                                <img
                                  loading="lazy"
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  width={20}
                                />
                                {option.label} ({option.code}) +{option.phone}
                              </Box>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              fullWidth
                              helperText={
                                !selectedCountry
                                  ? t("chooseCountryRequired")
                                  : ""
                              }
                              label={t("chooseCountry")}
                              placeholder={t("enterCountry")}
                              error={!selectedCountry}
                              sx={{
                                background: "#FFFFFF",
                                maxWidth: { md: 328, lg: 328 },
                              }}
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <Icon
                                    icon="solar:globus-bold-duotone"
                                    width="24"
                                    height="24"
                                    style={{ color: "#2B3D5E", marginRight: 8 }}
                                  />
                                ),
                              }}
                            />
                          )}
                        />
                        <TextFieldComponent
                          value={valueCel}
                          onChange={handleOnchangeCel}
                          label="Celular"
                          placeholder={t("cellPhone")}
                          type="number"
                          iconName="phone-calling-rounded"
                          helperText={t("fieldRequired")}
                        />
                        <TextFieldComponent
                          value={valueName}
                          onChange={handleOnChangeName}
                          label={t("name")}
                          type="text"
                          placeholder={t("enterName")}
                          iconName="user"
                          helperText={t("fieldRequired")}
                        />
                        <TextFieldComponent
                          value={valueEmail}
                          onChange={handleOnChangeEmail}
                          label={t("email")}
                          type="email"
                          placeholder={t("enterEmail")}
                          iconName="letter-opened"
                          helperText={t("fieldRequired")}
                        />
                      </Box>
                    </Box>

                    {/* Botón siguiente */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                      }}
                    >
                      <ButtonComponent
                        title="Siguiente"
                        onClick={handleNext}
                        iconName="solar:arrow-right-bold-duotone"
                        background="background-harvest-gold"
                      />
                    </Box>
                  </Box>
                </StepContent>
              </Step>

              {/* Paso 2: Resumen y Pago */}
              <Step>
                <StepLabel>{steps[1].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    {steps[1].description}
                  </Typography>
                  <Box className="boat-form-container">
                    {/* Resumen de reserva */}
                    <Box className="boat-summary">
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#2B3D5E",
                          marginBottom: 3,
                        }}
                      >
                        {t("bookingSummary")}
                      </Typography>

                      <Box className="d-flex gap-16 align-items-center margin-buttom-16  flex-wrap">
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          {t("name")}:
                        </Typography>
                        <Typography
                          variant="body1"
                          className="booking-summary-title"
                        >
                          {valueName}
                        </Typography>
                      </Box>

                      <Box className="d-flex gap-16 align-items-center margin-buttom-16 flex-wrap">
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          {t("date")}:
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500 }}
                          className="booking-summary-title"
                        >
                          {dateChange || "No seleccionada"}
                        </Typography>
                      </Box>

                      <Box className="d-flex gap-16 align-items-center margin-buttom-16 flex-wrap">
                        <Typography
                          variant="body2"
                          className="booking-summary-title"
                          sx={{ color: "#666" }}
                        >
                          {t("email")}:
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500 }}
                          className="booking-summary-title"
                        >
                          {valueEmail}
                        </Typography>
                      </Box>

                      <Box className="d-flex gap-16 align-items-center margin-buttom-16 flex-wrap">
                        <Typography
                          variant="body2"
                          sx={{ color: "#666" }}
                          className="booking-summary-title"
                        >
                          {t("telephone")}:
                        </Typography>
                        <Typography
                          variant="body1"
                          className="booking-summary-title"
                        >
                          {selectedCountry
                            ? `+${selectedCountry.phone} ${valueCel}`
                            : valueCel}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          padding: 2,
                          backgroundColor: "#f5f5f5",
                          borderRadius: 2,
                          marginBottom: 3,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", marginBottom: 1 }}
                        >
                          {t("totalPatment")}:
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, color: "#2B3D5E" }}
                        >
                          {handleFormatPrice()}
                        </Typography>
                      </Box>

                      {!handleValidHours && (
                        <Alert severity="warning" sx={{ marginBottom: 2 }}>
                          {t("notReservation")}
                        </Alert>
                      )}

                      {/* Botones de navegación */}
                      <Box className="d-flex gap-16 justify-content-space-between flex-wrap">
                        <ButtonComponent
                          title="Anterior"
                          onClick={handleBack}
                          iconName="solar:arrow-left-bold-duotone"
                          background="background-gray"
                          colorTitle="black"
                        />
                        <ButtonComponent
                          title={
                            loading ? "Reservando..." : "Confirmar y Pagar"
                          }
                          onClick={handleOpenModal}
                          iconName="solar:wallet-money-bold-duotone"
                          background="background-harvest-gold"
                        />
                      </Box>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
        </Box>
      </Box>
      {/* Modal de confirmación */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="confirmation-modal-title"
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#2B3D5E",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            {t("checkReservation")}
          </Typography>

          <Box sx={{ marginBottom: 3 }}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {t("reservationCode")}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {CODE_RESERVATION}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {t("date")}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {dateChange}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <ButtonComponent
              background="background-harvest-gold"
              iconName=""
              onClick={handleReservation}
              title={loading ? `${t("save")}...` : t("confirm")}
            />
            <ButtonComponent
              background="background-gray"
              iconName=""
              onClick={handleClose}
              title={t("cancel")}
              colorTitle="black"
            />
          </Box>
        </Box>
      </Modal>

      {/* Dialog de pago */}
      <DialogPayMents
        open={openDialogPayment}
        setopen={setOpenDialogPayment}
        amount={calculatePrice()}
        payment_id={Number(CODE_RESERVATION)}
        name={valueName}
        email={valueEmail}
      />
    </>
  );
};

export default Boat;
