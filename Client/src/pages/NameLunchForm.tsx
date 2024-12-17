import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import FieldRows from "../components/Accompanist/FieldRow";

// Definimos los tipos
interface Field {
  name: string;
  lunch: string;
}

interface FieldError {
  name: boolean;
  lunch: boolean;
}

const NameLunchForm: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([{ name: "", lunch: "" }]);
  const [errors, setErrors] = useState<FieldError[]>([]);

  // Opciones de almuerzos
  const lunchOptions = [
    { value: "pizza", label: "Pizza" },
    { value: "pasta", label: "Pasta" },
    { value: "salad", label: "Ensalada" },
    { value: "burger", label: "Hamburguesa" },
  ];

  // Maneja los cambios en los campos
  const handleChange = (index: number, fieldName: string, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
    setFields(updatedFields);

    // Limpiar errores al cambiar algo
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [fieldName]: value.trim() === "",
    };
    setErrors(updatedErrors);
  };

  // Valida que todos los campos estén llenos
  const validateFields = (): boolean => {
    const validationErrors = fields.map((field) => ({
      name: field.name.trim() === "",
      lunch: field.lunch.trim() === "",
    }));
    setErrors(validationErrors);
    return !validationErrors.some((error) => error.name || error.lunch);
  };

  // Agrega una nueva fila si la validación es exitosa
  const addField = () => {
    if (validateFields()) {
      setFields([...fields, { name: "", lunch: "" }]);
      setErrors([...errors, { name: false, lunch: false }]);
    } else {
      alert("Por favor, complete todos los campos antes de agregar más.");
    }
  };

  // Elimina una fila específica
  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setFields(updatedFields);
    setErrors(updatedErrors);
  };

  // Envía el formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      console.log("Datos enviados:", fields);
    } else {
      console.log("Por favor, complete todos los campos.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Agregar Nombres y Almuerzos
      </Typography>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <FieldRows
            key={index}
            index={index}
            field={field}
            errors={errors[index] || { name: false, lunch: false }}
            onChange={handleChange}
            onRemove={removeField}
            lunchOptions={lunchOptions}
          />
        ))}
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={addField}>
            Agregar más
          </Button>
          <Button type="submit" variant="contained" color="success">
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NameLunchForm;
