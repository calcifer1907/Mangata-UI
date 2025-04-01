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
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// import {NavLink} from "react-router-dom"

/**Component */
import Dialog from "./Dialog";
import LoadingPage from "../Loading/Loading.tsx";

// import PayMenetMethod from "../../pages/PayMenetMethod";

/**Constant */
import { VITE_PUBLIC_KEY } from "../../constant/URL.ts";

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
  // const [clickPSE, setClickPSE] = useState<boolean>(false);
  const [preferenceId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  initMercadoPago(VITE_PUBLIC_KEY);

  // const handlePaymentCreditCard = async () => {
  //   try {
  //     console.log(amount);
  //     const response = await apisMercadoPago.createOrderCreditCard({
  //       amount,
  //       payment_id,
  //     });
  //     // const { init_point } = response;
  //     // if (init_point) {
  //     //   window.location.href = init_point;
  //     // }
  //     setPreferenceId(response.id);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      tittle="Métodos de pago"
      fullScreen
      showCancelButton={false}
    >
      {/* {!clickPSE && ( */}
      <Box
        className="d-flex gap-4 justify-content-center"
        style={{
          flexDirection: "column",
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* <Paper
            component="button"
            onClick={() => setClickPSE(true)}
            variant="outlined"
            sx={stytlePaper}
          >
            <img
              src="/images/logo-pse.png"
              alt="PSE"
              style={{ width: "100px" }}
            />
            <Typography variant="h6">Pagó PSE</Typography>
            <Icon
              icon="solar:alt-arrow-right-outline"
              width="42"
              height="64"
              color="#2B3D5E"
            />
          </Paper> */}
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
        {/* <Paper
            component="button"
            variant="outlined"
            onClick={handlePaymentCreditCard}
            sx={stytlePaper}
          >
            <Icon
              style={{ marginLeft: "30px" }}
              icon="solar:card-linear"
              width="42"
              height="64"
              color="#2B3D5E"
            />
            <Typography variant="h6">Tarjeta débito y crédito</Typography>
            <Icon
              icon="solar:alt-arrow-right-outline"
              width="42"
              height="64"
              color="#2B3D5E"
            />
          </Paper> */}
        {/* <Paper
            component="button"
            variant="outlined"
            onClick={() => setClickPSE(true)}
            sx={stytlePaper}
          >
            <Icon
              style={{ marginLeft: "30px" }}
              icon="solar:qr-code-bold"
              width="42"
              height="64"
              color="#2B3D5E"
            />
            <Icon
              icon="solar:alt-arrow-right-outline"
              width="42"
              height="64"
              color="#2B3D5E"
            />
          </Paper> */}
      </Box>
      {/* )} */}

      {/* <PayMenetMethod
        amount={amount}
        payment_id={payment_id}
        name={""}
        email={email}
      /> */}

      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </Dialog>
  );
};

export default DialogPayMents;
