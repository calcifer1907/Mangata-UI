import { MouseEvent } from "react";

/**Hooks */
import { useSales } from "../../hooks/useSales";

/**Libreries */
import { Icon } from "@iconify/react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FlatwareIcon from "@mui/icons-material/Flatware";

/**Functions */
import { formatDate } from "../../generalFunctions/formatDate";
import { formatPrice } from "../../generalFunctions/formaters";

/**Constants */
import { STATUS_COLOR } from "../../generalFunctions/status";
import { FC, useState } from "react";
import MenuOptions from "./MenuOptions";
import { IAccompanistListSales, IGetListSales } from "../../interfaces/IUser";

interface SaleListProps {
  dataList: IGetListSales[];
  dataListFilter: IGetListSales[];
  setOpenDialog: (open: boolean) => void;
  setArrayShowAccompanist: (accompanist: IAccompanistListSales[]) => void;
  setCurrentItem: (item: IGetListSales | null) => void;
  setOpenDialogUserInfo: (open: boolean) => void;
}

const FORMAT_DATE = "YYYY/MM/DD";

const SaleList: FC<SaleListProps> = ({
  dataList,
  dataListFilter,
  setOpenDialog,
  setArrayShowAccompanist,
  setCurrentItem,
  setOpenDialogUserInfo,
}) => {
  const { changeStatusReservation } = useSales({ page: "admin" });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [codeRe, setCodeRe] = useState<string>("");
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, code: string) => {
    setAnchorEl(event.currentTarget);
    setCodeRe(code);
  };
  const handleChangeStatus = (status: string) => {
    const changeStatus = dataList.findIndex(
      ({ code_reservation }) => code_reservation === codeRe
    );
    changeStatusReservation(codeRe, status).then(() => {
      dataList[changeStatus].status_reservation = status;
      handleClose();
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {dataListFilter.map((item) => (
        <Paper
          key={item.code_reservation}
          elevation={4}
          sx={{
            borderLeft: `2px solid ${
              STATUS_COLOR[item.status_reservation as keyof typeof STATUS_COLOR]
            }`,
            width: "auto",
            maxHeight: "100px",
            marginBlock: 1,
          }}
        >
          <Box
            className="d-flex flex-dirrection-row  justify-content-between hg-100 gap-8"
            sx={{
              padding: "8px",
            }}
          >
            <FlatwareIcon
              sx={{
                width: 24,
                height: 24,
                alignSelf: "center",
                color: "var(--color-theme-ligth-blue)",
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenDialog(true);
                setArrayShowAccompanist(item.ACCOMPANIST);
              }}
            />

            <Box>
              <Box className="d-flex flex-dirrection-row align-items-center gap-8">
                <Icon
                  icon="solar:user-bold-duotone"
                  style={{ height: "100%", cursor: "pointer" }}
                  width={16}
                  height={16}
                  onClick={() => {
                    setCurrentItem(item);
                    setOpenDialogUserInfo(true);
                  }}
                  color={
                    STATUS_COLOR[
                      item.status_reservation as keyof typeof STATUS_COLOR
                    ]
                  }
                />
                <Typography className="ellipsisText" style={{ width: "190px" }}>
                  {item.ACCOMPANIST[0].name_accompanist}
                </Typography>
              </Box>

              <Typography sx={{ fontWeight: 600 }}>
                {item.code_reservation}
              </Typography>
              <Typography>
                {formatDate(item.created_at, FORMAT_DATE)} -{" "}
                <Typography component="span" sx={{ fontWeight: 600 }}>
                  {formatPrice(
                    Number(item.commission_employee) * item.ACCOMPANIST.length
                  )}
                </Typography>
              </Typography>
            </Box>

            <Box>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{ height: "100%" }}
                onClick={(e) => {
                  if (item.status_reservation !== "approved")
                    handleClick(e, item.code_reservation);
                }}
                startIcon={
                  <Icon
                    icon={
                      item.status_reservation !== "approved"
                        ? "solar:pen-new-round-bold-duotone"
                        : "solar:unread-bold-duotone"
                    }
                    width={24}
                    height={24}
                    color="#2B3D5E"
                  />
                }
              />
              <MenuOptions
                handleChangeStatus={handleChangeStatus}
                anchorEl={anchorEl}
                handleClose={handleClose}
                open={open}
              />
            </Box>
          </Box>
        </Paper>
      ))}
    </>
  );
};

export default SaleList;
