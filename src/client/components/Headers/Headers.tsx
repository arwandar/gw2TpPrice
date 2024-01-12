import { Update } from "@mui/icons-material";
import { Grid, Button } from "@mui/material";
import ApiKeyInput from "./ApiKeyInput";
import CurrentOrderModal from "../CurrentOrderModal/CurrentOrderModal";
import ImportShoppingList from "./ImportShoppingListInput";
import PercentileInput from "./PercentileInput";
import QuickPrice from "./QuickPrice";

const Headers = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <ApiKeyInput />
      </Grid>
      <Grid item>
        <ImportShoppingList />
      </Grid>
      <Grid item>
        <CurrentOrderModal />
      </Grid>
      <Grid item>
        <PercentileInput />
      </Grid>
      <QuickPrice />
    </Grid>
  );
};

export default Headers;
