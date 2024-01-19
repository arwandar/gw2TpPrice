import { Alert } from "@mui/material";
import { Context } from "../../Context";
import Headers from "./Headers";
import ResultTable from "./ResultTable";
import { useContext } from "react";

const TpPrices = () => {
  const { isLoading } = useContext(Context);
  return (
    <>
      <Headers />
      {isLoading && <Alert severity="warning">Still loading.</Alert>}
      <ResultTable />
    </>
  );
};

export default TpPrices;
