import { useContext } from "react";

import { Alert } from "@mui/material";
import "./App.css";

import ResultTable from "./components/ResultTable/ResultTable";

import { Context } from "./Context";
import Filter from "./components/Headers/Headers";

function App() {
  const { isLoading } = useContext(Context);
  return (
    <>
      <Filter />
      {isLoading && <Alert severity="warning">Still loading.</Alert>}
      <ResultTable />
    </>
  );
}

export default App;
