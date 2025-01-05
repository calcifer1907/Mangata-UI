import {
  cloneElement,
  createContext,
  useMemo,
  useState,
  useContext,
  ReactNode,
  FC,
  isValidElement,
} from "react";

import { IUserInfo } from "../interfaces/ILogin";

interface IUserInfoContext {
  userInfo: IUserInfo;
  setUserInfo: (data: IUserInfo) => void;
}

const initialUserInfo = {
  TOKEN: "",
  USER_INFO: { ROLE: "", USER_NAME: "", ID_EMPLOYEE: 0 },
  MENU: [{ title: "", path: "" }],
};
const ContextUser = createContext<IUserInfoContext>({
  userInfo: initialUserInfo,
  setUserInfo: () => {},
});

interface IProps {
  children: ReactNode;
}

const ContextUSers: FC<IProps> = (props) => {
  const childrenWithProps = isValidElement(props.children)
    ? cloneElement(props.children, {
        ...props,
      })
    : props.children;

  const [userInfo, setUserInfo] = useState<IUserInfo>(() => {
    const saveData = localStorage.getItem("info");
    return saveData ? JSON.parse(saveData) : initialUserInfo;
  });

  const contextValues = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo]
  );

  return (
    <ContextUser.Provider value={contextValues}>
      {childrenWithProps}
    </ContextUser.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContextUser = () => useContext(ContextUser);

export default ContextUSers;
