import ListOfCommissionsEmployee from "./ListOfCommissionsEmployee";

import ContextSales from "../../hooks/useSales/useContextSales";

const MainCommisionEmployee = () => {
  return (
    <ContextSales>
      <ListOfCommissionsEmployee />
    </ContextSales>
  );
};

export default MainCommisionEmployee;
