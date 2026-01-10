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

/**Component */
import LoadingPage from "../Loading/Loading.tsx";

/**APis */
import { paymentBold } from "../../utils/api/agent";

interface IProps {
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

const SCRIPT_BOLD_URL =
  "https://bold.co/library/ui-kit.js?target=bold-pagos&layout=horizontal&type=slider";

const DialogPayMents = ({ amount, payment_id, email }: IProps) => {
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
    if (!document.querySelector(`script[src="${SCRIPT_BOLD_URL}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_BOLD_URL;
      document.head.appendChild(script); // Agregar al head
    }
    return () => {
      // Opcional: remover el script al desmontar si es necesario
      const script = document.querySelector(`script[src="${SCRIPT_BOLD_URL}"]`);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <Box
      component="section"
      className="d-flex gap-4 justify-content-center"
      style={{
        flexDirection: "column",
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Paper
        component="div"
        onClick={handleBoldPayment}
        variant="outlined"
        sx={stytlePaper}
      >
        <div id="bold-pagos" />
        <Icon
          icon="solar:alt-arrow-right-outline"
          width="42"
          height="64"
          color="#2B3D5E"
        />
      </Paper>
    </Box>
  );
};

export default DialogPayMents;
