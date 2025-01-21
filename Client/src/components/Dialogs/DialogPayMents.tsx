/**
 * @author Carlos Taborda
 * @description this component show method payment
 * @version 1.0
 *
 */

/**Component */
import { Box, Button } from "@mui/material";
import Dialog from "./Dialog";

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const fullScreen = { fullScreen: true };

const DialogPayMents = ({ open, setOpen }: IProps) => {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      tittle="Metodos de pago"
      {...fullScreen}
      showCancelButton={false}
    >
      <Box className="d-flex gap-4 justify-content-center">
        <Button variant="contained" style={{ background: "#fdb813" }}>
          PSE
        </Button>
        <Button variant="contained">CARD</Button>
      </Box>
    </Dialog>
  );
};

export default DialogPayMents;
