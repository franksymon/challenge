import React, { useState } from 'react';

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/rest-password/userid/your_user_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: formData.newPassword }),
      });

      if (response.ok) {
        console.log('Contraseña restablecida correctamente');
        // Manejar el éxito del restablecimiento
      } else {
        // Manejar errores de respuesta
        console.error('Error al restablecer la contraseña:', response);
      }
    } catch (error) {
      // Manejar errores de red
      console.error('Error de red:', error);
    }
  };

  return (
    <>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Nueva contraseña"
        />
        <button type="submit">Restablecer contraseña</button>
      </form>
    </>
  );
}

export default ResetPassword;
