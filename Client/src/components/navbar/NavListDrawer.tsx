import { useCallback, useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { itemsNav } from "../../constant/userInfo";
import { useTranslation } from "react-i18next";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import "./styleNavbar.css";

interface IProps {
  handleDrawerToggle: () => void;
  navItems: { title: string; path: string }[];
  token: string;
  activeMenu: string;
  handleMenuClick: (menu: string) => void;
  changeLanguage: (lng: string) => void;
}

const NavListDrawer = ({
  handleDrawerToggle,
  navItems,
  token,
  changeLanguage,
  activeMenu,
  handleMenuClick,
}: IProps) => {
  const { t } = useTranslation("home");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOnDrawerToggle = useCallback(() => {
    const clickListItem = document.getElementsByClassName("onClickListItem");
    const itemsArray = Array.from(clickListItem);
    itemsArray.forEach((item) => {
      item.addEventListener("click", handleDrawerToggle);
    });
  }, [handleDrawerToggle]);

  useEffect(() => {
    handleOnDrawerToggle();
  }, [handleOnDrawerToggle]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        component={NavLink}
        to="/"
        sx={{
          my: 2,
          textDecoration: "none",
          color: "inherit",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Mangata
      </Typography>
      <Divider />
      <List>
        {token ? (
          <>
            {navItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  className="onClickListItem font-family-uppercase navegation-a"
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/Logout"
                className="onClickListItem font-family-uppercase navegation-a"
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
                  component={NavLink}
                  to={item.path}
                  className={`onClickListItem font-family-uppercase navegation-a ${activeMenu === item.path.split("/")[1] ? " active-menu" : ""}`}
                  onClick={() => handleMenuClick(item.path.split("/")[1])}
                >
                  <ListItemText primary={t(item.title)} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
        <ListItemButton onClick={handleClick}>
          <ListItemText
            primary={t("changeLanguage")}
            className="font-family-uppercase navegation-a"
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => changeLanguage("es")}
              className="font-family-uppercase navegation-a"
            >
              <ListItemText primary={t("es")} />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => changeLanguage("en")}
              className="font-family-uppercase navegation-a"
            >
              <ListItemText primary={t("en")} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default NavListDrawer;
