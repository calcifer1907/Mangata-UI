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
}

const PayMenetMethod = ({ amount }: IProps) => {
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
    personType?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    city: "",
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
    if (handleValidationForm()) {
      handleCreateOrder(formData);
    }
  };

  return (
    <Container>
      <form
        id="form-checkout"
        method="post"
        onSubmit={handleSubmit}
        action="/PSEPayment"
      >
        <Box>
          <FormControl fullWidth margin="normal">
            <TextField
              required
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
              required
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
              required
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
              required
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
              helperText={"Campo obligatorio"}
            />
          </FormControl>
        </Box>
        <Box>
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
      </form>
    </Container>
  );
};

export default PayMenetMethod;
