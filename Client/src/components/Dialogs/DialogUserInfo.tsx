import Dialog from "./Dialog";
import { IGetListSales } from "../../interfaces/IUser";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatDate } from "../../generalFunctions/formatDate";

import Today from "@mui/icons-material/Today";
import Email from "@mui/icons-material/Email";
import PhoneEnabled from "@mui/icons-material/PhoneEnabled";
import EventAvailable from "@mui/icons-material/EventAvailable";
import Tag from "@mui/icons-material/Tag";

import { Avatar } from "@mui/material";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentItem: IGetListSales | null;
}

const DialogUserInfo = ({ open, setOpen, currentItem }: IProps) => {
  const handleLetter = () => {
    const name = currentItem?.ACCOMPANIST[0]?.name_accompanist;
    if (name) {
      const arrayName = name.split(" ");
      let letter = arrayName[0].charAt(0);
      if (arrayName.length > 1) {
        letter += arrayName[1].charAt(0);
      }
      return { letter: letter.toUpperCase(), name };
    }
    return { letter: "", name: "" };
  };
  return (
    <Dialog
      open={open}
      setOpenDialog={setOpen}
      tittle=""
      fullScreen={false}
      showCancelButton
    >
      <Box width={300}>
        <Box className="d-flex justify-content-center align-items-center flex-direction-column gap-8 margin-buttom-16">
          <Avatar sx={{ width: 64, height: 64 }}>
            {handleLetter().letter}
          </Avatar>
          <Typography>{handleLetter().name}</Typography>
        </Box>
        <Box className="d-flex align-items-center gap-4 margin-buttom-8">
          <Email />
          <Box>
            <Typography className="color-blue-dark">Correo</Typography>
            <strong>{currentItem?.email}</strong>
          </Box>
        </Box>
        <Box className="d-flex align-items-center gap-4 margin-buttom-8">
          <PhoneEnabled />
          <Box>
            <Typography className="color-blue-dark">Celúlar</Typography>
            <strong>{currentItem?.telephone}</strong>
          </Box>
        </Box>
        <Box className="d-flex align-items-center gap-4 margin-buttom-8">
          <Tag />
          <Box>
            <Typography className="color-blue-dark">Cod de Reserva:</Typography>
            <strong>{currentItem?.code_reservation}</strong>
          </Box>
        </Box>
        <Box className="d-flex align-items-center gap-8 margin-buttom-8">
          <Today />
          <Box>
            <Typography className="color-blue-dark">
              Fecha de pasa día
            </Typography>
            <strong>{currentItem?.created_at}</strong>
          </Box>
        </Box>
        <Box className="d-flex align-items-center gap-8">
          <EventAvailable />
          <Box>
            <Typography className="color-blue-dark">
              Fecha de creación:
            </Typography>
            <strong>
              {currentItem?.created_on
                ? formatDate(currentItem.created_on)
                : "N/A"}
            </strong>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogUserInfo;
