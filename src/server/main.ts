import express from "express";
import ViteExpress from "vite-express";

const app = express();

type CacheEntry = {
  data: any;
  expires: number;
};

const cache = new Map<string, CacheEntry>();

app.get("/api/gw2tp/:id", async (req, resp) => {
  const id = req.params.id;
  const now = Date.now();

  const cached = cache.get(id);
  if (cached && cached.expires > now) {
    return resp.json(cached.data);
  }

  try {
    const res = await fetch(`https://fr.gw2tp.com/api/trends?id=${id}`);
    const data = await res.json();

    cache.set(id, {
      data,
      expires: now + 360_000,
    });

    resp.json(data);
  } catch (e) {
    console.error(e);
    resp.status(502).json({ error: "upstream failed" });
  }
});

ViteExpress.listen(app, 5174, () =>
  console.log("Server is listening on port 5174..."),
);
