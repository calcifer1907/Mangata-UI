import { useContext } from "react";

import { CreateContext } from "./CreateContextReservatin";

export const useContextAccompanist = () => {
  return useContext(CreateContext);
};
