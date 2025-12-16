import { createContext, useMemo, useState, useContext } from "react";
import type { ReactNode, FC } from "react";

import { IUserInfo } from "../interfaces/ILogin";
import { initialUserInfo } from "../constant/userInfo";

interface IUserInfoContext {
  userInfo: IUserInfo;
  setUserInfo: (data: IUserInfo) => void;
}

const ContextUser = createContext<IUserInfoContext>({
  userInfo: initialUserInfo,
  setUserInfo: () => {},
});

interface IProps {
  children: ReactNode;
}

const ContextUSers: FC<IProps> = ({ children }) => {
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
      {children}
    </ContextUser.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContextUser = () => {
  const context = useContext(ContextUser);
  if (!context) {
    throw new Error("useUsers must be used within UserProvider");
  }
  return context;
};

export default ContextUSers;
