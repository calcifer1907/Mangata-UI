/**
 * @author Carlos Taborda
 * @description this component show list data of the Accompanist
 * @version 1.0
 *
 */

/**Libreries */
import { Box, Paper, Typography } from "@mui/material";

/**Interface */
import { IAccompanistListSales } from "../../interfaces/IUser";

/**Component */
import Dialog from "./Dialog";

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  accompanist: IAccompanistListSales[];
}

export default function ScrollDialog({ accompanist, open, setOpen }: IProps) {
  return (
    <Dialog open={open} setOpenDialog={setOpen} tittle={"Personas"}>
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
    </Dialog>
  );
}
