import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

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

  return <Loading />;
};

export default Logout;
