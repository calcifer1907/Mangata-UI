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

import { STATUS_COLOR } from "../../generalFunctions/status";

import { checkReservation, getOrderIdBold } from "../../utils/api/agent";
import { useSearchParams, useNavigate } from "react-router-dom";

import "./CheckReservation.css";
import { useCallback, useEffect, useState } from "react";
import { StatusReservationType } from "../../interfaces/IStatusColor";
import { formatDate } from "../../generalFunctions/formatDate";
import { formatPrice } from "../../generalFunctions/formaters";

import Loading from "../../components/Loading/Loading";

const PAYMENT_METHODS = {
  BANCOLOMBIA_BUTTON: "Botón Bancolobia",
  PSE: "PSE",
  NEQUI: "NEQUI",
  CREDIT_CARD: "tarjetas de crédito/débito",
};

const CheckReservation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [infoCheckReservation, setInfoCheckReservation] = useState({
    code_reservation: "",
    status_reservation: "",
    email: "",
    created_at: "",
    total_payment: 0,
    payment_method: "",
  });
  const payment_id = searchParams.get("bold-order-id");

  const statusReservation = useCallback(async () => {
    try {
      if (payment_id) {
        setLoading(true);
        const response = await checkReservation.statusReservation({
          payment_id,
        });
        const { data } = (await getOrderIdBold({ order_id: payment_id })) as {
          data: { payment_method: string };
        };

        setInfoCheckReservation({
          ...response,
          payment_method: data.payment_method || "",
        });
        setLoading(false);
      }
    } catch (error: unknown) {
      setLoading(false);
      if (
        error instanceof Error &&
        (error as { status?: number }).status === 404
      ) {
        navigate("/404");
      }
    }
  }, [payment_id, navigate]);

  useEffect(() => {
    statusReservation();
  }, [statusReservation]);

  const handleLabelStatus = useCallback((status: string) => {
    const statusReservation = {
      approved: "Aprobado",
      pending: "Pendiente",
      in_process: "En proceso",
      rejected: "Rechazado",
    };
    return statusReservation[status as keyof typeof statusReservation];
  }, []);

  const navigateHome = () => {
    navigate("/");
  };

  if (loading) return <Loading />;

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
          marginTop: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px 8px 0 0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          color={
            STATUS_COLOR[
              infoCheckReservation.status_reservation as StatusReservationType
            ]
          }
          gutterBottom
        >
          Transacción{" "}
          {handleLabelStatus(infoCheckReservation.status_reservation)}
        </Typography>

        {/* Método de pago */}
        {/* <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Método de pago
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cuentas débito ahorro y corriente (PSE)
          </Typography>
        </Box> */}

        {/* Detalles de pago */}
        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total pagado</TableCell>
                <TableCell>Identificación de pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {formatPrice(infoCheckReservation.total_payment)}
                </TableCell>
                <TableCell>{payment_id}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pago realizado a</TableCell>
                <TableCell>Metodo de pago</TableCell>
                <TableCell>
                  Fecha de creación<nav></nav>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Mangata Beach Club</TableCell>
                <TableCell>
                  {
                    PAYMENT_METHODS[
                      infoCheckReservation.payment_method as keyof typeof PAYMENT_METHODS
                    ]
                  }
                </TableCell>
                <TableCell>
                  {formatDate(infoCheckReservation.created_at)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Código de respuesta */}
        <Box sx={{ marginBottom: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Código De Reserva
          </Typography>
          <Typography variant="body1" color="success.main">
            {infoCheckReservation.code_reservation}
          </Typography>
        </Box>

        {/* Volver al comercio */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            El comprobante será enviado a{" "}
            <strong>{infoCheckReservation.email}</strong>
          </Typography>
          <Button variant="contained" color="primary" onClick={navigateHome}>
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
