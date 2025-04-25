import { useEffect, FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";

/**Hooks */
import { useContextUser } from "../hooks/useContextUser";

/**APis */
import { login } from "../utils/api/agent";

/**Libreries  */
import { enqueueSnackbar } from "notistack";

import LogoMangata from "../assets/Mangata.svg";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigation = useNavigate();
  const { setUserInfo } = useContextUser();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      if (!loading) {
        setLoading(true);
        data.email = data.email.toLocaleLowerCase();
        const response = await login.loginPage(data);
        localStorage.setItem("info", JSON.stringify(response));
        setUserInfo(response);
        navigation("/");
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const message = error.response.data.message;
      enqueueSnackbar(message, {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigation("/Login");
    }
  };

  const handleBack = () => {
    window.location.href = "/";
  };

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
        display: "flex",
        justifyContent: "center", // Centrar contenido
        alignItems: "center", // Centrar contenido
        minHeight: "100vh", // Altura completa de la pantalla
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <Button
          type="submit"
          fullWidth
          variant="text"
          color="primary"
          onClick={handleBack}
          startIcon={
            <Icon
              icon="solar:round-arrow-left-bold-duotone"
              width="24"
              height="24"
              style={{ color: "#FFFFFF" }}
            />
          }
          sx={{
            mt: 2,
            width: 157,
            textTransform: "none",
            background: "var(--blueDark)",
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 500,
            color: "#FFFFFF",
          }}
        >
          Atras
        </Button>
      </Box>
      <Box
        sx={{
          width: { xs: `${innerWidth - 14}px`, sm: "400px", md: "600px" },
          height: { xs: `${innerWidth - 14}px`, sm: "400px", md: "600px" },
          backgroundColor: "#2B3D5E",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          paddingTop: { xs: 2, sm: 0 },
        }}
      >
        <Box display="flex" justifyContent="center">
          <Box
            component="img"
            src={LogoMangata}
            sx={{ width: { xs: "120px", md: "200px" } }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "260px", md: "500px", lg: "600px" },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              mt: { xs: 0, sm: 2, md: 2 },
              width: "22rem",
            }}
          >
            <TextField
              fullWidth
              label="Usuario"
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
                        style={{ color: "#2B3D5E" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                background: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                marginBottom: { xs: 0, sm: 0, md: 2 },
              }}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingrese un correo válido",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              type="password"
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
                        style={{ color: "#2B3D5E" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                background: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                marginTop: { xs: 1, sm: 1, md: 1 },
                marginBottom: { xs: 2, sm: 2, md: 2 },
              }}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
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
                  <Icon
                    icon="solar:login-3-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
                  />
                }
                sx={{
                  width: 145,
                  textTransform: "none",
                  background: "#FFFFFF",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#2B3D5E",
                }}
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          borderRadius: 20,
          backgroundColor: "#2B3D5E",
          width: "100%",
          height: 20,
          marginTop: 49,
        }}
      ></Box>
    </Container>
  );
};

export default Login;
