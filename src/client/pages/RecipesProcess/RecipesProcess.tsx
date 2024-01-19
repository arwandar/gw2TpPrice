import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { Recipe, Stats } from "../../utils/type";
import { useContext, useEffect, useMemo, useState } from "react";

import { Context } from "../../Context";
import Row from "./Row";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { getCurrentPrices } from "../../utils/gw2Api";
import recipes from "../../utils/recipes.json";

const statList = Object.values(Stats);

const defaultRowsPerPage = 14;

const RecipesProcess = () => {
  const { updateUnlockedRecipes, unlockedRecipes } = useContext(Context);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const [prices, setPrices] = useState<Record<string, number>>({});
  const [queuePrices, setQueuePrices] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (queuePrices.length === 0) return;

      let newQueuePrices = [...queuePrices].filter((id) => !prices[id]);
      const currents = newQueuePrices.splice(0, 100);

      const res = await getCurrentPrices(currents);

      setPrices((oldPrices) => ({ ...oldPrices, ...res }));
      setQueuePrices((old) => old.filter((id) => !prices[id]));
    })();
  }, [queuePrices]);

  useEffect(() => {
    updateUnlockedRecipes();
  }, []);

  const rows = useMemo(() => {
    return recipes
      .filter((recipe) => {
        const keywords = search.split(" ");
        return keywords.reduce((state, keyword) => {
          if (keyword[0] === "!" || keyword[0] === "-") {
            return (
              state &&
              (keyword.length === 1 ||
                !recipe.name.toLowerCase().includes(keyword.slice(1)))
            );
          } else {
            return state && recipe.name.toLowerCase().includes(keyword);
          }
        }, true);
      })
      .map((recipe) => {
        const mainUnlocked = unlockedRecipes.main.includes(recipe.recipeId);
        const secondaryUnlocked = unlockedRecipes.secondary.includes(
          recipe.recipeId
        );
        return {
          ...recipe,
          mainUnlocked,
          secondaryUnlocked,
        };
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
  }, [unlockedRecipes, search]);

  const visibleRows = useMemo(() => {
    const visible: Recipe[] = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const ids = visible
      .filter((recipe) => recipe.canBeSend)
      .map((row) => row.id);
    setQueuePrices((oldQueuePrices) => [...oldQueuePrices, ...ids]);

    return visible;
  }, [rows, page, rowsPerPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TextField
        label="Search"
        value={search || ""}
        onChange={handleSearch}
        fullWidth
        variant="standard"
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Main</TableCell>
              <TableCell align="right">Secondary</TableCell>
              <TableCell align="right">TP Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <Row key={row.id} row={row} price={prices[row.id]} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  50,
                  100,
                  { label: "Default", value: defaultRowsPerPage },
                ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );

  return "plop";
};
export default RecipesProcess;
