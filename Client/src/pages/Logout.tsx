import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("info");
    navigate("/Login");
  };

  useEffect(() => {
    handleLogout();
  });

  return <div>Logout</div>;
};

export default Logout;
