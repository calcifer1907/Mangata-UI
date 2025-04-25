import Dialog from "./Dialog";
import { IGetListSales } from "../../interfaces/IUser";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentItem: IGetListSales | null;
}

const DialogUserInfo = ({ open, setOpen, currentItem }: IProps) => {
  return (
    <Dialog
      open={open}
      setOpenDialog={setOpen}
      tittle="Información de la Reserva"
      fullScreen={false}
      showCancelButton
    >
      <Box>
        <Box className="d-flex justify-content-between align-items-center gap-8">
          <Typography>Codigo de Reserva:</Typography>
          <strong>{currentItem?.code_reservation}</strong>
        </Box>
        <Box className="d-flex justify-content-between align-items-center gap-8">
          <Typography>Fecha de creación</Typography>
          <strong>{currentItem?.created_at}</strong>
        </Box>
        <Box className="d-flex justify-content-between align-items-center gap-8">
          <Typography>Fecha de creación:</Typography>
          <strong>{currentItem?.created_on}</strong>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogUserInfo;
