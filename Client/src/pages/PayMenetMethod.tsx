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

const PayMenetMethod = () => {
  const { banks, handleCreateOrder } = usePayments();

  interface FormData {
    first_name: string;
    last_name: string;
    city: string;
    email: string;
    identificationType: string;
    identificationNumber: string;
    banksList: number;
    transaction_amount?: number;
  }

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    city: "",
    email: "",
    identificationType: "",
    identificationNumber: "",
    banksList: 0,
  });

  // Manejar cambios en los inputs
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.transaction_amount = 5000;
    handleCreateOrder(formData);

    console.log("Datos enviados:", formData);

    // Aquí puedes agregar lógica para enviar los datos a un servidor
    // Ejemplo: fetch('/api/endpoint', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <Container>
      <form id="form-checkout" method="post" onSubmit={handleSubmit}>
        <Box>
          <FormControl fullWidth margin="normal">
            <TextField
              variant="filled"
              id="form-checkout__city"
              name="first_name"
              label="Name"
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

          <FormControl fullWidth margin="normal">
            <TextField
              variant="filled"
              id="form-checkout__last_name"
              name="last_name"
              label="Apellido"
              type="text"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              variant="filled"
              id="form-checkout__city"
              name="city"
              label="Ciudad"
              type="text"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              variant="filled"
              id="form-checkout__email"
              name="email"
              label="E-mail"
              type="text"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="personType-label">Tipo de persona</InputLabel>
            <Select
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="identificationType-label">
              Tipo de documento
            </InputLabel>
            <Select
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
              variant="filled"
              id="form-checkout__identificationNumber"
              name="identificationNumber"
              label="Número de identificación"
              type="text"
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="banksList-label">Banco</InputLabel>
            <Select
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
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#fdb813" }}
          >
            Pagar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PayMenetMethod;
