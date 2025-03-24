import React, { useEffect, useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import "./Reservations.scss";

/**Libreries */
import { format } from "@formkit/tempo";
import { Icon } from "@iconify/react";

import { enqueueSnackbar } from "notistack";

/**Components */
import Accompanist from "../../components/Accompanist/Accompanist";
import DialogPayMents from "../../components/Dialogs/DialogPayMents";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import TextFieldComponent from "../../components/TextField/TextFieldComponent";

/**Functions */
import { formatPrice } from "../../generalFunctions/formaters";

/**Hooks */
import { useAccompanist } from "../../hooks/useReservationContext";
import useLogicReservations from "../../hooks/useLogicReservations";

const FORMAT = "DD/MM/YYYY";

const NameLunchForm: React.FC = () => {
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);

  const {
    optionsLunches,
    dateChange,

    errors,
    valueCel,
    valueEmail,
    setValueEmail,
    setValueCel,
    fields,
    setOpenModal,
    openModal,
    openDialogPayment,
    setOpenDialogPayment,
    dataCodeReservation,
  } = useAccompanist();

  const [maxHeight, setMaxHeight] = useState<number>(0);

  const {
    handleReservation,
    PRICES,
    addField,
    CODE_RESERVATION,
    removeField,
    calculatePrice,
    handleFormatPrice,
    handleChange,
    validateFields,
    handleClose,
    handleChangeDate,
  } = useLogicReservations();

  useEffect(() => {
    const body = document.getElementById("root");
    const heightContainer =
      document.getElementById("contentPrimary")?.offsetHeight;
    setMaxHeight(heightContainer || 0);
    body?.style.setProperty("overflow-y", "hidden");
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "16px",
    pt: 2,
    px: 1,
    pb: 3,
  };

  const handleCopy = async () => {
    const code_reserva = document.getElementById("code_reserva");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code_reserva?.textContent || "");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code_reserva?.textContent || "";
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (error) {
      console.log("Error al copiar el codigo de reserva", error);
      enqueueSnackbar(JSON.stringify(error), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <Grid2
      spacing={2}
      container
      className="principalGrid"
      sx={{
        maxHeight: maxHeight - 150,
      }}
    >
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box className="BoxContainer p-relative">
          <Box style={{ marginBottom: 20 }}>
            <Box style={{ marginBottom: 15 }}>
              <Typography className="color-blue-dark title-reservation">
                Reserva tu día {CODE_RESERVATION}
              </Typography>
              <Box className="background-blue-dark containerAsesor p-absolute" />
              {dataCodeReservation && (
                <Typography className="color-blue-dark titleAsesor">
                  Asesor: <span>{dataCodeReservation?.user_name}</span>
                </Typography>
              )}
            </Box>
            <ButtonComponent
              title="Agregar persona"
              onClick={addField}
              iconName="solar:user-plus-bold-duotone"
              background="background-color-button-dark-blue"
            />
          </Box>

          <TextFieldComponent
            dateChange={dateChange}
            onChange={handleChangeDate}
            placeholder="Fecha"
            type="date"
            iconName="solar:calendar-bold-duotone"
            iconColor="color-blue-dark"
          />
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#2B3D5E",
              marginBlock: 2,
            }}
          >
            Datos De Contacto
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Celular"
              variant="filled"
              type="number"
              placeholder="Ingresa tu número de celular"
              fullWidth
              value={valueCel}
              error={valueCel === ""}
              onChange={(e) => {
                if (valueCel.length <= 10) setValueCel(e.target.value);
              }}
              sx={{
                background: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                maxWidth: "328px",
              }}
              helperText={valueCel === "" ? "Este campo es obligatorio" : ""}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="solar:phone-calling-rounded-bold-duotone"
                        width="24"
                        height="24"
                        style={{ color: "#2B3D5E" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Email"
              variant="filled"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              fullWidth
              value={valueEmail}
              error={valueEmail === ""}
              onChange={(e) => {
                if (valueEmail.length <= 50) setValueEmail(e.target.value);
              }}
              sx={{
                background: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                maxWidth: "328px",
              }}
              helperText={valueEmail === "" ? "Este campo es obligatorio" : ""}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="solar:letter-opened-bold-duotone"
                        width="24"
                        height="24"
                        style={{ color: "#2B3D5E" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box>
            {fields.map((field, index) => (
              <Accompanist
                icon={index !== 0}
                title={
                  index === 0 ? "Datos De Reserva" : `Acompañante ${index}`
                }
                key={index}
                index={index}
                field={field}
                errors={errors[index] || { name: false, lunch: false }}
                onChange={handleChange}
                onRemove={removeField}
                lunchOptions={optionsLunches}
              />
            ))}
          </Box>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 1, sm: 1 }}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Box
          style={{
            backgroundColor: "#2B3D5E",
            height: "70%",
            position: "relative",
            top: 100,
            width: 6,
          }}
        />
      </Grid2>
      <Grid2
        component="div"
        size={{ xs: 12, sm: 12, md: 12, lg: 5 }}
        sx={{
          position: {
            xs: "fixed",
            sm: "fixed",
            md: "sticky",
          },
          bottom: { xs: 0, sm: 0, md: "inherit" },
          top: { xs: "inherit", sm: "inherit", md: 0 },
          borderRadius: "16px 16px 0px 0px",
          backgroundColor: {
            xs: "#2B3D5E",
            sm: "#2B3D5E",
            md: "#FFFFFF",
            lg: "#FFFFFF",
          },
          zIndex: 1,
          transform: {
            xs: `translateY(${!isVisibleGrid ? 0 : "calc(100% - 7rem"}))`,
            md: "translateY(0)",
          },
          maxHeight: { xs: 550, sm: 550 },
          transition: "transform 0.2s",
          overflow: "hidden",
          cursor: "pointer",
          width: "100%",
          paddingBottom: 2,
        }}
        onClick={() => setIsVisibleGrid((prev) => !prev)}
      >
        <Box
          sx={{
            backgroundColor: "#D9D9D947",
            width: "35%",
            height: "3px",
            borderRadius: "100px",
            margin: "0 auto",
            marginTop: "6px",
            display: { xs: "block", md: "none" },
          }}
        />

        <Box style={{ width: "100%", textAlign: "center", height: "24px" }}>
          <Icon
            icon={`solar:alt-arrow-${
              isVisibleGrid ? "down" : "up"
            }-bold-duotone`}
            width="24"
            height="24"
            style={{ color: "#FFFFFF" }}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: "calc(100% - 30px)",
              sm: "calc(100% - 30px)",
              md: 550,
            },
            margin: "0 auto",
          }}
        >
          <Box
            component="img"
            sx={{
              content: {
                xs: "url(/images/svgMangataWhite.svg)",
                sm: "url(/images/svgMangataWhite.svg)",
                md: "url(/images/logoMangataBlue.png)",
              },
              display: { xs: "none", md: "flex" },
              margin: "0 auto",
            }}
            alt="Logo Mangatas"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
                gap: 2,
              }}
            >
              <Box
                component={Icon}
                icon="solar:bill-check-bold-duotone"
                sx={{
                  width: "24px",
                  height: "24px",
                  color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                }}
              />

              <Typography
                sx={{
                  color: { xs: "#FFFFFF", md: "#2B3D5E" },
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Resumen de compra
                {isVisibleGrid && (
                  <Typography
                    component="span"
                    sx={{
                      color: { xs: "#FFFFFF", md: "#2B3D5E" },
                      fontSize: 14,
                      fontWeight: 800,
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    Total: <span>{handleFormatPrice()}</span>
                  </Typography>
                )}
              </Typography>
            </Box>
            <Box
              component="img"
              sx={{
                content: {
                  xs: "url(/images/svgMangataWhite.svg)",
                  sm: "url(/images/svgMangataWhite.svg)",
                },
                width: "70px",
                height: "70px",
                objectFit: "cover",
                display: { xs: "block", sm: "block", md: "flex" },
              }}
              alt="Logo Mangata"
            />
          </Box>
          <Box>
            <Box position="relative">
              <Box
                component={Icon}
                icon="solar:suitcase-tag-bold-duotone"
                sx={{
                  width: "24px",
                  height: "24px",
                  color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                  position: "absolute",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderBottom: "1px solid",
                  borderColor: { xs: "#ffff", md: "#000000" },
                  marginInlineStart: 5,
                  marginBottom: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                    Paquete Estandar
                  </Typography>
                </Box>
                <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                  {formatPrice(Number(PRICES.PRICE_MAX))}
                </Typography>
              </Box>
            </Box>
            <Box position="relative" sx={{ marginBottom: 2 }}>
              <Box
                component={Icon}
                icon="solar:calendar-bold-duotone"
                sx={{
                  width: "24px",
                  height: "24px",
                  color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                  position: "absolute",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid",
                  borderColor: { xs: "#ffff", md: "#000000" },
                  marginInlineStart: 5,
                }}
              >
                <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                  Fecha
                </Typography>
                <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                  {format(dateChange, FORMAT, "co")}
                </Typography>
              </Box>
            </Box>
            <Box position="relative" style={{ marginBottom: 16 }}>
              <Box
                component={Icon}
                icon="solar:users-group-rounded-bold-duotone"
                sx={{
                  width: "24px",
                  height: "24px",
                  color: { xs: "#FFFFFF", sm: "#FFFFFF", md: "#2B3D5E" },
                  position: "absolute",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderBottom: "1px solid",
                  borderColor: { xs: "#ffff", md: "#000000" },
                  marginInlineStart: 5,
                }}
              >
                <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                  Personas
                </Typography>
                <Typography sx={{ color: { xs: "#FFFFFF", md: "#000" } }}>
                  {fields.length}
                </Typography>
              </Box>
            </Box>
            <Box position="relative" style={{ marginBottom: 16 }}>
              <Icon
                icon="solar:cart-large-4-bold-duotone"
                width="24"
                height="24"
                style={{ color: "#2B3D5E", position: "absolute" }}
              />
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginInlineStart: 48,
                }}
              >
                <Typography
                  sx={{
                    color: { xs: "#FFFFFF", md: "#2B3D5E" },
                    fontSize: 20,
                    fontWeight: 800,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    color: { xs: "#FFFFFF", md: "#2B3D5E" },
                    fontSize: 20,
                    fontWeight: 800,
                  }}
                >
                  {handleFormatPrice()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box
              sx={{
                backgroundColor: {
                  xs: "#FFFFFF",
                  sm: "#FFFFFF",
                  md: "#2B3D5E",
                },
                height: 40,
                width: 178,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                gap: 8,
              }}
            >
              <Button
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  color: { xs: "#2B3D5E", sm: "#2B3D5E", md: "#FFFFFF" },
                }}
                onClick={() => {
                  if (validateFields()) setOpenModal(true);
                }}
                startIcon={
                  <Box
                    component={Icon}
                    icon="solar:user-plus-bold-duotone"
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: {
                        xs: "#2B3D5E",
                        sm: "#2B3D5E",
                        md: "#FFFFFF",
                      },
                    }}
                  />
                }
              >
                Reservar
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid2>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: { xs: 300, lg: 400 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#000000DE" }}>
              Reserva <span id="code_reserva">{CODE_RESERVATION}</span>
            </h2>
            <Box onClick={handleCopy}>
              <Icon
                icon="solar:copy-bold-duotone"
                width="24"
                height="24"
                style={{ color: "#2B3D5E" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "block",
              color: "#00000099",
              fontSize: "14px",
              px: 2,
            }}
          >
            <h3>{fields[0].name}</h3>
            <h3>{format(dateChange, FORMAT, "co")}</h3>
            <h3>{handleFormatPrice()}</h3>
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 2,
              gap: 8,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#B99734",
                height: 40,
                width: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                gap: 8,
              }}
            >
              <Button
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  color: "#333333",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (valueCel) handleReservation();
                }}
                startIcon={
                  <Box
                    component={Icon}
                    icon="solar:dollar-bold-duotone"
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: "#333333",
                    }}
                  />
                }
              >
                Confirmar
              </Button>
            </Box>
            <Box
              sx={{
                backgroundColor: "#2B3D5E",
                height: 40,
                width: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                gap: 8,
              }}
            >
              <Button
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
                onClick={() => setOpenModal(false)}
                startIcon={
                  <Box
                    component={Icon}
                    icon="solar:close-circle-bold-duotone"
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: "#FFFFFF",
                    }}
                  />
                }
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <DialogPayMents
        open={openDialogPayment}
        setopen={setOpenDialogPayment}
        amount={calculatePrice()}
        payment_id={Number(CODE_RESERVATION)}
        name={fields[0].name}
        email={valueEmail}
      />
    </Grid2>
  );
};

export default NameLunchForm;
