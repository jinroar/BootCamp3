import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch Pokémon data
app.post("/submit", async (req, res) => {
  const { names } = req.body;

  try {
    const promises = names.map((name: string) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    );

    const responses = await Promise.all(promises);
    const pokemonData = responses.map((response) => response.data);

    // Extract relevant stats
    const results = pokemonData.map((pokemon) => ({
      name: pokemon.name,
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      image: pokemon.sprites.front_default,
    }));

    // Send results back to frontend
    res.json({ results });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    res.status(500).json({ error: "Failed to fetch Pokémon data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
