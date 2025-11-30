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
import { useTranslation } from "react-i18next";
import "../../i18n"; // Importa la configuración de i18n

import "./styleNavbar.css";

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

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
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

  const { i18n, t } = useTranslation("home");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box component="header">
      <Box className="bar-language">
        <Box className="top-bar d-flex justify-content-between align-items-center px-3  hg-100 width-nav-80">
          <Box className="languages">
            <ul className="d-flex justify-content-center align-items-center gap-8 li-language">
              <li
                className="color-theme-white"
                onClick={() => changeLanguage("es")}
              >
                {t("es")}
              </li>
              <li
                className="color-theme-white"
                onClick={() => changeLanguage("en")}
              >
                {t("en")}
              </li>
            </ul>
          </Box>
          <Box className="container-social-media">
            <Box className="d-flex justify-content-center align-items-center gap-8">
              <a
                href="https://www.instagram.com/mangatacartagena"
                target="_blank"
                rel="noreferrer"
                className="icon-social"
              >
                <img src="/images/instagram.svg" width={28} />
              </a>
              <a
                href="https://www.tiktok.com/@mangatacartagena"
                target="_blank"
                rel="noreferrer"
                className="icon-social"
              >
                <img src="/images/TikTok.svg" width={22} />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
      <AppBar
        component="nav"
        sx={{ background: "#f1ece6", height: 80, width: "100%" }}
        position="sticky"
      >
        <Box className="width-nav-80">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
            >
              <Icon
                icon="solar:hamburger-menu-bold-duotone"
                width="32"
                height="32"
                style={{ color: "#1C1B21" }}
              />
            </IconButton>

            <Box
              className=" align-items-center justify-content-between wd-100"
              sx={{
                display: { xs: "none", md: "flex", height: 90 },
              }}
            >
              <Box className="title-mangta">
                <h1>mangata</h1>
              </Box>
              <Box className="d-flex align-items-center">
                {userInfo.TOKEN ? (
                  userInfo.MENU.map((item) => (
                    <Button
                      key={item.title}
                      to={`/${item.path}`}
                      component={NavLink}
                      className="navegation-a"
                    >
                      {item.title}
                    </Button>
                  ))
                ) : (
                  <>
                    {itemsNav.map((item) => (
                      <Button
                        key={item.path}
                        className="navegation-a"
                        to={item.path}
                        component={NavLink}
                      >
                        {t(item.title)}
                      </Button>
                    ))}
                  </>
                )}
                <Box className="d-flex align-items-center ">
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
                              sx={{ color: "#1d1d1d", fontFamily: "Jost" }}
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
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </Box>
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
            changeLanguage={changeLanguage}
          />
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
