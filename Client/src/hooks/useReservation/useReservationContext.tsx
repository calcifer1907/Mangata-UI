import {
  useCallback,
  useEffect,
  useState,
  cloneElement,
  useMemo,
  FC,
  isValidElement,
} from "react";

import { getAccompanist, getMinMax } from "../../utils/api/agent";

import {
  IErrorFieldAccompanist,
  IFields,
  IMinMax,
  IOptions,
} from "../../interfaces/IAccompanist";
import { ISaveCodeGenerate } from "../../interfaces/IReservation";
import { IGetUserId } from "../../interfaces/IUser";
import { format } from "@formkit/tempo";
import { CreateContext } from "./CreateContextReservatin";
import { CountryType } from "../../interfaces/ICountry";

const today = format(new Date(), "YYYY-MM-DD", "co");

interface AccompanistContextProps {
  children: React.ReactNode;
}

const AccompanistContext: FC<AccompanistContextProps> = (props) => {
  const childrenWithProps = isValidElement(props.children)
    ? cloneElement(props.children, {
        ...props,
      })
    : props.children;
  const [optionsLunches, setOptionsLunches] = useState<IOptions[]>([]);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });
  const [getUserId, setGetUserId] = useState<IGetUserId | null>(null);
  const [valueCel, setValueCel] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [errors, setErrors] = useState<IErrorFieldAccompanist[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);

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
      loading,
      setLoading,
      selectedCountry,
      setSelectedCountry,
    }),
    [
      optionsLunches,
      loading,
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
      selectedCountry,
    ]
  );

  return (
    <CreateContext.Provider value={valuesContext}>
      {childrenWithProps}
    </CreateContext.Provider>
  );
};

export default AccompanistContext;
