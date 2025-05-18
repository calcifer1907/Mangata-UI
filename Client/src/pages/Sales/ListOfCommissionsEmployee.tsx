/**
 * @author Carlos Taborda
 * @description This component is the loader to display the employee's commissions and reserve them per day.
 * @version 1.0
 *
 */

import { useState, ChangeEvent, useEffect } from "react";

/**Libreries */
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { format } from "@formkit/tempo";

/**Hooks */
import { useSales } from "../../hooks/useSales/useSales";

/**Context */
import { useContextSales } from "../../hooks/useSales/useSalesContex";

/**Functions */
import { formatPrice } from "../../generalFunctions/formaters";

/**Interface */
import { IAccompanistListSales, IGetListSales } from "../../interfaces/ISales";

/**SVG */
import searchIcon from "../../../src/assets/searchIcon.svg";

/**Component */
import DialogListAccompanist from "../../components/Dialogs/DialogListAccompanist";
import { STATUS_COLOR } from "../../generalFunctions/status";
import { DateRange } from "react-date-range";
import { InitialCalendar } from "../../constant/Calendar";
import ButtonComponent from "../../components/Buttons/ButtonComponent";

// import TableUI from "../components/TableUI/TableUI";
// import { GridColDef } from "@mui/x-data-grid";

const FORMAT_DATE = "YYYY-MM-DD";

