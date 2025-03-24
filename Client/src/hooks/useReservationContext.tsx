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

import { IMinMax, IOptions } from "../interfaces/IAccompanist";

const CreateContext = createContext<any>(true);

const AccompanistContext: FC<any> = (props) => {
  const childrenWithProps = cloneElement(props.children, {
    ...props,
    children: props.children.props.children,
  });
  const [optionsLunches, setOptionsLunches] = useState<IOptions[]>([]);
  const [minmax, setMinMax] = useState<IMinMax>({ MIN: 0, MAX: 0 });

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
    }),
    [optionsLunches, minmax]
  );

  return (
    <CreateContext.Provider value={valuesContext}>
      {childrenWithProps}
    </CreateContext.Provider>
  );
};

export const useAccompanist = () => {
  return useContext(CreateContext);
};

export default AccompanistContext;
