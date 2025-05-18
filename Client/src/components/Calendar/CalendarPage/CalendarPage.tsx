import { useState } from "react";
import {
  Box,
  Typography,
  // List,
  // ListItem,
  // ListItemText,
  // Paper,
  IconButton,
  Chip,
} from "@mui/material";

import { ChevronLeft, ChevronRight, Event } from "@mui/icons-material";

import {
  format,
  addMonths,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";

import { es } from "date-fns/locale";

type Event = {
  id: string;
  title: string;
  time: string;
  location: string;
  date: Date;
  category: string;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const events: Event[] = [
    {
      id: "1",
      title: "Reunión con el equipo",
      time: "09:00 - 10:30",
      location: "Oficina Principal",
      date: new Date(2025, 4, 15),
      category: "Trabajo",
    },
    {
      id: "2",
      title: "Cita médica",
      time: "11:00 - 11:45",
      location: "Clínica San José",
      date: new Date(2025, 4, 15),
      category: "Salud",
    },
    {
      id: "3",
      title: "Almuerzo con cliente",
      time: "13:00 - 14:30",
      location: "Restaurante La Casona",
      date: new Date(2025, 4, 16),
      category: "Trabajo",
    },
    {
      id: "4",
      title: "Gimnasio",
      time: "18:00 - 19:30",
      location: "Centro Deportivo",
      date: new Date(2025, 4, 18),
      category: "Personal",
    },
    {
      id: "5",
      title: "Revisión de proyecto",
      time: "10:00 - 12:00",
      location: "Oficina de Desarrollo",
      date: new Date(2025, 4, 20),
      category: "Trabajo",
    },
  ];

  const handlePrevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderCalendarHeader = () => {
    return (
      <Box className="d-flex justify-content-between align-items-center" mb={2}>
        <IconButton onClick={handlePrevMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" component="div">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>
    );
  };

  const renderDayNames = () => {
    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    return (
      <Box display="flex">
        {dayNames.map((day) => (
          <Box key={day} width="calc(100% / 7)" py={1} textAlign="center">
            <Typography variant="caption" color="textSecondary">
              {day}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Añadir días del mes anterior para completar la primera semana
    const startDay = start.getDay() === 0 ? 6 : start.getDay() - 1; // Ajuste para que lunes sea el primer día
    const prevMonthDays = [];
    for (let i = startDay; i > 0; i--) {
      prevMonthDays.push(
        <Box
          key={`prev-${i}`}
          width="calc(100% / 7)"
          height={100}
          p={1}
          border={1}
          borderColor="divider"
          bgcolor="action.hover"
        />
      );
    }

    // Días del mes actual
    const currentMonthDays = days.map((day) => {
      const dayEvents = events.filter((event) => isSameDay(event.date, day));
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentDay = isToday(day);

      return (
        <Box
          key={day.toString()}
          width="calc(100% / 7)"
          height={100}
          p={1}
          border={1}
          borderColor="divider"
          onClick={() => setSelectedDate(day)}
          sx={{
            cursor: "pointer",
            backgroundColor: isSelected ? "primary.light" : "background.paper",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="body2"
              color={isCurrentDay ? "primarymain" : "text.primary"}
              fontWeight={isCurrentDay ? "bold" : "normal"}
            >
              {format(day, "d")}
            </Typography>
            {dayEvents.length > 0 && <Event color="action" fontSize="small" />}
          </Box>
          <Box mt={1}>
            {dayEvents.slice(0, 2).map((event) => (
              <Chip
                key={event.id}
                label={event.title}
                size="small"
                sx={{
                  mb: 0.5,
                  width: "100%",
                  justifyContent: "flex-start",
                  fontSize: "0.6rem",
                  height: 20,
                  backgroundColor: "#e0f7fa",
                }}
              />
            ))}
            {dayEvents.length > 2 && (
              <Typography variant="caption" color="textSecondary">
                +{dayEvents.length - 2} más
              </Typography>
            )}
          </Box>
        </Box>
      );
    });

    // Combinar y renderizar todos los días
    return (
      <Box display="flex" flexWrap="wrap">
        {prevMonthDays}
        {currentMonthDays}
      </Box>
    );
  };

  // const renderSelectedDateEvents = () => {
  //   const dayEvents = events.filter((event) =>
  //     isSameDay(event.date, selectedDate)
  //   );

  //   return (
  //     <Box mt={4}>
  //       <Typography variant="h6" gutterBottom>
  //         {format(selectedDate, "EEEE d MMMM", { locale: es })}
  //       </Typography>
  //       {dayEvents.length > 0 ? (
  //         <List className="d-flex flex-column gap-8">
  //           {dayEvents.map((event) => (
  //             <Paper
  //               key={event.id}
  //               elevation={2}
  //               sx={{ mb: 2 }}
  //               style={{ maxWidth: 320, width: "100%" }}
  //             >
  //               <ListItem>
  //                 <ListItemText
  //                   primary={event.title}
  //                   secondary={
  //                     <>
  //                       <Box component="span" display="block">
  //                         {event.time}
  //                       </Box>
  //                       <Box display="flex" alignItems="center" mt={0.5}>
  //                         <LocationOn fontSize="small" color="action" />
  //                         <Typography
  //                           variant="body2"
  //                           color="text.secondary"
  //                           ml={0.5}
  //                         >
  //                           {event.location}
  //                         </Typography>
  //                       </Box>
  //                     </>
  //                   }
  //                 />
  //                 <Chip label={event.category} size="small" color="primary" />
  //               </ListItem>
  //             </Paper>
  //           ))}
  //         </List>
  //       ) : (
  //         <Typography variant="body2" color="text.secondary">
  //           No hay eventos programados para este día
  //         </Typography>
  //       )}
  //     </Box>
  //   );
  // };

  return (
    <Box display="flex" width="70%">
      {/* Sidebar */}

      {/* Main content */}
      <Box flex={1} p={3}>
        {renderCalendarHeader()}
        {renderDayNames()}
        {renderCalendarDays()}
        {/* {renderSelectedDateEvents()} */}
      </Box>
    </Box>
  );
};

export default Calendar;
