/**
 * @author Carlos Taborda
 * @description this component show list data of the Accompanist
 * @version 1.0
 *
 */

import { useState, ReactNode, FC } from "react";

/**Libreries */
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IProps {
  children: ReactNode;
  props?: DialogProps;
  open: boolean;
  setOpenDialog: (data: boolean) => void;
  tittle: string;
  showCancelButton?: boolean;
  fullScreen?: boolean;
}

const ScrollDialog: FC<IProps> = ({
  children,
  setOpenDialog,
  open,
  tittle,
  showCancelButton = true,
  fullScreen = false,
}) => {
  const [scroll] = useState<DialogProps["scroll"]>();
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{tittle}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {children}
        </DialogContentText>
      </DialogContent>
      {showCancelButton && (
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ScrollDialog;
