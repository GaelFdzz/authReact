import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Para manejar errores
    const navigate = useNavigate();

    const validateInputs = () => {
        if (!email || !password) {
            setError('Todos los campos son obligatorios.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El email no es válido.');
            return false;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return false;
        }

        setError(null); // Limpia el error si todo es válido
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInputs()) {
            return; // Detén la ejecución si los campos no son válidos
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Error al registrarse.');
                return;
            }

            alert(data.message);
            navigate('/login'); // Redirige al login después del registro exitoso.
        } catch (error) {
            console.error('Error al registrarse:', error);
            setError('Error en el servidor. Intenta nuevamente más tarde.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Registrarse</h2>
                <p className="welcome-text">¡Crea tu cuenta para comenzar!</p>
                {error && <p className="error-text">{error}</p>} {/* Muestra el error */}
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Registrarse</button>
                </form>
                <button onClick={() => navigate('/login')} className="login-button">
                    Ir al Login
                </button>
            </div>
        </div>
    );
};

export default Register;
