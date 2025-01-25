import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("info");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    handleLogout();
  });

  return <div>Cerrando sesion...</div>;
};

export default Logout;
