/**
 * @author Carlos Taborda
 * @description this component show method payment
 * @version 1.0
 *
 */
import { useEffect, useState } from "react";

/**Libreries */
import { Box, Paper } from "@mui/material";
import { Icon } from "@iconify/react";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

// import {NavLink} from "react-router-dom"

/**Component */
import Dialog from "./Dialog";
import LoadingPage from "../Loading/Loading.tsx";

// import PayMenetMethod from "../../pages/PayMenetMethod";

/**APis */
import { paymentBold } from "../../utils/api/agent";

interface IProps {
  open: boolean;
  setopen: (data: boolean) => void;
  amount: number;
  payment_id: number;
  name?: string;
  email: string;
}

const stytlePaper = {
  maxHeight: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  padding: "10px",
  cursor: "pointer",
};

const DialogPayMents = ({
  open,
  setopen,
  amount,
  payment_id,
  email,
}: IProps) => {
  const { t } = useTranslation("reserve");
  const [loading, setLoading] = useState<boolean>(false);

  const handleBoldPayment = async () => {
    try {
      setLoading(true);
      const body = {
        email: email,
        currency: "COP",
        total_amount: amount,
        payment_id,
      };
      const { data } = await paymentBold(body);
      setLoading(false);
      if (data) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Algo salio mal", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  useEffect(() => {
    // Verificar si el script ya existe
    if (
      !document.querySelector(
        'script[src="https://bold.co/library/ui-kit.js?target=bold-pagos&layout=horizontal&type=slider"]'
      ) &&
      open
    ) {
      const script = document.createElement("script");
      script.src =
        "https://bold.co/library/ui-kit.js?target=bold-pagos&layout=horizontal&type=slider";

      // Agregar al head
      document.head.appendChild(script);
    }

    return () => {
      // Opcional: remover el script al desmontar si es necesario
      const script = document.querySelector(
        'script[src="https://bold.co/library/ui-kit.js?target=bold-pagos&layout=horizontal&type=slider"]'
      );
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [open]);

  if (loading) return <LoadingPage />;

  return (
    <Dialog
      open={open}
      setOpenDialog={setopen}
      tittle={t("paymentMethod")}
      fullScreen
      showCancelButton={false}
    >
      <Box
        className="d-flex gap-4 justify-content-center"
        style={{
          flexDirection: "column",
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Paper
          component="div"
          onClick={handleBoldPayment}
          variant="outlined"
          sx={stytlePaper}
        >
          <div id="bold-pagos" key={String(open)}>
            <img
              src="https://developers.bold.co/_next/static/media/logo.ac02f303.png"
              alt="BOLD"
              style={{ width: "100px" }}
            />
          </div>
          <Icon
            icon="solar:alt-arrow-right-outline"
            width="42"
            height="64"
            color="#2B3D5E"
          />
        </Paper>
      </Box>
    </Dialog>
  );
};

export default DialogPayMents;
