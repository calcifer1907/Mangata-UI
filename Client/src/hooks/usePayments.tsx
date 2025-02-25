import { useCallback, useEffect, useState } from "react";

import { apisMercadoPago } from "../utils/api/agent";
import { IBanksList } from "../interfaces/IMercadoPago";

export const usePayments = () => {
  const [banks, setBanks] = useState<IBanksList[]>([]);

  const handleBank = useCallback(async () => {
    const data = await apisMercadoPago.getListBanks();
    setBanks(data);
  }, []);

  const handleCreateOrderPSE = async (body: object) => {
    const data = (await apisMercadoPago.createOrderPSE(body)) as {
      redirectTo: string;
    };
    window.location.href = data.redirectTo;
  };

  useEffect(() => {
    handleBank();
  }, [handleBank]);

  return { banks, handleCreateOrderPSE };
};
