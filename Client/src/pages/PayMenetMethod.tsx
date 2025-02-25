import { useState } from "react";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import { usePayments } from "../hooks/usePayments";

interface IProps {
  amount: number;
  payment_id: number;
}

const PayMenetMethod = ({ amount, payment_id }: IProps) => {
  const { banks, handleCreateOrderPSE } = usePayments();

  interface FormData {
    first_name: string;
    email: string;
    identificationType: string;
    identificationNumber: string;
    banksList: number;
    transaction_amount?: number;
    personType?: string;
    payment_id?: number;
  }

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    email: "",
    identificationType: "",
    identificationNumber: "",
    banksList: 0,
    personType: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidationForm = () => {
    let flag = true;
    Object.values(formData).forEach((value) => {
      if (value === "" || value === 0) {
        flag = false;
      }
    });
    return flag;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.transaction_amount = amount;
    formData.payment_id = payment_id ?? 0;
    if (handleValidationForm()) {
      handleCreateOrderPSE(formData);
    }
  };

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Box
        component="form"
        id="form-checkout"
        method="post"
        onSubmit={handleSubmit}
        action="/PSEPayment"
        sx={{ maxWidth: { xs: "100%", md: "80%" }, margin: "0 auto" }}
      >
        <Box>
          <h3
            style={{
              color: "var(--blueDarkLigth)",
              textTransform: "uppercase",
            }}
          >
            Información bancaria
          </h3>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="banksList-label">Banco</InputLabel>
              <Select
                required
                labelId="banksList-label"
                id="banksList"
                name="banksList"
                variant="filled"
                onChange={handleChange}
              >
                {banks.map((bankItem) => (
                  <MenuItem key={bankItem.description} value={bankItem.id}>
                    {bankItem.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="personType-label">Tipo de persona</InputLabel>
              <Select
                required
                labelId="personType-label"
                id="form-checkout__personType"
                name="personType"
                variant="filled"
                onChange={handleChange}
              >
                <MenuItem value="individual">Natural</MenuItem>
                <MenuItem value="association">Jurídica</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <h3
            style={{
              color: "var(--blueDarkLigth)",
              textTransform: "uppercase",
            }}
          >
            Información del titular
          </h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <FormControl fullWidth margin="normal">
              <TextField
                required
                variant="filled"
                id="form-checkout__city"
                name="first_name"
                label="Nombre y Apellidos"
                type="text"
                onChange={(event) =>
                  handleChange(
                    event as React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  )
                }
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl fullWidth margin="normal">
                <InputLabel id="identificationType-label">
                  Tipo de documento
                </InputLabel>
                <Select
                  required
                  labelId="identificationType-label"
                  id="form-checkout__identificationType"
                  name="identificationType"
                  variant="filled"
                  onChange={handleChange}
                >
                  <MenuItem value="CC">CC</MenuItem>
                  <MenuItem value="NIT">NIT</MenuItem>
                  <MenuItem value="pasaporte">Pasaporte</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  required
                  variant="filled"
                  id="form-checkout__identificationNumber"
                  name="identificationNumber"
                  label="Número de identificación"
                  type="text"
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Box>
          <FormControl fullWidth margin="normal">
            <TextField
              required
              variant="filled"
              id="form-checkout__email"
              name="email"
              label="E-mail"
              type="text"
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        <Box sx={{ textAlign: "end" }}>
          <input
            type="hidden"
            name="transactionAmount"
            id="transactionAmount"
            value="100"
          />
          <input
            type="hidden"
            name="description"
            id="description"
            value="Nome do Produto"
          />
          <Button type="submit" variant="contained">
            Pagar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PayMenetMethod;
