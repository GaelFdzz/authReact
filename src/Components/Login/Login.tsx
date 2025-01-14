import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Login.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Guarda el token

            // Redirige al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas o error en el servidor.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <p className="welcome-text">Bienvenido, por favor inicia sesión</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                </form>
                <button
                    className="register-button"
                    onClick={() => navigate('/register')}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}

export default Login;
