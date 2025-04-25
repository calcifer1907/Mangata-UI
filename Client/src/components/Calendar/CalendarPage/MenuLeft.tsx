import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "Vistas", items: ["Tabla", "Calendario"] },
  { name: "Fecha", items: [] },
];

const MenuLeft = () => {
  return (
    <Box width={350} bgcolor="background.paper" p={2} boxShadow={2}>
      <Typography variant="h5" gutterBottom>
        Reservaciones
      </Typography>
      <Divider sx={{ my: 2 }} />
      {categories.map((category) => (
        <Box key={category.name} mb={3}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {category.name}
          </Typography>
          <List dense>
            {category.items.map((item) => (
              <ListItem key={item}>
                <Button to={item} component={NavLink}>
                  <ListItemText primary={item} />
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default MenuLeft;
