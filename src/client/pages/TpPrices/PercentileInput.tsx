import { useContext, useState } from "react";

import { Context } from "../../Context";
import { Slider } from "@mui/material";

const PercentileInput = () => {
  const { resetPrices } = useContext(Context);

  const [percentile, setPercentile] = useState<number | undefined>(
    parseInt(localStorage.getItem("percentile") || "50", 10)
  );

  const onChange = (e: any) => {
    setPercentile(e.target.value);
    localStorage.setItem("percentile", e.target.value);
    resetPrices();
  };

  return (
    <Slider
      sx={{ width: 300 }}
      value={percentile}
      onChange={onChange}
      min={1}
      max={100}
      valueLabelDisplay="auto"
    />
  );
};

export default PercentileInput;
