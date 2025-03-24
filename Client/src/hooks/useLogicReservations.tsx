import { useCallback, useEffect, useMemo } from "react";

import { getCodeReservation } from "../utils/api/agent";

import { useAccompanist } from "./useReservationContext";

import { useSearchParams } from "react-router-dom";

const useLogicReservations = () => {
  const [searchParams] = useSearchParams();

  const ID_PARAM = searchParams.get("id");

  const { dataCodeReservation, setDataCodeReservation, minmax } =
    useAccompanist();

  const requestGetCodeReservation = useCallback(async () => {
    try {
      if (ID_PARAM) {
        const response = await getCodeReservation({ code: ID_PARAM });
        setDataCodeReservation(response);
      }
    } catch (error) {
      return error;
    }
  }, [ID_PARAM, setDataCodeReservation]);

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
