import { useCallback, useEffect, useMemo, useState } from "react";

/**Rest Apis */
import { getMinMax, saveGenerateCode } from "../utils/api/agent";

/**Interface */
import { IMinMax } from "../interfaces/IAccompanist";

/**Context */
import { useContextUser } from "./useContextUser";

/**Functions */
import { formatDate } from "../generalFunctions/formatDate";
import { generarCodigoReservaUX2 } from "../generalFunctions/generateCodeReservation";

const useGenerateReservation = () => {
  const [valueSlider, setValueSlider] = useState<number | number[]>(0);

  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const [saveCodeReservation, setSaveCodeReservation] = useState<string>("");

  const { userInfo } = useContextUser();
  const { USER_INFO } = userInfo;

  const funcMinMax = useCallback(async () => {
    const { min, max } = await getMinMax.getListData();
    setMinMax({ MIN: Number(min), MAX: Number(max) });
    setValueSlider(Number(max));
  }, []);

  useEffect(() => {
    funcMinMax();
  }, [funcMinMax]);

  const CODE_RESERVATION = useMemo(() => {
    return generarCodigoReservaUX2();
  }, []);

  const onClickSaveButton = async () => {
    const body = {
      id: USER_INFO.ID_EMPLOYEE,
      code: CODE_RESERVATION,
      status: 200,
      min_price: minmax.MIN,
      agreed_price: valueSlider as number,
      created_at: formatDate(""),
    };
    const data = await saveGenerateCode(body);
    if (data.status === 201) {
      setSaveCodeReservation(data.code);
    }
  };

  return {
    setSaveCodeReservation,
    saveCodeReservation,
    setValueSlider,
    valueSlider,
    minmax,
    onClickSaveButton,
  };
};

export default useGenerateReservation;
