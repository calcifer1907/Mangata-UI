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
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { format } from "@formkit/tempo";

/**Hooks */
import { useSales } from "../hooks/useSales";

/**Functions */
import { formatPrice } from "../generalFunctions/formaters";

/**Interface */
import { IAccompanistListSales, IGetListSales } from "../interfaces/IUser";

/**SVG */
import searchIcon from "../../src/assets/searchIcon.svg";

/**Component */
import DialogListAccompanist from "../components/Dialogs/DialogListAccompanist";

// import TableUI from "../components/TableUI/TableUI";
// import { GridColDef } from "@mui/x-data-grid";

const FORMAT_DATE = "YYYY-MM-DD";

const STATUS = {
  pendiente: "#7D1C80",
  cancelada: "#A93D3F",
  confirmada: "#46AE32",
};

const ListOfCommissions = () => {
  const { dataList, loading, dateChange, setDateChange } = useSales({
    page: "employee",
  });
  const [maxHeight, setMaxHeight] = useState<number>(window.innerHeight);
  const [dataListFilter, setDataListFilter] = useState<IGetListSales[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [arrayShowAccompanist, setArrayShowAccompanist] = useState<
    IAccompanistListSales[]
  >([]);

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filter = dataList.filter((item) =>
      item.code_reservation.includes(value.toUpperCase())
    );
    setDataListFilter(filter);
  };

  const updateMaxHeight = () => {
    setMaxHeight(window.innerHeight); // Usamos el alto del viewport
  };

  const handleFilterCode = () => {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    const value = searchInput.value;
    const filter = dataList.filter((item) =>
      item.code_reservation.includes(value.toUpperCase())
    );
    setDataListFilter(filter);
  };

  const handleCountComission = () => {
    const count = dataList.reduce((acc, item) => (acc += Number(item.DIFF)), 0);
    return formatPrice(count);
  };

  useEffect(() => {
    setDataListFilter(dataList);
  }, [dataList]);

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

          <Box
            sx={{
              backgroundColor: "#2B3D5E",
              height: 40,
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              gap: 10,
            }}
          >
            <Button
              size="small"
              sx={{
                textTransform: "none",
                fontSize: 14,
                color: "#FFFFFF",
              }}
              onClick={handleFilterCode}
            >
              Buscar
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            height: 48,
            backgroundColor: "#EAE7EF",
            width: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "28px",
            border: "1px solid #454559",
            maxWidth: 520,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: { xs: "8px", sm: "16px" },
              gap: 1,
              borderRight: "1px solid #454559",
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
              borderRight: "1px solid #454559",
            }}
          >
            <Icon
              icon="solar:user-bold-duotone"
              width={24}
              height={24}
              color="#A93D3F"
            />
            <Typography>Cancelada</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: { xs: "6px", sm: "16px" },
              gap: 1,
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
      <Box
        sx={{
          paddingInline: { xs: "10px", md: "40px", lg: "40px" },
          height: "56px",
          marginBottom: 2,
          maxWidth: "390px",
          minWidth: "200px",
        }}
      >
        <TextField
          fullWidth
          label="Fecha"
          variant="filled"
          margin="none"
          type="date"
          value={dateChange}
          onChange={(e) => setDateChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="solar:calendar-bold-duotone"
                    width="24"
                    height="24"
                    style={{ color: "#2B3D5E" }}
                  />
                </InputAdornment>
              ),
            },
          }}
          InputLabelProps={{
            shrink: true, // Asegura que la etiqueta permanezca arriba
          }}
          sx={{
            background: "#FFFFFF",
            borderRadius: "8px 8px 0 0",
          }}
        />
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
          {handleCountComission()}
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
                        STATUS[item.status_reservation as keyof typeof STATUS]
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
                      <Typography>{item.name_accompanist}</Typography>
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
