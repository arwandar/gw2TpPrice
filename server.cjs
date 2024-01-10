const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());

app.get("/api/gw2tp/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    console.log("id", id);

    const res = await fetch(`https://fr.gw2tp.com/api/trends?id=${id}`, {});
    const response = await res.json();
    return resp.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
});

app.listen(5174, () => {
  console.log("http://localhost:5174");
});
