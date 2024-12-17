/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useState,
  createContext,
  cloneElement,
  useMemo,
  useContext,
} from "react";

import { getAccompanist } from "../utils/api/agent";

import { IOptions } from "../interfaces/IAccompanist";

const CreateContext = createContext<any>(true);

const AccompanistContext = (props: any) => {
  const childrenWithProps = cloneElement(props.children, {
    ...props,
    children: props.children.props.children,
  });
  const [optionsLunches, setOptionsLunches] = useState<IOptions[]>([]);

  const getLunches = useCallback(async () => {
    const data = await getAccompanist.getLunches();
    const newOptions = data.map(({ ID, DESCRIPTION }) => ({
      value: ID,
      label: DESCRIPTION,
    }));
    setOptionsLunches(newOptions);
  }, []);

  useEffect(() => {
    getLunches();
  }, [getLunches]);

  const valuesContext = useMemo(
    () => ({
      optionsLunches,
      setOptionsLunches,
    }),
    [optionsLunches]
  );

  return (
    <CreateContext.Provider value={valuesContext}>
      {childrenWithProps}
    </CreateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccompanist = () => {
  return useContext(CreateContext);
};

export default AccompanistContext;
