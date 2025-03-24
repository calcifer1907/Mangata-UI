import { useCallback, useEffect, useMemo } from "react";

import { getCodeReservation } from "../utils/api/agent";

import { useAccompanist } from "./useReservationContext";

interface IProps {
  code: string;
}
const useLogicReservations = ({ code }: IProps) => {
  const { dataCodeReservation, setDataCodeReservation, minmax } =
    useAccompanist();

  const requestGetCodeReservation = useCallback(async () => {
    try {
      const response = await getCodeReservation({ code });
      setDataCodeReservation(response);
    } catch (error) {
      return error;
    }
  }, [code]);

  const PRICES = useMemo(
    () => ({
      PRICE_MAX: dataCodeReservation?.agreed_price ?? minmax.MAX,
      PRICE_MIN: dataCodeReservation?.min_price ?? minmax.MIN,
    }),
    [minmax, dataCodeReservation]
  );

  useEffect(() => {
    requestGetCodeReservation();
  }, [requestGetCodeReservation]);

  return { dataCodeReservation, PRICES };
};

export default useLogicReservations;
