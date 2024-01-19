import { Grid } from "@mui/material";
import ImportShoppingList from "./ImportShoppingListInput";
import PercentileInput from "./PercentileInput";
import QuickPrice from "../../components/QuickPrice";

const Headers = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <ImportShoppingList />
      </Grid>
      <Grid item>
        <PercentileInput />
      </Grid>
      <QuickPrice />
    </Grid>
  );
};

export default Headers;
