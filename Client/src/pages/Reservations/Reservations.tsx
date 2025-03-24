import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Modal from "@mui/material/Modal";

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
import LineTopIcon from "./LineTopIcon";

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

  const handleOnchangeCel = (value: string) => {
    if (valueCel.length <= 10) setValueCel(value);
  };

  const handleOnChangeEmail = (value: string) => {
    if (valueEmail.length <= 50) setValueEmail(value);
  };

  return (
    <Grid2
      spacing={2}
      container
      className="principal-grid"
      sx={{
        maxHeight: maxHeight - 150,
      }}
    >
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box className="box-container p-relative">
          <Box style={{ marginBottom: 20 }}>
            <Box style={{ marginBottom: 15 }}>
              <Typography className="color-blue-dark title-reservation">
                Reserva tu día {CODE_RESERVATION}
              </Typography>
              <Box className="background-blue-dark container-asesor p-absolute" />
              {dataCodeReservation && (
                <Typography className="color-blue-dark title-asesor">
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
            value={dateChange}
            onChange={handleChangeDate}
            label="Fecha"
            placeholder="Fecha"
            type="date"
            iconName="calendar"
          />
          <Typography className="color-blue-dark title-data-contact">
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
            <TextFieldComponent
              value={valueCel}
              onChange={handleOnchangeCel}
              label="Celular"
              placeholder="Ingrese tú Celular"
              type="number"
              iconName="phone-calling-rounded"
              helperText="Este campo es obligatorio"
            />

            <TextFieldComponent
              value={valueEmail}
              onChange={handleOnChangeEmail}
              label="Correo"
              placeholder="Ingrese tú Correo"
              iconName="letter-opened"
              helperText="Este campo es obligatorio"
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
        <Box className="background-blue-dark line-vertical" />
      </Grid2>
      <Grid2
        className="purchase-summary w-100"
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
          backgroundColor: {
            xs: "var(--color-theme-dark-blue)",
            sm: "var(--color-theme-dark-blue)",
            md: "var(--color-theme-white)",
            lg: "var(--color-theme-white)",
          },
          transform: {
            xs: `translateY(${!isVisibleGrid ? 0 : "calc(100% - 7rem"}))`,
            md: "translateY(0)",
          },
          maxHeight: { xs: 550, sm: 550 },
        }}
        onClick={() => setIsVisibleGrid((prev) => !prev)}
      >
        <LineTopIcon isVisibleGrid={isVisibleGrid} />
        <Box
          className="margin-0-auto"
          sx={{
            width: {
              xs: "calc(100% - 30px)",
              sm: "calc(100% - 30px)",
              md: 550,
            },
          }}
        >
          <Box
            className="margin-0-auto"
            component="img"
            sx={{
              content: {
                xs: "url(/images/svgMangataWhite.svg)",
                sm: "url(/images/svgMangataWhite.svg)",
                md: "url(/images/logoMangataBlue.png)",
              },
              display: { xs: "none", md: "flex" },
            }}
            alt="Logo Mangatas"
          />
          <Box className="d-flex justify-content-between align-items-center margin-bottom">
            <Box className="d-flex justify-content-center align-items-center gap-16 margin-top-8">
              <Box
                component={Icon}
                icon="solar:bill-check-bold-duotone"
                sx={{
                  width: "24px",
                  height: "24px",
                  color: {
                    xs: "var(--color-theme-white)",
                    sm: "var(--color-theme-white)",
                    md: "#var(--color-theme-dark-blue)",
                  },
                }}
              />

              <Typography
                sx={{
                  color: {
                    xs: "var(--color-theme-white)",
                    md: "#var(--color-theme-dark-blue)",
                  },
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Resumen de compra
                {isVisibleGrid && (
                  <Typography
                    component="span"
                    sx={{
                      color: {
                        xs: "var(--color-theme-white)",
                        md: "#var(--color-theme-dark-blue)",
                      },
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
                  color: {
                    xs: "var(--color-theme-white)",
                    sm: "var(--color-theme-white)",
                    md: "#var(--color-theme-dark-blue)",
                  },
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
                  <Typography
                    sx={{
                      color: { xs: "var(--color-theme-white)", md: "#000" },
                    }}
                  >
                    Paquete Estandar
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: { xs: "var(--color-theme-white)", md: "#000" } }}
                >
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
                  color: {
                    xs: "var(--color-theme-white)",
                    sm: "var(--color-theme-white)",
                    md: "#var(--color-theme-dark-blue)",
                  },
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
                <Typography
                  sx={{ color: { xs: "var(--color-theme-white)", md: "#000" } }}
                >
                  Fecha
                </Typography>
                <Typography
                  sx={{ color: { xs: "var(--color-theme-white)", md: "#000" } }}
                >
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
                  color: {
                    xs: "var(--color-theme-white)",
                    sm: "var(--color-theme-white)",
                    md: "#var(--color-theme-dark-blue)",
                  },
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
                <Typography
                  sx={{ color: { xs: "var(--color-theme-white)", md: "#000" } }}
                >
                  Personas
                </Typography>
                <Typography
                  sx={{ color: { xs: "var(--color-theme-white)", md: "#000" } }}
                >
                  {fields.length}
                </Typography>
              </Box>
            </Box>
            <Box position="relative" style={{ marginBottom: 16 }}>
              <Icon
                icon="solar:cart-large-4-bold-duotone"
                width="24"
                height="24"
                style={{
                  color: "#var(--color-theme-dark-blue)",
                  position: "absolute",
                }}
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
                    color: {
                      xs: "var(--color-theme-white)",
                      md: "#var(--color-theme-dark-blue)",
                    },
                    fontSize: 20,
                    fontWeight: 800,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    color: {
                      xs: "var(--color-theme-white)",
                      md: "#var(--color-theme-dark-blue)",
                    },
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
                  xs: "var(--color-theme-white)",
                  sm: "var(--color-theme-white)",
                  md: "#var(--color-theme-dark-blue)",
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
                  color: {
                    xs: "#var(--color-theme-dark-blue)",
                    sm: "#var(--color-theme-dark-blue)",
                    md: "var(--color-theme-white)",
                  },
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
                        xs: "#var(--color-theme-dark-blue)",
                        sm: "#var(--color-theme-dark-blue)",
                        md: "var(--color-theme-white)",
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
                style={{ color: "#var(--color-theme-dark-blue)" }}
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
                backgroundColor: "#var(--color-theme-dark-blue)",
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
                  color: "var(--color-theme-white)",
                }}
                onClick={() => setOpenModal(false)}
                startIcon={
                  <Box
                    component={Icon}
                    icon="solar:close-circle-bold-duotone"
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: "var(--color-theme-white)",
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
