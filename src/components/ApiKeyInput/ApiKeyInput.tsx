import { TextField } from "@mui/material";
import { useEffect } from "react";

const ApiKeyInput = ({
  apiKey,
  setApiKey,
}: {
  apiKey: string;
  setApiKey: Function;
}) => {
  useEffect(() => {
    setApiKey(localStorage.getItem("apiKey"));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target?.value);
    localStorage.setItem("apiKey", e.target.value);
  };

  return (
    <TextField
      id="apiKey"
      label="API Key: "
      value={apiKey || ""}
      onChange={onChange}
      size="small"
    />
  );
};

export default ApiKeyInput;
