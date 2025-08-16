import express from "express";
import fetch from "node-fetch";

const app = express();

// GET /rap/:userid
app.get("/rap/:userid", async (req, res) => {
  const userId = req.params.userid;
  const apiUrl = `https://www.pekora.zip/apisite/users/v1/users/${userId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Grab inventory_rap
    const inventoryRAP = data.inventory_rap ?? null;

    res.json({ inventory_rap: inventoryRAP });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RAP" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
