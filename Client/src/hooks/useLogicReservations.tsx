import { useCallback, useEffect, useMemo } from "react";

import { getCodeReservation } from "../utils/api/agent";

import { useAccompanist } from "./useReservationContext";

import { useSearchParams, useNavigate } from "react-router-dom";
import { handleDiffHours } from "../generalFunctions/formatDate";

const useLogicReservations = () => {
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();

  const ID_PARAM = searchParams.get("id");

  const { dataCodeReservation, setDataCodeReservation, minmax } =
    useAccompanist();

  const requestGetCodeReservation = useCallback(async () => {
    try {
      if (ID_PARAM) {
        const currentDate = new Date();
        const response = await getCodeReservation({ code: ID_PARAM });
        const diff = new Date(response.created_at);
        const diffHours = handleDiffHours(currentDate, diff);

        // if (diffHours > 1) {
        //   navigator("/404");
        // }
        setDataCodeReservation(response);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        navigator("/404");
      }
    }
  }, [ID_PARAM, setDataCodeReservation, navigator]);

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
