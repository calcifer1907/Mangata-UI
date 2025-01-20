import { useCallback, useEffect, useState } from "react";

import { apisMercadoPago } from "../utils/api/agent";
import { IBanksList } from "../interfaces/IMercadoPago";

export const usePayments = () => {
  const [banks, setBanks] = useState<IBanksList[]>([]);

  const handleBank = useCallback(async () => {
    const data = await apisMercadoPago.getListBanks();
    setBanks(data);
  }, []);

  const handleCreateOrder = async (body: any) => {
    const data = await apisMercadoPago.createOrder(body);
    window.location.href = data.redirectTo;
  };

  useEffect(() => {
    handleBank();
  }, [handleBank]);

  return { banks, handleCreateOrder };
};
