// import { useContextUser } from "../hooks/useContextUser";

const Home = () => {
  // const { userInfo } = useContextUser();
  return (
    <>
      <div className="container mt-4">
        <h1>Bienvenidos a mi aplicación</h1>
        <p>Este es el contenido principal.</p>
        <a href="https://api.whatsapp.com/send?phone=573128198146&text=Hola como estas">
          click me
        </a>
      </div>
    </>
  );
};

export default Home;
