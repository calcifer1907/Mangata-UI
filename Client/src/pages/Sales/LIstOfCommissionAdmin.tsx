/**
 * @author Carlos Taborda
 * @description This component is the loader to display the administrator commissions and reserve them per day.
 * @version 1.0
 *
 */

import { useState } from "react";

/**Libreries */
import Box from "@mui/material/Box";

/**Context */
import { useContextSales } from "../../hooks/useSales/useSalesContex";

/**Component */
import DialogListAccompanist from "../../components/Dialogs/DialogListAccompanist";
import CalendarPage from "../../components/Calendar/CalendarPage/CalendarPage";
import DialogUserInfo from "../../components/Dialogs/DialogUserInfo";

import MenuLeft from "./MenuLeft";
import Sales from "./Sales";
import { IGetListSales } from "../../interfaces/ISales";

const LIstOfCommissionAdmin = () => {
  const { dataList, setDataListFilter, arrayShowAccompanist } =
    useContextSales();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogUserInfo, setOpenDialogUserInfo] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<IGetListSales | null>(null);
  const [selectView, setSelectView] = useState<string>("Tabla");

  const handleOnchange = (value: string) => {
    const filter = dataList.filter((item) => {
      return `${item.code_reservation}${item.ACCOMPANIST[0].name_accompanist}`
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    setDataListFilter(value ? filter : dataList);
  };

  return (
    <Box className="d-flex " style={{ height: "100vh" }}>
      <MenuLeft
        callBack={handleOnchange}
        setSelectView={setSelectView}
        selectView={selectView}
      />

      {selectView === "Tabla" ? (
        <Sales
          setCurrentItem={setCurrentItem}
          setOpenDialog={setOpenDialog}
          setOpenDialogUserInfo={setOpenDialogUserInfo}
        />
      ) : (
        <CalendarPage />
      )}

      <DialogListAccompanist
        open={openDialog}
        setOpen={setOpenDialog}
        accompanist={arrayShowAccompanist}
      />
      {openDialogUserInfo && (
        <DialogUserInfo
          open={openDialogUserInfo}
          setOpen={setOpenDialogUserInfo}
          currentItem={currentItem}
        />
      )}
    </Box>
  );
};

export default LIstOfCommissionAdmin;
