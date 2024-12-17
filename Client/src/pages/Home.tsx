import { useContextUser } from "../hooks/useContextUser";

const Home = () => {
  const { userInfo } = useContextUser();
  return (
    <>
      <div className="container mt-4">
        <h1>Bienvenido a mi aplicación</h1>
        <p>Este es el contenido principal.</p>
      </div>
    </>
  );
};

export default Home;
