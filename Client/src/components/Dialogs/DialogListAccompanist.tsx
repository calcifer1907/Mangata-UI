/**
 * @author Carlos Taborda
 * @description this component show list data of the Accompanist
 * @version 1.0
 *
 */

import { useState } from "react";

/**Libreries */
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Paper, Typography } from "@mui/material";

/**Interface */
import { IAccompanistListSales } from "../../interfaces/IUser";

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  accompanist: IAccompanistListSales[];
}

export default function ScrollDialog({ accompanist, open, setOpen }: IProps) {
  const [scroll] = useState<DialogProps["scroll"]>("paper");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Personas</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {accompanist.map((values) => (
            <Paper key={values.name_accompanist} sx={{ marginBottom: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <img
                  width="100%"
                  src={`/images/lunche/${values.description
                    .toLowerCase()
                    .replaceAll(" ", "")}.jpg`}
                />

                <Typography
                  sx={{
                    color: "var(--blueDarkLigth)",
                    fontWeight: 600,
                    fontSize: 22,
                    margin: 2,
                    textAlign: "center",
                  }}
                >
                  {values.name_accompanist}
                </Typography>
              </Box>
            </Paper>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
