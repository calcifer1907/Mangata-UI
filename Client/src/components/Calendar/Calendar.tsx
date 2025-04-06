import { useEffect, useState, useRef } from "react";

/**Libreries */
import { Calendar } from "react-date-range";

/**Functions */
import { formatDate } from "../../generalFunctions/formatDate";

/**Components */
import TextFieldComponent from "../TextField/TextFieldComponent";

import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defectoo de calendario de react-icons
import { useTranslation } from "react-i18next";

const FORMAT_DATE = "DD-MM-YYYY";

interface IProps {
  callback: (date: string) => void;
}

const DatePickerWithIcon = ({ callback }: IProps) => {
  const initalDate = () => {
    return new Date();
  };
  const { t } = useTranslation("common");
  const [date, setDate] = useState<Date>(initalDate());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Configurar fecha máxima (opcional)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // 30 días en el futuro

  // Función para manejar el cambio de fecha
  const handleSelect = (date: Date) => {
    setDate(date);
    setShowCalendar(false);
    callback(formatDate(date.toISOString(), FORMAT_DATE));
  };

  // Función para bloquear días
  const isDayBlocked = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today || day > maxDate;
  };

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="date-picker-container"
      style={{ position: "relative", width: "250px" }}
    >
      <div onClick={() => setShowCalendar(!showCalendar)}>
        <TextFieldComponent
          value={formatDate(date.toISOString(), FORMAT_DATE)}
          onChange={() => {}}
          label={t("date")}
          placeholder={t("date")}
          type="text"
          iconName="calendar"
        />
      </div>

      {showCalendar && (
        <div
          ref={calendarRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            marginTop: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Calendar
            date={date}
            onChange={handleSelect}
            minDate={new Date()}
            disabledDay={isDayBlocked}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerWithIcon;
