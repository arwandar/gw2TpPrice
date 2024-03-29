import { Achievement, Legendary, Status } from "../../utils/type";
import { getAchievements, getUnlockedSkins } from "../../utils/gw2Api";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import ResultTable from "./ResultTable";
import defaultLegendaries from "../../utils/legendaries.json";

const EfficiencyGenerator = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [legendaries, setLegendaries] =
    useState<Legendary[]>(defaultLegendaries);

  const setupLegendaries = async () => {
    const [unlockedSkins, achievements] = await Promise.all([
      getUnlockedSkins(),
      getAchievements(
        defaultLegendaries
          .map((row) => [
            row.idPerfAchiev,
            row.idPrecuAchiev,
            row.idProtoAchiev,
          ])
          .flatMap((x) => x)
      ),
    ]);

    const newLegendaries = [
      ...defaultLegendaries.map((leg) => {
        const newLeg: Legendary = { ...leg };

        const protoAchiev = achievements.find(
          (achiev: Achievement) => achiev.id === newLeg.idProtoAchiev
        );
        const precuAchiev = achievements.find(
          (achiev: Achievement) => achiev.id === newLeg.idPrecuAchiev
        );
        const perfAchiev = achievements.find(
          (achiev: Achievement) => achiev.id === newLeg.idPerfAchiev
        );

        newLeg.protoStatus = Status.notStarted;
        newLeg.perfStatus = Status.notStarted;
        newLeg.precuStatus = Status.notStarted;
        newLeg.legStatus = Status.notStarted;

        if (protoAchiev) {
          newLeg.protoStatus = protoAchiev.done ? Status.done : Status.started;
        }

        if (perfAchiev) {
          newLeg.protoStatus = Status.crafted;
          newLeg.perfStatus = perfAchiev.done ? Status.done : Status.started;
        }

        if (precuAchiev) {
          newLeg.perfStatus = Status.crafted;
          newLeg.precuStatus = precuAchiev.done ? Status.done : Status.started;
          if (unlockedSkins.includes(newLeg.idPrecuSkin)) {
            newLeg.precuStatus = Status.crafted;
          }
        }

        if (unlockedSkins.includes(newLeg.idLegSkin)) {
          newLeg.legStatus = Status.crafted;
        }

        return newLeg;
      }),
    ];

    setLegendaries(newLegendaries);
  };

  useEffect(() => {
    setupLegendaries();
  }, []);

  const handleId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const openEfficiency = () => {
    let prefix = "https://gw2efficiency.com/crafting/calculator/a~1!b~0!c~0!d~";
    const sufix = selectedIds
      .map((id) => {
        return `1-${id}`;
      })
      .join(";");

    open(prefix + sufix, "_blank");
  };

  return (
    <>
      <Button variant="contained" onClick={openEfficiency}>
        Open efficiency
      </Button>
      <ResultTable
        selectedIds={selectedIds}
        handleId={handleId}
        legendaries={legendaries}
      />
    </>
  );
};
export default EfficiencyGenerator;
