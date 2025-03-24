import React, { useCallback, useEffect } from "react";

import { getCodeReservation } from "../utils/api/agent";
import { ISaveCodeGenerate } from "../interfaces/IReservation";

const useLogicReservations = () => {
  const [dataCodeReservation, setDataCodeReservation] =
    React.useState<ISaveCodeGenerate | null>(null);

  const requestGetCodeReservation = useCallback(
    async (body: { code: string }) => {
      try {
        const response = await getCodeReservation(body);
        setDataCodeReservation(response);
      } catch (error) {
        return error;
      }
    },
    []
  );

  useEffect(() => {
    requestGetCodeReservation();
  }, [requestGetCodeReservation]);

  return {};
};

export default useLogicReservations;
