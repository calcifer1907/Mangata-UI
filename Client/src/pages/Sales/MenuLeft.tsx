import { FC, useState } from "react";

/**Libreries */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

/**Components */
import TextFieldComponent from "../../components/TextField/TextFieldComponent";

const categories = [
  { name: "Vistas", items: ["Tabla", "Calendario"] },
  { name: "Fecha", items: [] },
];

interface IProps {
  callBack: (date: string) => void;
}

const MenuLeft: FC<IProps> = ({ callBack }) => {
  const [values, setValues] = useState("");

  return (
    <Box width={350} bgcolor="background.paper" p={2} boxShadow={2}>
      <Typography variant="h5" gutterBottom>
        Reservaciones
      </Typography>
      <Divider sx={{ my: 2 }} />
      <TextFieldComponent
        iconName=""
        label=""
        placeholder="Busqueda..."
        onChange={(value) => {
          setValues(value);
          callBack(value);
        }}
        value={values}
      />
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
