/**
 * @author Carlos Taborda
 * @description this component show method payment
 * @version 1.0
 *
 */

/**Libreries */
import { Box, Button } from "@mui/material";
// import {NavLink} from "react-router-dom"

/**Component */
import Dialog from "./Dialog";
import PayMenetMethod from "../../pages/PayMenetMethod";
import { useState } from "react";

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  amount: number;
  payment_id: number;
}

const fullScreen = { fullScreen: true };

const DialogPayMents = ({ open, setOpen, amount, payment_id }: IProps) => {
  const [clickPSE, setClickPSE] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      tittle="Métodos de pago"
      showCancelButton={false}
      {...fullScreen}
    >
      {!clickPSE && (
        <Box className="d-flex gap-4 justify-content-center">
          <Button
            variant="contained"
            style={{ background: "#fdb813" }}
            onClick={() => setClickPSE(true)}
          >
            PSE
          </Button>
          <Button variant="contained">CARD</Button>
        </Box>
      )}
      {clickPSE && <PayMenetMethod amount={amount} payment_id={payment_id} />}
    </Dialog>
  );
};

export default DialogPayMents;
