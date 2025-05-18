import { useContext } from "react";

import { CreateContext } from "./CreateContext";

export const useContextSales = () => {
  return useContext(CreateContext);
};
