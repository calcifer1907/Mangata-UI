import ContextSale from "../../hooks/useSales/useContextSales";

import LIstOfCommissionAdmin from "./LIstOfCommissionAdmin";

const MainSales = () => {
  return (
    <ContextSale>
      <LIstOfCommissionAdmin />
    </ContextSale>
  );
};

export default MainSales;
