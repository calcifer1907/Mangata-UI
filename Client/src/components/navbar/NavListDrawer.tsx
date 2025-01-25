import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { itemsNav } from "../../constant/userInfo";

interface IProps {
  handleDrawerToggle: () => void;
  navItems: { title: string; path: string }[];
  token: string;
}

const NavListDrawer = ({ handleDrawerToggle, navItems, token }: IProps) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {token ? (
          <>
            {navItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  component={NavLink}
                  to={item.path}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={NavLink}
                to="/Logout"
              >
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            {itemsNav.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  component={NavLink}
                  to={item.path}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );
};

export default NavListDrawer;
