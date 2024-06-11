import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No autorizado");
          return;
        }

        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: token },
        });

        setMessage(response.data);
      } catch (error) {
        setMessage("No autorizado");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Perfil</h2>
      <p>{message}</p>
    </div>
  );
};

export default Profile;
