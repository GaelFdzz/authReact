import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }
  }, [navigate]);

  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ventas",
        data: [300, 500, 400, 700, 600],
        backgroundColor: "#ffde59",
        borderColor: "#ffb800",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Producto A", "Producto B", "Producto C"],
    datasets: [
      {
        data: [35, 25, 40],
        backgroundColor: ["#ffde59", "#4caf50", "#2196f3"],
        hoverBackgroundColor: ["#ffb800", "#388e3c", "#1976d2"],
      },
    ],
  };

  const lineData = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    datasets: [
      {
        label: "Usuarios activos",
        data: [50, 70, 100, 90, 120],
        fill: true,
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: "#2196f3",
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <aside className="sidebar">
          <div className="menu-item">
            <span role="img" aria-label="home">
              🏠
            </span>{" "}
            HOME
          </div>
          <div className="menu-options">
            <div className="option-item">📊 Dashboard</div>
            <div className="option-item">📈 Reportes</div>
            <div className="option-item">⚙️ Ajustes</div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </aside>
        <main className="main-content">
          <div className="header-box"></div>
          <div className="content-boxes">
            <div className="chart-box">
              <Bar data={barData} />
            </div>
            <div className="chart-box">
              <Doughnut data={doughnutData} />
            </div>
            <div className="chart-box">
              <Line data={lineData} />
            </div>
          </div>
          <div className="text-box">
            Aquí se pueden agregar descripciones o análisis sobre los datos
            presentados en los gráficos.
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;