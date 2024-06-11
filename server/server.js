const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mysecretkey";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "login",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

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

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).send(passwordError);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error al registrar usuario");
      }

      const token = jwt.sign({ id: result.insertId }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(201).json({ token });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error al iniciar sesión");
      }
      if (results.length === 0) {
        return res.status(401).send("Usuario no encontrado");
      }

      const user = results[0];
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ token });
      } else {
        res.status(401).send("Contraseña incorrecta");
      }
    }
  );
});

app.get("/profile", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Token no proporcionado");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    res.status(200).send(`Bienvenido, usuario ${decoded.id}`);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
