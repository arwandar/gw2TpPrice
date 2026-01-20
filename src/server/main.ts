import express from "express";
import ViteExpress from "vite-express";
import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 4,
});

const app = express();

type CacheEntry = {
  data: any;
  expires: number;
};

const cache = new Map<string, CacheEntry>();

const fetchGw2 = async (id: string) => {
  const res = await axios.get("https://fr.gw2tp.com/api/trends", {
    params: { id },
    timeout: 5000,
    httpsAgent,
    validateStatus: (status) => status < 500, // évite throw inutile
  });

  return res.data;
};

app.get("/api/gw2tp/:id", async (req, resp) => {
  const id = req.params.id;
  const now = Date.now();

  const cached = cache.get(id);
  if (cached && cached.expires > now) {
    return resp.json(cached.data);
  }

  try {
    const data = await fetchGw2(id);

    cache.set(id, {
      data,
      expires: now + 60 * 60 * 1000,
    });

    resp.json(data);
  } catch (e) {
    console.error("GW2TP failed", e);
    resp.status(502).json({ error: "upstream failed" });
  }
});

ViteExpress.listen(app, 5174, () =>
  console.log("Server is listening on port 5174..."),
);
