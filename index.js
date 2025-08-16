import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/rap/:userid", async (req, res) => {
  const userId = req.params.userid;
  const apiUrl = `https://www.pekora.zip/apisite/users/v1/users/${userId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch external API" });
    }

    const data = await response.json();

    // Check if inventory_rap exists
    const inventoryRAP = data && data.inventory_rap != null ? data.inventory_rap : null;

    res.json({ inventory_rap: inventoryRAP });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Internal proxy error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
