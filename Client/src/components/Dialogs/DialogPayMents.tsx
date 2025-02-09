/**
 * @author Carlos Taborda
 * @description this component show method payment
 * @version 1.0
 *
 */

/**Libreries */
import { Box, Button, Paper } from "@mui/material";
// import {NavLink} from "react-router-dom"

/**Component */
import Dialog from "./Dialog";
import PayMenetMethod from "../../pages/PayMenetMethod";
import { useState } from "react";
import { Icon } from "@iconify/react";

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  amount: number;
  payment_id: number;
}

const fullScreen = { fullScreen: true };

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

const DialogPayMents = ({ open, setOpen, amount, payment_id }: IProps) => {
  const [clickPSE, setClickPSE] = useState<boolean>(false);

  return (
    <Dialog
      open={!open}
      setOpen={setOpen}
      tittle="Métodos de pago"
      showCancelButton={false}
      {...fullScreen}
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
            <Icon
              icon="solar:alt-arrow-right-outline"
              width="42"
              height="64"
              color="#2B3D5E"
            />
          </Paper>
          <Paper
            component="button"
            variant="outlined"
            onClick={() => setClickPSE(true)}
            sx={stytlePaper}
          >
            <Icon
              style={{ marginLeft: "30px" }}
              icon="solar:card-linear"
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
          </Paper>
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
      {clickPSE && <PayMenetMethod amount={amount} payment_id={payment_id} />}
    </Dialog>
  );
};

export default DialogPayMents;
