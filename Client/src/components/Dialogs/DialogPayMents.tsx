/**
 * @author Carlos Taborda
 * @description this component show method payment
 * @version 1.0
 *
 */

/**Component */
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
    >
      <div>PSE</div>
      <div>CARD</div>
    </Dialog>
  );
};

export default DialogPayMents;
