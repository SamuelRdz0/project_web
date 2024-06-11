import React, { useState } from "react";
import "./styles.css"; // Asegúrate de que los estilos se importen correctamente

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
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
              <form className="flip-card__form" action="">
                <input
                  className="flip-card__input"
                  name="user"
                  placeholder="Usuario"
                  type="text"
                />
                <input
                  className="flip-card__input"
                  name="contraseña"
                  placeholder="Contraseña"
                  type="password"
                />
                <button className="flip-card__btn" type="submit">
                  Join!
                </button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Register</div>
              <form className="flip-card__form" action="">
                <input
                  className="flip-card__input"
                  name="user"
                  placeholder="Usuario"
                  type="text"
                />
                <input
                  className="flip-card__input"
                  name="contraseña"
                  placeholder="Contraseña"
                  type="password"
                />
                <button className="flip-card__btn" type="submit">
                  Confirm!
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FlipCard;
