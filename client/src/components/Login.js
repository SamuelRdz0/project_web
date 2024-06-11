import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login exitoso");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Usuario registrado");
    } catch (error) {
      setError(
        "Error al registrar usuario: " + (error.response?.data || error.message)
      );
    }
  };

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

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            checked={isFlipped}
            onChange={handleToggle}
          />
          <span className="slider"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleLogin}>
                <input
                  className="flip-card__input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nombre de usuario"
                />
                <input
                  className="flip-card__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
                <button type="submit" className="flip-card__btn">
                  Iniciar sesión
                </button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Register</div>
              <form className="flip-card__form" onSubmit={handleRegister}>
                <input
                  className="flip-card__input"
                  id="username"
                  value={username}
                  name="user"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nombre de usuario"
                  type="text"
                />
                <input
                  className="flip-card__input"
                  name="contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                  id="password"
                  value={password}
                />
                <button className="flip-card__btn" type="submit">
                  Confirm!
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;
