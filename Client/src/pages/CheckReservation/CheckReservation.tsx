import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import "./CheckReservation.css";

const CheckReservation = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="success.main"
          gutterBottom
        >
          Transacción Aprobada
        </Typography>

        {/* Método de pago */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Método de pago
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cuentas débito ahorro y corriente (PSE)
          </Typography>
        </Box>

        {/* Detalles de pago */}
        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total pagado</TableCell>
                <TableCell>Banco</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>$102.400,00</TableCell>
                <TableCell>BANCOLOMBIA</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Autorización / CUS</TableCell>
                <TableCell>Fecha de transacción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>702349048</TableCell>
                <TableCell>2024-06-13 16:19:07</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Recibo</TableCell>
                <TableCell>Dirección IP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1624586914</TableCell>
                <TableCell>181.51.32.29</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Código de respuesta */}
        <Box sx={{ marginBottom: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Código Respuesta
          </Typography>
          <Typography variant="body1" color="success.main">
            00
          </Typography>
        </Box>

        {/* Volver al comercio */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            El comprobante será enviado a <strong>tabordac2@gmail.com</strong>
          </Typography>
          <Button variant="contained" color="primary">
            Volver al comercio
          </Button>
        </Box>
      </Box>
      <div className="circus-tent">
        <div className="w-full"></div>
        <div className="absolute">
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
          <div className="rounded-full"></div>
        </div>
      </div>
    </Box>
  );
};

export default CheckReservation;
