import { useState } from "react";

/** Libraries */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

/**Components */
import NavListDrawer from "./NavListDrawer";

/**Hooks */
import { useContextUser } from "../../hooks/useContextUser";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const navItems = [
  { title: "Inicio", path: "/home" },
  { title: "Iniciar sesión ", path: "/Login" },
  // { title: "Reservas", path: "/ReservationEmployee" },
];

const Navbar = (props: Props) => {
  const { window } = props;

  const { userInfo } = useContextUser();

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  return (
    <>
      <AppBar
        component="nav"
        sx={{ background: "#2B3D5E", height: 64 }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
          >
            <Icon
              icon="solar:hamburger-menu-bold-duotone"
              width="32"
              height="32"
              style={{ color: "#fff" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {userInfo.TOKEN ? (
              userInfo.MENU.map((item) => (
                <Button
                  key={item.TITLE}
                  sx={{ color: "#fff" }}
                  to={`/${item.PATH}`}
                  component={NavLink}
                >
                  {item.TITLE}
                </Button>
              ))
            ) : (
              <>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    sx={{ color: "#fff" }}
                    to={item.path}
                    component={NavLink}
                  >
                    {item.title}
                  </Button>
                ))}
              </>
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
            navItems={navItems}
          />
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
