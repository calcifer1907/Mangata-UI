import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { Icon } from "@iconify/react";

/**Components */
import Calendar from "../../components/Calendar/Calendar";
import DialogPayMents from "../../components/Dialogs/DialogPayMents";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import TextFieldComponent from "../../components/TextField/TextFieldComponent";
import { countries } from "../../constant/Country";

import useReservationBoat from "../../hooks/useReservation/useReservationBoat";

/**Styles */
import "./Boat.scss";

const BoatReservations = () => {
  const { t } = useTranslation("reserve");

  const {
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
    valueRadio,
    minmax,
    setSelectedCountry,
    valueCel,
    valueEmail,
    dateChange,
    setDateChange,
    selectedCountry,
    handleValidHours,
    handleOnChangeName,
    handleOnChengeRadio,
  } = useReservationBoat();

  // Pasos del stepper
  const steps = [
    {
      label: t("dateRental"),
      description: "",
    },
    {
      label: t("selectYourexperience"),
      description: t("selectYourexperienceDescription"),
    },
    {
      label: t("dateAndContactDetails"),
      description: t("selectDateAndContactDetails"),
    },
    {
      label: t("bookingSummary"),
      description: t("checkReservation1"),
    },
  ];

  const handleNextStep = (back = false) => (
    <Box className="d-flex gap-16 justify-content-between">
      {back ? (
        <ButtonComponent
          title={t("back")}
          onClick={handleBack}
          iconName="solar:arrow-left-bold-duotone"
          background="background-gray"
          colorTitle="black"
        />
      ) : (
        <div></div>
      )}
      <ButtonComponent
        title={t("next")}
        onClick={handleNext}
        iconName="solar:arrow-right-bold-duotone"
        background="background-blue-dark"
      />
    </Box>
  );

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
              <Step>
                <StepLabel>{steps[0].label}</StepLabel>
                <StepContent>
                  {/* Selector de fecha */}
                  <Box sx={{ marginBottom: 3, maxWidth: 250 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2B3D5E",
                        marginBottom: 2,
                      }}
                    >
                      {t("selectDatePlaceholder")}
                    </Typography>
                    <Calendar
                      callback={handleChangeDate}
                      where="boatReservation"
                      returnDate={(currenDate: string) => {
                        setDateChange(currenDate);
                      }}
                    />
                  </Box>
                  {handleNextStep()}
                </StepContent>
              </Step>

              <Step>
                <StepLabel>{steps[1].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    {steps[1].description}
                  </Typography>
                  <Box sx={{ marginBottom: 3, maxWidth: 250 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2B3D5E",
                        marginBottom: 2,
                      }}
                    >
                      {t("")}
                    </Typography>
                    <Box>
                      {minmax.map((item) => (
                        <FormControl key={item.description}>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={valueRadio}
                            onChange={handleOnChengeRadio}
                            sx={{ marginBottom: 3 }}
                          >
                            <FormControlLabel
                              value={item.max.toString()}
                              control={<Radio />}
                              label={`${handleFormatPrice(item.max)} - ${t(item.description)}`}
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>
                      ))}
                    </Box>
                  </Box>
                  {handleNextStep(true)}
                </StepContent>
              </Step>

              {/* Paso 3: Fecha y Datos de Contacto */}
              <Step>
                <StepLabel>{steps[2].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    {steps[2].description}
                  </Typography>
                  <Box className="boat-form-container">
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
                          label={t("fullName")}
                          type="text"
                          placeholder={t("fullName")}
                          iconName="user"
                          helperText={t("fieldRequired")}
                        />
                        <TextFieldComponent
                          value={valueEmail}
                          onChange={handleOnChangeEmail}
                          label={t("email")}
                          type="email"
                          placeholder={t("email")}
                          iconName="letter-opened"
                          helperText={t("fieldRequired")}
                        />
                      </Box>
                    </Box>

                    {/* Botón siguiente */}
                    {handleNextStep(true)}
                  </Box>
                </StepContent>
              </Step>

              {/* Paso 2: Resumen y Pago */}
              <Step>
                <StepLabel>{steps[3].label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    {steps[3].description}
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

                      <Box className="d-flex gap-16 align-items-center margin-buttom-16 flex-wrap">
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
                        <Typography variant="body2" sx={{ color: "#666" }}>
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
                        <Typography variant="body2" sx={{ color: "#666" }}>
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
                          {handleFormatPrice(Number(valueRadio))}
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
                          title={t("back")}
                          onClick={handleBack}
                          iconName="solar:arrow-left-bold-duotone"
                          background="background-gray"
                          colorTitle="black"
                        />
                        <ButtonComponent
                          title={t("confirmAndPay")}
                          loading={loading}
                          onClick={handleReservation}
                          iconName="solar:wallet-money-bold-duotone"
                          background="background-harvest-gold"
                        />
                      </Box>
                    </Box>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>{t("payment")}</StepLabel>
                <StepContent>
                  <DialogPayMents
                    amount={Number(valueRadio)}
                    payment_id={Number(CODE_RESERVATION)}
                    name={valueName}
                    email={valueEmail}
                    titleDescription={`${t("paymentFor", "Pago por")} ${valueName} - ${t("boatRental", "Reservar de Bote")}`}
                  />
                </StepContent>
              </Step>
            </Stepper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BoatReservations;
