import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ISalesData } from "../../interfaces/IReservation";

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ salesData }: { salesData: ISalesData[] }) => {
  // Procesar los datos
  // Procesar datos para contar ventas por día
  const groupedByDate = salesData.reduce(
    (
      acc: Record<string, { pending: number; approved: number }>,
      reservation
    ) => {
      const date = reservation.created_at;
      if (!acc[date]) {
        acc[date] = { pending: 0, approved: 0 };
      }
      const status = reservation.status_reservation as "pending" | "approved";
      acc[date][status]++;
      return acc;
    },
    {}
  );

  // Ordenar las fechas cronológicamente
  const sortedDates = Object.keys(groupedByDate).sort();

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: "Pendientes",
        data: sortedDates.map((date) => groupedByDate[date].pending || 0),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Aprobadas",
        data: sortedDates.map((date) => groupedByDate[date].approved || 0),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Reservas por Fecha y Estado",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha de creación",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de reservas",
        },
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
      <div style={{ marginTop: "20px" }}>
        <h3>Detalle por fecha:</h3>
      </div>
    </div>
  );
};

export default SalesChart;
