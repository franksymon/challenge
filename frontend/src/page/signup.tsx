import { useState } from 'react';
import {  useNavigate } from 'react-router-dom'


function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    usuario: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Usuario registrado:', result);
        // Manejar el registro exitoso
        alert('Usuario registrado exitosamente');
        setFormData({
          firstName: '',
          lastName: '',
          usuario: '',
          email: '',
          password: ''
        })
        navigate('/note');

      } else {
        // Manejar errores de respuesta
        console.error('Error en el registro:', response);
      }
    } catch (error) {
      // Manejar errores de red
      console.error('Error de red:', error);
      alert('Error de red: ' + error);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <input
          type="text"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          placeholder="Usuario"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
}

export default Signup;
