import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface IProps {
  handleChangeStatus: (status: string) => void;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
}

const MenuOptions = ({
  anchorEl,
  handleClose,
  handleChangeStatus,
  open,
}: IProps) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={() => handleChangeStatus("approved")}>
        Confirmar
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleChangeStatus("cancel");
        }}
      >
        Cancelar
      </MenuItem>
    </Menu>
  );
};

export default MenuOptions;
