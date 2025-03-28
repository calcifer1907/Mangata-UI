/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useState,
  createContext,
  cloneElement,
  useMemo,
  useContext,
  FC,
} from "react";

import { getAccompanist, getMinMax } from "../utils/api/agent";

import {
  IErrorFieldAccompanist,
  IFields,
  IMinMax,
  IOptions,
} from "../interfaces/IAccompanist";
import {
  IAccompanistContext,
  ISaveCodeGenerate,
} from "../interfaces/IReservation";
import { IGetUserId } from "../interfaces/IUser";
import { format } from "@formkit/tempo";

const initialState: IAccompanistContext = {
  optionsLunches: [],
  setOptionsLunches: () => {},
  minmax: { MIN: 0, MAX: 0 },
  dataCodeReservation: null,
  setDataCodeReservation: () => {},
  getUserId: null,
  setGetUserId: () => {},
  fields: [{ name: "", lunch: { label: "", value: 0 } }],
  setFields: () => {},
  errors: [],
  setErrors: () => {},
  valueCel: "",
  setValueCel: () => {},
  valueEmail: "",
  setValueEmail: () => {},
  dateChange: "",
  setDateChange: () => {},
  openModal: false,
  setOpenModal: () => {},
  openDialogPayment: false,
  setOpenDialogPayment: () => {},
};

const CreateContext = createContext<IAccompanistContext>(initialState);

const today = format(new Date(), "YYYY-MM-DD", "co");
const AccompanistContext: FC<any> = (props) => {
  const childrenWithProps = cloneElement(props.children, {
    ...props,
    children: props.children.props.children,
  });
  const [optionsLunches, setOptionsLunches] = useState<IOptions[]>([]);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const [getUserId, setGetUserId] = useState<IGetUserId | null>(null);
  const [valueCel, setValueCel] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [errors, setErrors] = useState<IErrorFieldAccompanist[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [openDialogPayment, setOpenDialogPayment] = useState<boolean>(false);

  const [dateChange, setDateChange] = useState<string>(today);

  const [dataCodeReservation, setDataCodeReservation] =
    useState<ISaveCodeGenerate | null>(null);

  const [fields, setFields] = useState<IFields[]>([
    { name: "", lunch: { label: "", value: 0 } },
  ]);

  const getLunches = useCallback(async () => {
    const data = await getAccompanist.getLunches();
    const newOptions = data.map(({ id, description }) => ({
      value: id,
      label: description,
    }));
    setOptionsLunches(newOptions);
  }, []);

  const getMax = useCallback(async () => {
    const { min, max } = await getMinMax.getListData();
    setMinMax({ MIN: Number(min), MAX: Number(max) });
  }, []);

  useEffect(() => {
    getMax();
  }, [getMax]);

  useEffect(() => {
    getLunches();
  }, [getLunches]);

  const valuesContext = useMemo(
    () => ({
      optionsLunches,
      setOptionsLunches,
      minmax,
      dataCodeReservation,
      setDataCodeReservation,
      getUserId,
      setGetUserId,
      fields,
      setFields,
      errors,
      setErrors,
      valueCel,
      setValueCel,
      valueEmail,
      setValueEmail,
      dateChange,
      setDateChange,
      openModal,
      setOpenModal,
      openDialogPayment,
      setOpenDialogPayment,
    }),
    [
      optionsLunches,
      minmax,
      dataCodeReservation,
      getUserId,
      fields,
      errors,
      valueCel,
      valueEmail,
      dateChange,
      openModal,
      openDialogPayment,
    ]
  );

  return (
    <CreateContext.Provider value={valuesContext}>
      {childrenWithProps}
    </CreateContext.Provider>
  );
};
// Removed useAccompanist hook to comply with Fast Refresh requirements.
export const useAccompanist = () => {
  return useContext(CreateContext);
};

export default AccompanistContext;
