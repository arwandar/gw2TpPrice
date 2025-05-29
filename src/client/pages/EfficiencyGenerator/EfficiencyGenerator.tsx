import { Legendary } from "../../utils/type";

import { useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import WeaponResultTable from "./WeaponResultTable";
import ArmorResultTable from "./ArmorResultTable";
import OtherResultTable from "./OtherResultTable";
import defaultLegendaries from "../../utils/legendaries.json";
import { getPersonalLegendaries } from "../../utils/gw2Api";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const EfficiencyGenerator = () => {
  const [isMain, setIsMain] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [legendaries, setLegendaries] = useState<Legendary[]>(
    defaultLegendaries as Legendary[]
  );

  const setupLegendaries = async () => {
    const personalLegendaries = await getPersonalLegendaries(isMain);
    const newLegendaries: Legendary[] = legendaries.map((legendary) => {
      const personalLegendary = personalLegendaries.find(
        (item: { id: number; count: number }) => item.id === legendary.id
      );
      return {
        ...legendary,
        count: personalLegendary ? personalLegendary.count : 0,
      };
    });

    setLegendaries(newLegendaries);
  };

  useEffect(() => {
    setupLegendaries();
  }, [isMain]);

  const handleId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const openEfficiency = () => {
    let prefix = "https://gw2efficiency.com/crafting/calculator/a~1!b~0!c~0!d~";
    const sufix = selectedIds.map((id) => `1-${id}`).join(";");
    open(prefix + sufix, "_blank");
  };

  const weaponsCount = useMemo(() => {
    const legs = legendaries.filter((legendary) => legendary.type === "Weapon");
    const count = legs.reduce(
      (acc, legendary) => acc + (legendary.count || 0),
      0
    );
    const maxCount = legs.reduce(
      (acc, legendary) => acc + legendary.maxCount,
      0
    );
    return `${count}/${maxCount}`;
  }, [legendaries]);

  const armorCount = useMemo(() => {
    const legs = legendaries.filter((legendary) => legendary.type === "Armor");
    const count = legs.reduce(
      (acc, legendary) => acc + (legendary.count || 0),
      0
    );
    const maxCount = legs.reduce(
      (acc, legendary) => acc + legendary.maxCount,
      0
    );
    return `${count}/${maxCount}`;
  }, [legendaries]);

  const otherCount = useMemo(() => {
    const legs = legendaries.filter(
      (legendary) => legendary.type !== "Armor" && legendary.type !== "Weapon"
    );
    const count = legs.reduce(
      (acc, legendary) => acc + (legendary.count || 0),
      0
    );
    const maxCount = legs.reduce(
      (acc, legendary) => acc + legendary.maxCount,
      0
    );
    return `${count}/${maxCount}`;
  }, [legendaries]);

  return (
    <>
      <Button
        variant="contained"
        onClick={openEfficiency}
        style={{ marginRight: "1rem" }}
      >
        Open efficiency
      </Button>
      <Button variant="contained" onClick={() => setIsMain(!isMain)}>
        {isMain ? "Switch to alt" : "Switch to main"}
      </Button>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownwardIcon />} id="weapon">
          <Typography component="span">Weapons {weaponsCount}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WeaponResultTable
            selectedIds={selectedIds}
            handleId={handleId}
            legendaries={legendaries}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />} id="Armor">
          <Typography component="span">Armor {armorCount}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ArmorResultTable
            selectedIds={selectedIds}
            handleId={handleId}
            legendaries={legendaries}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />} id="Armor">
          <Typography component="span">Other {otherCount}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OtherResultTable
            selectedIds={selectedIds}
            handleId={handleId}
            legendaries={legendaries}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default EfficiencyGenerator;
