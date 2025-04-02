import { useEffect, useState } from "react";

/** Libraries */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import { NavLink, useLocation } from "react-router-dom";

/**Components */
import NavListDrawer from "./NavListDrawer";

/**Hooks */
import { useContextUser } from "../../hooks/useContextUser";
import { itemsNav } from "../../constant/userInfo";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useTranslation } from "react-i18next";
import "../../i18n"; // Importa la configuración de i18n

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const settings = ["Cerrar sesión"];

const Navbar = (props: Props) => {
  const { window } = props;
  const location = useLocation();

  const { userInfo } = useContextUser();
  const [language, setLanguage] = useState<string>("es");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const root = document.getElementById("root");
    root?.style.setProperty(
      "overflow",
      location.pathname.includes("MangataReservation") ? "hidden" : "auto"
    );
  }, [location]);

  const { i18n } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        component="nav"
        sx={{ background: "#FCF8FF", height: 64 }}
        position="sticky"
      >
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ m: 2, display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Icon
              icon="solar:hamburger-menu-bold-duotone"
              width="32"
              height="32"
              style={{ color: "#2B3D5E" }}
            />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              paddingInlineEnd: 4,
              justifyContent: userInfo.TOKEN ? "space-between" : "flex-end",
              alignItems: "center",
            }}
          >
            <div></div>
            <Box>
              {userInfo.TOKEN ? (
                userInfo.MENU.map((item) => (
                  <Button
                    key={item.title}
                    sx={{ color: "#1C1B21" }}
                    to={`/${item.path}`}
                    component={NavLink}
                  >
                    {item.title}
                  </Button>
                ))
              ) : (
                <>
                  {itemsNav.map((item) => (
                    <Button
                      key={item.path}
                      sx={{ color: "#1C1B21" }}
                      to={item.path}
                      component={NavLink}
                    >
                      {item.title}
                    </Button>
                  ))}
                </>
              )}
            </Box>

            {userInfo.TOKEN && (
              <Box>
                <Tooltip title="Configuraciónes">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={userInfo.USER_INFO.USER_NAME} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting}>
                      <Button
                        key={setting}
                        sx={{ color: "#1C1B21" }}
                        to="/logout"
                        component={NavLink}
                      >
                        {setting}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            <Box sx={{ height: "100%" }}>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="color-theme-black"
              >
                {language}
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => changeLanguage("es")}>ES</MenuItem>
                <MenuItem onClick={() => changeLanguage("en")}>EN</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <NavListDrawer
            handleDrawerToggle={handleDrawerToggle}
            navItems={userInfo.MENU}
            token={userInfo.TOKEN}
          />
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
