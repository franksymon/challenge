import { useState } from 'react'
import '../style/login.css'
import { Link, Navigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Procesa la respuesta exitosa aquí
        const data = await response.json();
        console.log('Usuario autenticado:', data);
        return <Navigate to="/note" />;
        //<Link to="/note">   </Link>
      } else {
        // Maneja errores de autenticación
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red: ' + error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Agrega tus campos de entrada para email y contraseña aquí */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Iniciar sesión</button>
      

      <div className='wrapper-btn1'>
        <Link to="/signup">Registrarse</Link>
        <Link to="/reset-password">Res. contraseña</Link>
      </div>
   
    </form>
  );
}

export default Login;

