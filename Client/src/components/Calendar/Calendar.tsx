import { useEffect, useState, useRef, useCallback } from "react";

/**Libreries */
import { Calendar } from "react-date-range";

/**Functions */
import { formatDate } from "../../generalFunctions/formatDate";

/**Components */
import TextFieldComponent from "../TextField/TextFieldComponent";

/**Apis */
import { getIsDayBlocked } from "../../utils/api/agent";

import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defectoo de calendario de react-icons
import { useTranslation } from "react-i18next";

const FORMAT_DATE = "YYYY-MM-DD";

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

  const [isDayBlocked, setIsDayBlocked] = useState<Date[]>([]);

  const apiGetIsDayBlocked = useCallback(async () => {
    try {
      const response = await getIsDayBlocked();
      const setDate = response.map((f) => {
        console.log(f.valid_date);
        const d = new Date(f.valid_date);
        console.log(d);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      });
      console.log(setDate);
      setIsDayBlocked(setDate);
    } catch (error) {
      console.error("Error al obtener el estado del día bloqueado:", error);
    }
  }, []);

  // Configurar fecha máxima (opcional)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // 30 días en el futuro

  // Función para manejar el cambio de fecha
  const handleSelect = (date: Date) => {
    setDate(date);
    setShowCalendar(false);
    callback(formatDate(date.toISOString(), FORMAT_DATE));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    apiGetIsDayBlocked();
  }, [apiGetIsDayBlocked]);

  const handlelastDayYear = (): Date => {
    const today = new Date();
    const lastDayYear = new Date(today.getFullYear(), 11, 31); // Último día del año actual
    return lastDayYear;
  };
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
            maxDate={handlelastDayYear()}
            disabledDates={isDayBlocked}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerWithIcon;
