/**
 * @author Carlos Taborda
 * @description this component show method payment
 * @version 1.0
 *
 */

/**Libreries */
import { Box, Paper, Typography } from "@mui/material";
// import {NavLink} from "react-router-dom"

/**Component */
import Dialog from "./Dialog";
import PayMenetMethod from "../../pages/PayMenetMethod";
import { useState } from "react";
import { Icon } from "@iconify/react";

import { enqueueSnackbar } from "notistack";

import { VITE_PUBLIC_KEY } from "../../constant/URL.ts";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { paymentBold } from "../../utils/api/agent";

interface IProps {
  open: boolean;
  setopen: (data: boolean) => void;
  amount: number;
  payment_id: number;
  name: string;
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
  name,
  email,
}: IProps) => {
  const [clickPSE, setClickPSE] = useState<boolean>(false);
  const [preferenceId] = useState<string | null>(null);
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
      const body = {
        email: "tabordac2@gmail.com",
        currency: "COP",
        total_amount: 5000,
      };
      const { data } = await paymentBold(body);
      if (data.payload) {
        window.location.href = data.payload.url;
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Algo salio mal", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      setOpenDialog={setopen}
      tittle="Métodos de pago"
      fullScreen
    >
      {!clickPSE && (
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
          </Paper>
          <Paper
            component="button"
            onClick={handleBoldPayment}
            variant="outlined"
            sx={stytlePaper}
          >
            {/* <img
              src="https://developers.bold.co/_next/static/media/logo.ac02f303.png"
              alt="BOLD"
              style={{ width: "100px" }}
            /> */}
            <div id="bold-pagos"></div>
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
      )}
      {clickPSE && (
        <PayMenetMethod
          amount={amount}
          payment_id={payment_id}
          name={name}
          email={email}
        />
      )}
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </Dialog>
  );
};

export default DialogPayMents;
