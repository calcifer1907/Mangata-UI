import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid2,
  Modal,
  TextField,
  InputAdornment,
} from "@mui/material";
import Accompanist from "../components/Accompanist/Accompanist";
import { format } from "@formkit/tempo";
import { Icon } from "@iconify/react";
import { formatPrice } from "../generalFunctions/formaters";
import { useSearchParams } from "react-router-dom";

import { useAccompanist } from "../hooks/useAccompanist";

import DialogPayMents from "../components/Dialogs/DialogPayMents";

import {
  IFields,
  IErrorFieldAccompanist,
  IOptions,
} from "../interfaces/IAccompanist";
import { getAccompanist, methodUser } from "../utils/api/agent";
import { enqueueSnackbar } from "notistack";
import { generarCodigoReservaUX2 } from "../generalFunctions/generateCodeReservation";
import { IGetUserId } from "../interfaces/IUser";

const FORMAT = "DD/MM/YYYY";

const today = format(new Date(), "YYYY-MM-DD", "co");
const NameLunchForm: React.FC = () => {
  const [fields, setFields] = useState<IFields[]>([
    { name: "", lunch: { label: "", value: 0 } },
  ]);
  const [valueCel, setValueCel] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [errors, setErrors] = useState<IErrorFieldAccompanist[]>([]);
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const [getUserId, setGetUserId] = useState<IGetUserId | null>(null);
  const [searchParams] = useSearchParams();
  const { optionsLunches, minmax } = useAccompanist();
  const [dateChange, setDateChange] = useState<string>(today);
  const [openDialogPayment, setOpenDialogPayment] = useState<boolean>(false);

  const [maxHeight, setMaxHeight] = useState<number>(0);

  const CODE_RESERVATION = useMemo(() => {
    return generarCodigoReservaUX2();
  }, []);

  const PRICES = useMemo(
    () => ({
      PRICE_MAX: searchParams.get("price") ?? minmax.MAX,
      PRICE_MIN: searchParams.get("minPrice") ?? minmax.MIN,
    }),
    [minmax, searchParams]
  );

  const ID_EMPLO_PARAM = searchParams.get("id");

  const getuserId = useCallback(async () => {
    const body = {
      id: Number(ID_EMPLO_PARAM) || -1,
    };
    const data = await methodUser.getUserId(body);
    setGetUserId(data);
  }, [ID_EMPLO_PARAM]);

  useEffect(() => {
    const body = document.getElementById("root");
    const heightContainer =
      document.getElementById("contentPrimary")?.offsetHeight;
    setMaxHeight(heightContainer || 0);
    body?.style.setProperty("overflow-y", "hidden");
    getuserId();
  }, [getuserId]);
  // Maneja los cambios en los campos
  const handleChange = (
    index: number,
    fieldName: string,
    value: string | IOptions
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
    setFields(updatedFields);
    const errorValue =
      fieldName === "name"
        ? (value as string).trim() === ""
        : (value as IOptions).label === "";
    // Limpiar errores al cambiar algo
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [fieldName]: errorValue,
    };
    setErrors(updatedErrors);
  };

  // Valida que todos los campos estén llenos
  const validateFields = (): boolean => {
    const validationErrors = fields.map((field) => ({
      name: field.name.trim() === "",
      lunch: field.lunch.value === 0,
    }));
    setErrors(validationErrors);
    return (
      !validationErrors.some((error) => error.name || error.lunch) &&
      valueCel !== ""
    );
  };

  // Agrega una nueva fila si la validación es exitosa
  const addField = () => {
    if (validateFields()) {
      setFields([...fields, { name: "", lunch: { label: "", value: 0 } }]);
      setErrors([...errors, { name: false, lunch: false }]);
    }
  };

  // Elimina una fila específica
  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setFields(updatedFields);
    setErrors(updatedErrors);
  };

  const calculatePrice = () => {
    const NEW_PRICE = Number(PRICES.PRICE_MAX) * fields.length;
    return NEW_PRICE;
  };

  const handleFormatPrice = () => {
    const newPrice = calculatePrice();
    const FORMAT_PRICE = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(newPrice);
    return FORMAT_PRICE;
  };

  const handleReservation = async () => {
    const ID_EMPLOYEE = getUserId?.id;
    const TELEPHONE = valueCel;
    const EMAIL = valueEmail;
    const AGREED_PRICE = PRICES.PRICE_MAX;
    const ACCOMPANIST = fields;
    if (validateFields()) {
      const body = {
        CODE_RESERVATION,
        ID_EMPLOYEE,
        TELEPHONE,
        AGREED_PRICE,
        ACCOMPANIST,
        EMAIL,
        MIN_PRICE: PRICES.PRICE_MIN,
        CREATED_AT: format(dateChange, "YYYY-MM-DD HH:mm:ss", "en"),
      };

      const data = await getAccompanist.saveReservation(body);
      if (data.message === "success") {
        enqueueSnackbar("Se guardo correctamente la reserva", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        handleClose();
        setOpenDialogPayment(true);
      }
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(!openModal);

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
      sx={{
        maxHeight: maxHeight - 100,
        overflowY: "auto",
        marginTop: 2,
      }}
    >
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box
          sx={{
            paddingInline: 4,
            paddingBottom: 2,
            position: "relative",
          }}
        >
          <Box>
            <Box style={{ marginBottom: 20 }}>
              <Typography
                sx={{ fontSize: "25px", color: "#2B3D5E", fontWeight: 800 }}
              >
                Reserva tu día {CODE_RESERVATION}
              </Typography>
              <Box
                style={{
                  backgroundColor: "#2B3D5E",
                  height: 6,
                  position: "absolute",
                  top: 36,
                  width: "90%",
                  left: 0,
                }}
              />
              {ID_EMPLO_PARAM && (
                <h5
                  style={{
                    fontSize: 24,
                    fontWeight: 300,
                    color: "#2B3D5E",
                    marginTop: 5,
                  }}
                >
                  {getUserId && (
                    <>
                      Asesor: <span>{getUserId?.user_name}</span>
                    </>
                  )}
                </h5>
              )}
            </Box>
            <Box
              style={{
                backgroundColor: "#2B3D5E",
                height: 40,
                width: 178,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                gap: 8,
                marginBottom: 20,
              }}
            >
              <Button
                size="small"
                sx={{ textTransform: "none", fontSize: 14, color: "#FFFFFF" }}
                onClick={addField}
                startIcon={
                  <Icon
                    icon="solar:user-plus-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#FFFFFF" }}
                  />
                }
              >
                Agregar persona
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              fullWidth
              label="Fecha"
              variant="filled"
              margin="none"
              type="date"
              value={dateChange}
              onChange={(e) => setDateChange(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="solar:calendar-bold-duotone"
                        width="24"
                        height="24"
                        style={{ color: "#2B3D5E" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              InputLabelProps={{
                shrink: true, // Asegura que la etiqueta permanezca arriba
              }}
              sx={{
                background: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                maxWidth: "328px",
              }}
            />
          </Box>
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
                  index === 0 ? "Datos Personales" : `Acompañande ${index}`
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
            xs: `translateY(${!isVisibleGrid ? 0 : "calc(100% - 6rem"}))`,
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
            marginTop: 1,
            display: { xs: "block", md: "none" },
          }}
        />
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
                marginTop: 4,
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

                  <Box
                    component={Icon}
                    icon="solar:info-circle-bold-duotone"
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: {
                        xs: "#FFFFFF",
                        sm: "#FFFFFF",
                        md: "#2B3D5E",
                      },
                    }}
                  />
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
        setOpen={setOpenDialogPayment}
        amount={calculatePrice()}
        payment_id={Number(CODE_RESERVATION)}
        name={fields[0].name}
        email={valueEmail}
      />
    </Grid2>
  );
};

export default NameLunchForm;
