/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from "react-hook-form";

import { useNavigate } from "react-router-dom";

/**Libreries */
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify/react";
import { enqueueSnackbar } from "notistack";

/**Interface */
import { IUsers, IValidEmail } from "../interfaces/IUser";
import { IBanksList } from "../interfaces/IMercadoPago";

/**Apis */
import { methodUser, getListBanks, getValidEmail } from "../utils/api/agent";

/**Funcions */
import { hashPassword } from "../generalFunctions/auth";

/**Context */
import { useContextUser } from "../hooks/useContextUser";
import { formatDate } from "../generalFunctions/formatDate";

const CreateUser = () => {
  const navigate = useNavigate();
  const { userInfo } = useContextUser();
  const [validEmail, setValidEmail] = useState<IValidEmail>({
    message: "",
    status: 0,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectRole, setSelectRole] = useState<string>("");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const { handleSubmit, reset, control } = useForm<IUsers>({
    defaultValues: {
      FIRST_NAME: "",
      LAST_NAME: "",
      IDENTITY: "",
      EMAIL: "",
      BANK_ACCOUNT: "",
      BANK_NAME: null, // TRAE EL ID DEL BANCO
      BANK_TYPE_ACCOUNT: null,
      PASSWORD: "",
      ROLE_ID: 0,
    },
  });

  const [listBanks, setListBanks] = useState<IBanksList[]>([]);

  const getListBank = useCallback(async () => {
    const data = await getListBanks();
    setListBanks(data);
  }, []);

  const messageValidStatus = (status: number, message: string) => {
    if (status) {
      enqueueSnackbar(message, {
        variant: status === 201 ? "success" : "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const validExistEmail = async (email: string) => {
    const data = await getValidEmail(email.toLocaleLowerCase());
    messageValidStatus(data.status, data.message);
    setValidEmail(data);
    return data;
  };

  useEffect(() => {
    getListBank();
  }, [getListBank]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const newData = data;
      newData.PASSWORD = hashPassword(data.PASSWORD);
      newData.ROLE_ID = newData.ROLE_ID || 2;
      newData.IS_ACTIVE = userInfo?.TOKEN ? true : false;
      newData.CREATED_AT = formatDate("");
      newData.EMAIL = newData.EMAIL + "".toLocaleLowerCase();

      if (validEmail.status === 500 || !validEmail.message) {
        let valid = { message: "", status: 0 } as IValidEmail;
        if (!validEmail.message) {
          valid = await validExistEmail(newData.EMAIL);
        } else {
          messageValidStatus(
            validEmail.status || valid.status,
            validEmail.message || valid.message
          );
        }
      } else {
        const response = await methodUser.createUser(newData as IUsers);
        if (response.message === "success") {
          enqueueSnackbar("Se guardo correctamente el usurio", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          if (!userInfo.TOKEN) {
            enqueueSnackbar(
              "El usuario se validará, recibirás respuesta en 24h.",
              {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
              }
            );
            setTimeout(() => {
              navigate("/");
            }, 8000);
          }
          reset();
        }
      }
    } catch (e: any) {
      if (e.status === 409) {
        const { response } = e;
        enqueueSnackbar(response.data.message, {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const roles = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Empleado" },
  ];

  const BANK_TYPE_ACCOUNTS = [
    { value: 1, label: "N/A" },
    { value: 2, label: "Ahorros" },
    { value: 3, label: "Corriente" },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setInnerWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <Container
      sx={{
        placeContent: "center",
        placeItems: "center",
        minHeight: "100vh",
        placeSelf: "center",
        backgroundColor: {
          xs: "var(--color-theme-dark-blue)",
          md: "var(--color-theme-white)",
        },
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: { xs: `${innerWidth - 10}px`, sm: "400px", md: "550px" }, // Tamaño dinámico
          height: { xs: `${innerWidth - 10}px`, sm: "400px", md: "550px" }, // Tamaño dinámico5
          backgroundColor: {
            xs: "var(--color-theme-white)",
            md: "var(--color-theme-dark-blue)",
          }, // Color del círculo
          borderRadius: "50%", // Hacerlo circular
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          placeItems: "center",
          height: "100%",
          width: { xs: "80%", sm: "40%", md: "35%" },
          margin: "auto",
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={
            {
              // mt: 2,
            }
          }
        >
          <Controller
            name="FIRST_NAME"
            control={control}
            rules={{
              required: "El nombre es obligario",
              pattern: {
                value: /^[a-zA-Z]/,
                message: "Ingrese un nombre valido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Nombres"
                variant="filled"
                margin="none"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="solar:user-bold-duotone"
                          width="24"
                          height="24"
                          style={{ color: "var(--color-theme-dark-blue)" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  background: "var(--color-theme-white)",
                  borderRadius: "8px 8px 0 0",
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="LAST_NAME"
            control={control}
            rules={{
              required: "El apellido es obligario",
              pattern: {
                value: /^[a-zA-Z]/,
                message: "Ingrese un apellido valido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="text"
                label="Apellidos"
                variant="filled"
                margin="none"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="solar:user-bold-duotone"
                          width="24"
                          height="24"
                          style={{ color: "var(--color-theme-dark-blue)" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  background: "var(--color-theme-white)",
                  borderRadius: "8px 8px 0 0",
                  marginTop: { xs: 1, sm: 1, md: 1 },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {(selectRole === "Empleado" || !userInfo.TOKEN) && (
            <Controller
              name="IDENTITY"
              control={control}
              rules={{
                required: "La cedúla es obligario",
                pattern: {
                  value: /^[0-9]/,
                  message: "Ingrese una cedúla valida",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Cedúla"
                  variant="filled"
                  margin="none"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:key-minimalistic-square-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "var(--color-theme-dark-blue)" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    background: "var(--color-theme-white)",
                    borderRadius: "8px 8px 0 0",
                    marginTop: { xs: 1, sm: 1, md: 1 },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
          <Controller
            name="EMAIL"
            control={control}
            rules={{
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Ingrese un correo válido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                autoComplete="off"
                label="Correo"
                variant="filled"
                margin="none"
                onBlur={(event) => {
                  const { value } = event.target;
                  validExistEmail(value);
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="solar:user-bold-duotone"
                          width="24"
                          height="24"
                          style={{ color: "var(--color-theme-dark-blue)" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  background: "var(--color-theme-white)",
                  borderRadius: "8px 8px 0 0",
                  marginTop: { xs: 1, sm: 1, md: 1 },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="PASSWORD"
            control={control}
            rules={{
              required: "La contraseña es obligatoria",
              minLength: {
                value: 3,
                message: "Debe tener al menos 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+?&#=])[A-Za-z\d@$!%*+?&#=]{8,}$/,
                message:
                  "Ingrese una contraseña segura caractered validos @$!%*+?&#= una letra en mayuscula.",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                variant="filled"
                margin="none"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="solar:key-minimalistic-square-bold-duotone"
                          width="24"
                          height="24"
                          style={{ color: "var(--color-theme-dark-blue)" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          icon={
                            showPassword
                              ? "solar:eye-closed-bold-duotone"
                              : "solar:eye-bold-duotone"
                          }
                          width="24"
                          height="24"
                          style={{
                            color: "var(--color-theme-dark-blue)",
                            cursor: "pointer",
                          }}
                          onClick={handleShowPassword}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  background: "var(--color-theme-white)",
                  borderRadius: "8px 8px 0 0",
                  marginTop: { xs: 1, sm: 1, md: 1 },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {userInfo?.TOKEN && (
            <Controller
              name="ROLE_ID"
              control={control}
              rules={{ required: "El role obligario" }}
              render={({
                field: { onChange, value, ...field },
                fieldState,
              }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  sx={{
                    background: "var(--color-theme-white)",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: { xs: 1, sm: 2, md: 2 },
                    marginTop: { xs: 1, sm: 1, md: 1 },
                  }}
                  variant="filled"
                  margin="none"
                  placeholder="Seleccione un role"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="solar:users-group-rounded-bold-duotone"
                            width="24"
                            height="24"
                            style={{ color: "var(--color-theme-dark-blue)" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  value={value}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    const selectedRole = roles.find(
                      (role) => role.value === Number(event.target.value)
                    );
                    if (selectedRole) {
                      setSelectRole(selectedRole.label);
                    }
                    onChange(event.target.value);
                  }}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}

          {(selectRole === "Empleado" || !userInfo.TOKEN) && (
            <>
              <Controller
                name="BANK_NAME"
                rules={{ required: "El banco obligario" }}
                control={control}
                render={({
                  field: { onChange, value, ...field },
                  fieldState,
                }) => (
                  <TextField
                    {...field}
                    select
                    label="Banco"
                    fullWidth
                    sx={{
                      background: "var(--color-theme-white)",
                      borderRadius: "8px 8px 0 0",
                      marginTop: { xs: 1, sm: 1, md: 1 },
                    }}
                    variant="filled"
                    margin="none"
                    placeholder="Seleccione un banco"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon
                              icon="solar:users-group-rounded-bold-duotone"
                              width="24"
                              height="24"
                              style={{ color: "var(--color-theme-dark-blue)" }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    value={value}
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      onChange(event.target.value);
                    }}
                  >
                    {listBanks.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="BANK_TYPE_ACCOUNT"
                rules={{ required: "El type de cuenta obligario" }}
                control={control}
                render={({
                  field: { onChange, value, ...field },
                  fieldState,
                }) => (
                  <TextField
                    {...field}
                    select
                    label="Tipo de cuenta"
                    fullWidth
                    sx={{
                      background: "var(--color-theme-white)",
                      borderRadius: "8px 8px 0 0",
                      marginTop: { xs: 1, sm: 1, md: 1 },
                    }}
                    variant="filled"
                    margin="none"
                    placeholder="Seleccione un typo"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon
                              icon="solar:users-group-rounded-bold-duotone"
                              width="24"
                              height="24"
                              style={{ color: "var(--color-theme-dark-blue)" }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    value={value}
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      const { value } = event.target;
                      onChange(value);
                    }}
                  >
                    {BANK_TYPE_ACCOUNTS.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        title={option.label}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="BANK_ACCOUNT"
                rules={{ required: "La cuenta es obligario" }}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Numero de Cuenta"
                    variant="filled"
                    margin="none"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon
                              icon="solar:key-minimalistic-square-bold-duotone"
                              width="24"
                              height="24"
                              style={{ color: "var(--color-theme-dark-blue)" }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      background: "var(--color-theme-white)",
                      borderRadius: "8px 8px 0 0",
                      marginTop: { xs: 1, sm: 1, md: 1 },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </>
          )}

          <Box
            sx={{
              display: "grid",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="text"
              color="primary"
              startIcon={
                <Box
                  component={Icon}
                  icon="solar:safe-square-bold-duotone"
                  width="24"
                  height="24"
                  sx={{
                    color: {
                      md: "var(--color-theme-white)",
                      xs: "var(--color-theme-dark-blue)",
                    },
                  }}
                />
              }
              sx={{
                mt: 2,
                width: 140,
                textTransform: "none",
                background: "var(--color-theme-white)",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid var(--color-theme-black)",
                color: {
                  xs: "var(--color-theme-dark-blue)",
                  md: "var(--color-theme-white)",
                },
                backgroundColor: {
                  md: "var(--color-theme-dark-blue)",
                  xs: "var(--color-theme-white)",
                },
              }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: 20,
          backgroundColor: {
            xs: "var(--color-theme-white)",
            md: "var(--color-theme-dark-blue)",
          },
          width: "100%",
          height: 20,
          marginTop: 2,
        }}
      />
    </Container>
  );
};

export default CreateUser;
