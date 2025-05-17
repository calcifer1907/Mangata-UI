/**Libreries */
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AttachMoneyRounded from "@mui/icons-material/AttachMoneyRounded";
import MoneyOffRounded from "@mui/icons-material/MoneyOffRounded";

interface ITatales {
  totalMoneyApproved: string;
  totalMoneyPendding: string;
  totalApproved: number;
  totalPendding: number;
}

type IProps = { totalSales: ITatales };

const style = {
  fontWeight: 600,
  fontSize: "1.5rem",
};
const BoxSales = ({ totalSales }: IProps) => {
  return (
    <Box className="d-flex flex-direction-column  align-items-center gap-4 hg-100">
      <Paper
        elevation={5}
        className="d-flex flex-direction-column  justify-content-around "
        style={{
          padding: "1rem",
          width: "250px",
          height: "50%",
          background:
            "linear-gradient(358deg,rgba(255, 255, 255, 0.5) 0%, rgba(70, 174, 50, 1) 100%)",
        }}
      >
        <Box>
          <Box
            sx={{
              p: 1,
              width: "max-content",
              height: "40px",
              borderRadius: "15px",
              color: "#FFF",
              background: "#46AE32",
            }}
          >
            <AttachMoneyRounded />
          </Box>
          <Typography
            style={{ marginTop: "1.8rem", color: "#FFF", fontWeight: 600 }}
          >
            Confirmadas
          </Typography>
        </Box>
        <Box pt={2}>
          <Typography style={{ ...style }}>
            {totalSales.totalMoneyApproved}
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            Total Confirmadas {totalSales.totalApproved}
          </Typography>
        </Box>
      </Paper>
      <Paper
        elevation={5}
        className="d-flex flex-direction-column  justify-content-around "
        style={{
          padding: "1rem",
          width: "250px",
          height: "50%",
          background:
            "linear-gradient(358deg,rgba(125, 28, 128, 0.5) 0%, rgba(255, 255, 255, 1) 100%)",
        }}
      >
        <Box>
          <Box
            sx={{
              p: 1,
              width: "max-content",
              height: "40px",
              borderRadius: "15px",
              background: "#7D1C80",
              color: "#FFF",
            }}
          >
            <MoneyOffRounded />
          </Box>
          <Typography
            style={{ marginTop: "1.8rem", color: "#FFF", fontWeight: 600 }}
          >
            Pendientes
          </Typography>
        </Box>
        <Box>
          <Typography style={style}>{totalSales.totalMoneyPendding}</Typography>
          <Typography sx={{ fontSize: 12 }}>
            Total Pendientes {totalSales.totalPendding}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BoxSales;
