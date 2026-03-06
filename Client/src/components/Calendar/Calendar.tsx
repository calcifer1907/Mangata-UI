import { useEffect, useState, useRef, useCallback } from "react";

/**Libreries */
import { Calendar } from "react-date-range";

/**Functions */
import { formatDate } from "../../generalFunctions/formatDate";

/**Components */
import TextFieldComponent from "../TextField/TextFieldComponent";

/**Apis */
import { getIsDayBlocked, boat } from "../../utils/api/agent";

import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // Estilos principales
import "react-date-range/dist/theme/default.css"; // Tema por defectoo de calendario de react-icons
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const FORMAT_DATE = "YYYY-MM-DD";

interface IProps {
  callback: (date: string) => void;
  where?: string;
  returnDate?: (date: string) => void;
}

const DatePickerWithIcon = ({ callback, where, returnDate }: IProps) => {
  const initalDate = () => {
    return addDays(new Date(), 1);
  };
  const { t } = useTranslation("common");
  const [date, setDate] = useState<Date>(initalDate());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const [isDayBlocked, setIsDayBlocked] = useState<Date[]>([new Date()]);

  const handleRecursiveBlockedDates = useCallback(
    (response: string[], days = 1): void => {
      const currentDate = formatDate(addDays(new Date(), days), "YYYY/MM/DD");

      const findDate = response.includes(currentDate);

      if (findDate) {
        const newDays = days + 1;
        handleRecursiveBlockedDates(response, newDays);
      } else {
        setDate(new Date(currentDate));
        if (returnDate) {
          returnDate(currentDate);
        }
      }
    },
    [],
  );

  const apiGetIsDayBlocked = useCallback(async () => {
    try {
      let response = [];
      if (where === "boatReservation") {
        const today = formatDate(new Date().toISOString(), "YYYY-MM-DD");
        response = await boat.getBlockCalendar({
          currentDate: today,
        });
        const dates = response.map((item) => item.valid_date);
        if (response.length > 0) {
          handleRecursiveBlockedDates(dates);
        } else {
          if (returnDate) {
            returnDate(formatDate(date, FORMAT_DATE));
          }
        }
      } else {
        response = await getIsDayBlocked();
      }
      const setDate = response.map((f) => {
        const d = new Date(f.valid_date);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      });
      setIsDayBlocked((prev) => [...prev, ...setDate]);
    } catch (error) {
      console.error("Error al obtener el estado del día bloqueado:", error);
    }
  }, [where, handleRecursiveBlockedDates]);

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
    <div className="date-picker-container" style={{ position: "relative" }}>
      <Box
        onClick={() => setShowCalendar(!showCalendar)}
        sx={{
          maxWidth: { md: 328, lg: 328 },
        }}
      >
        <TextFieldComponent
          value={formatDate(date.toISOString(), FORMAT_DATE)}
          onChange={() => {}}
          label={t("date")}
          placeholder={t("date")}
          type="text"
          iconName="calendar"
        />
      </Box>

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
