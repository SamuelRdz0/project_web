import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasSpecialChar = /[^a-zA-Z0-9]/;
    const noConsecutiveNumbers = /^(?!.*(\d)\1)/;
    const noConsecutiveLetters = /^(?!.*([a-zA-Z])\1)/;

    if (!minLength.test(password)) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!hasLowerCase.test(password)) {
      return "La contraseña debe contener al menos una letra minúscula.";
    }
    if (!hasSpecialChar.test(password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
    if (!noConsecutiveNumbers.test(password)) {
      return "La contraseña no debe contener números consecutivos.";
    }
    if (!noConsecutiveLetters.test(password)) {
      return "La contraseña no debe contener letras consecutivas.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Usuario registrado');
    } catch (error) {
      setError('Error al registrar usuario: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        Create an account on <span className="text-[#7747ff]">App</span>
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Register to get started
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleRegister}>
        <div className="block relative">
          <label htmlFor="username" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div className="block relative">
          <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
