import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bienvenido al Dashboard</p>
    </div>
  );
};

export default Dashboard;