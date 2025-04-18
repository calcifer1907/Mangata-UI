/**
 * @author Carlos Taborda
 * @description this component show list data of the Accompanist
 * @version 1.0
 *
 */

/**Libreries */
import { Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/**Interface */
import { IAccompanistListSales } from "../../interfaces/IUser";

/**Component */
import Dialog from "./Dialog";
import LazyImage from "../LazyImage/LazyImage";

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  accompanist: IAccompanistListSales[];
}

export default function ScrollDialog({ accompanist, open, setOpen }: IProps) {
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} setOpenDialog={setOpen} tittle={t("persons")}>
      {accompanist.map((values) => (
        <Paper key={values.name_accompanist} sx={{ marginBottom: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <LazyImage
              src={`/images/lunche/${values.description
                .toLowerCase()
                .replaceAll(" ", "")}.jpg`}
            />

            <Typography
              sx={{
                color: "var(--color-theme-dark-blue)",
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
