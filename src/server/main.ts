import express from "express";
import ViteExpress from "vite-express";

const app = express();

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

ViteExpress.listen(app, 5174, () =>
  console.log("Server is listening on port 5174...")
);
