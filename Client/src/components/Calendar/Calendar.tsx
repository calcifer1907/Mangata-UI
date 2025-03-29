import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defecto

const RestrictedCalendar = () => {
  const [date, setDate] = useState(new Date());

  // Fecha máxima permitida (7 días después del actual)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  // Función para determinar qué días están deshabilitados
  const isDayBlocked = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Eliminamos la parte de la hora para comparar solo fechas

    // Bloqueamos días anteriores a hoy y posteriores a maxDate
    return day < today || day > maxDate;
  };

  const handleSelect = (date) => {
    setDate(date);
    console.log("Fecha seleccionada:", date);
  };

  return (
    <div>
      <h2>Calendario con restricciones</h2>
      <p>Solo puedes seleccionar entre hoy y {maxDate.toLocaleDateString()}</p>

      <Calendar
        date={date}
        onChange={handleSelect}
        minDate={new Date()} // Opcional: también puedes usar minDate para bloquear días anteriores
        disabledDay={isDayBlocked}
      />

      <p>Fecha seleccionada: {date.toLocaleDateString()}</p>
    </div>
  );
};

export default RestrictedCalendar;