const ListOfCommissions = () => {
  const {
    dataList,
    loading,
    setDateChange,
    dataListFilter,
    setDataListFilter,
  } = useContextSales();

  const { sumCommissionState } = useSales({
    page: "employee",
  });
  const [maxHeight, setMaxHeight] = useState<number>(window.innerHeight);
  const [openDialog, setOpenDialog] = useState(false);
  const [arrayShowAccompanist, setArrayShowAccompanist] = useState<
    IAccompanistListSales[]
  >([]);

  const [changeRangeDate, setChangeRangeDate] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>(InitialCalendar);

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filter = dataList.filter((item: IGetListSales) =>
      `${item.code_reservation}${
        item.ACCOMPANIST.length > 0 ? item.ACCOMPANIST[0].name_accompanist : ""
      }`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setDataListFilter(value ? filter : dataList);
  };

  const updateMaxHeight = () => {
    setMaxHeight(window.innerHeight); // Usamos el alto del viewport
  };

  const handleApllyRangeDate = () => {
    if (changeRangeDate) {
      setDateChange(changeRangeDate);
    }
  };

  useEffect(() => {
    // Actualizar al cargar
    updateMaxHeight();

    // Escuchar cambios de tamaño del viewport
    window.addEventListener("resize", updateMaxHeight);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  // const columns: GridColDef[] = [
  //   {
  //     field: "id",
  //     headerName: "Id",
  //     sortable: false,
  //     flex: 1,
  //   },
  //   {
  //     field: "code_reservation",
  //     headerName: "Id Reserva",
  //     sortable: false,
  //     flex: 3,
  //   },
  //   {
  //     field: "status_reservation",
  //     headerName: "Estado Reserva",
  //     sortable: false,
  //     flex: 3,
  //   },
  //   {
  //     field: "CURRENT_COMMISSION",
  //     headerName: "Precio Min",
  //     sortable: false,
  //     valueGetter: (value) => formatPrice(value as number),
  //     flex: 3,
  //   },
  //   {
  //     field: "COMMISSION_EMPLOYEE",
  //     headerName: "Se Vendio en",
  //     sortable: false,
  //     valueGetter: (value) => formatPrice(value as number),
  //     flex: 3,
  //   },
  //   {
  //     field: "DIFF",
  //     headerName: "Comision",
  //     valueGetter: (value) => formatPrice(value as number),
  //     sortable: false,
  //     flex: 3,
  //   },
  //   {
  //     field: "created_at",
  //     headerName: "Fecha Creación",
  //     sortable: false,
  //     valueGetter: (value) => format(value, FORMAT_DATE),
  //     flex: 3,
  //   },
  // ];

  // if (loading) {
  //   return (
  //     <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ paddingTop: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 2,
          paddingInline: { xs: "10px", md: "40px", lg: "40px" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              height: 48,
              backgroundColor: "#EAE7EF",
              width: "100%",
              maxWidth: "390px",
              minWidth: "200px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "28px",
            }}
          >
            <input
              id="searchInput"
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
            <img src={searchIcon} style={{ paddingInlineEnd: "18px" }} />
          </Box>
        </Box>

        <Box sx={{ height: "auto", width: "auto" }}>
          <Box
            sx={{
              backgroundColor: "#EAE7EF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "28px",
              border: "1px solid #454559",
              flexWrap: "wrap",
              maxWidth: 612,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "8px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#7D1C80"
              />
              <Typography>Sin pago</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "8px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#C6A02F"
              />
              <Typography>Cancelada</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "8px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#A93D3F"
              />
              <Typography>Rechazada Bank.</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: { xs: "6px", sm: "16px" },
                gap: 1,
                height: "100%",
                minHeight: 48,
              }}
            >
              <Icon
                icon="solar:user-bold-duotone"
                width={24}
                height={24}
                color="#46AE32"
              />
              <Typography>Confirmada</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderBottom: "6px solid #2B3D5E",
          width: "85%",
          marginBottom: 1,
        }}
      >
        <h2
          style={{
            fontSize: 36,
            color: "#2B3D5E",
            fontWeight: 800,
            marginInlineStart: 24,
          }}
        >
          Comision por diá
        </h2>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 400,
            color: "#2B3D5E",
            marginInlineStart: 3,
            marginBottom: 2,
          }}
        >
          {formatPrice(sumCommissionState)}
        </Typography>
      </Box>

      <Container
        sx={{
          height: "auto",
          overflowY: "auto",
          maxHeight: maxHeight - 250,
          paddingBottom: 1,
        }}
      >
        <Paper className="margin-buttom-8" sx={{ p: 1 }} elevation={3}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              const { startDate, endDate } = item.selection;
              setChangeRangeDate({
                startDate: startDate || new Date(),
                endDate: endDate || new Date(),
                key: "selection",
              });
            }}
            moveRangeOnFirstSelection={false}
            ranges={[changeRangeDate]}
          />
          <Box slot="end" className="d-flex justify-content-end">
            <ButtonComponent
              iconName=""
              title="Aplicar"
              onClick={handleApllyRangeDate}
              background="background-color-button-dark-blue"
            />
          </Box>
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", lg: "flex-start" },
            gap: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {dataListFilter.map((item) => (
                <Paper
                  key={item.code_reservation}
                  elevation={3}
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "auto",
                    height: "auto",
                    flexWrap: "wrap",
                    minWidth: 210,
                    backgroundColor: "#E5E1E9",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      paddingBlock: "8px",
                      paddingInline: "16px",
                      gap: 2,
                    }}
                  >
                    <Icon
                      icon="solar:user-bold-duotone"
                      width={32}
                      height={32}
                      color={
                        STATUS_COLOR[
                          item.status_reservation as keyof typeof STATUS_COLOR
                        ]
                      }
                      onClick={() => {
                        setOpenDialog(true);
                        setArrayShowAccompanist(item.ACCOMPANIST);
                      }}
                      style={{ height: "100%", cursor: "pointer" }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.code_reservation}
                      </Typography>
                      <Typography>
                        {format(item.created_at, FORMAT_DATE, "co")}
                      </Typography>
                      <Typography>
                        {item.ACCOMPANIST.length > 0
                          ? item.ACCOMPANIST[0].name_accompanist
                          : ""}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </>
          )}
        </Box>
        <DialogListAccompanist
          open={openDialog}
          setOpen={setOpenDialog}
          accompanist={arrayShowAccompanist}
        />
        {/* {dataList.length > 0 && <TableUI data={dataList} columns={columns} />} */}
      </Container>
    </Box>
  );
};

export default ListOfCommissions;
