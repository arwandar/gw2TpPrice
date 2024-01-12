import { Slider } from "@mui/material";
import { useEffect, useState } from "react";

const PercentileInput = () => {
  const [percentile, setPercentile] = useState<number | undefined>(
    parseInt(localStorage.getItem("percentile") || "50", 10)
  );

  const onChange = (e: any) => {
    setPercentile(e.target.value);
    localStorage.setItem("percentile", e.target.value);
  };

  return (
    <Slider
      sx={{ width: 300 }}
      value={percentile}
      onChange={onChange}
      min={1}
      max={100}
    />
  );
};

export default PercentileInput;
