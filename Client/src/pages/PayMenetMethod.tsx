import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
} from "@mui/material";

import { usePayments } from "../hooks/usePayments";

const PayMenetMethod = () => {
  const { banks, handleCreateOrder } = usePayments();

  const [formData, setFormData] = useState({
    identificationType: "",
    identificationNumber: "",
    email: "",
    city: "",
    banksList: 0,
  });

  // Manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value, name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
              id="form-checkout__city"
              name="city"
              label="Ciudad"
              type="text"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
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
              onChange={handleChange}
            >
              <MenuItem value="natural">Natural</MenuItem>
              <MenuItem value="juridica">Jurídica</MenuItem>
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
              onChange={handleChange}
            >
              <MenuItem value="CC">CC</MenuItem>
              <MenuItem value="pasaporte">Pasaporte</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
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
        <Box>
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
          <Button type="submit" variant="contained" color="primary">
            Pagar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PayMenetMethod;
