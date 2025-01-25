import { useEffect, useState } from "react";

/** Libraries */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

/**Components */
import NavListDrawer from "./NavListDrawer";

/**Hooks */
import { useContextUser } from "../../hooks/useContextUser";
import { navItems } from "../../constant/userInfo";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

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

  useEffect(() => {}, [userInfo]);
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
            sx={{ m: 2, display: { xs: "flex", sm: "none" } }}
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
                  {navItems.map((item) => (
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
            display: { xs: "block", sm: "none" },
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
