import express from "express";
import capturedPokemonModel from "./PokeMongo";

const pokeRoutes  = express.Router();

pokeRoutes.get("/list", async (req, res) => {
    const jsonData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const list = await jsonData.json();
    res.json(list);
});


pokeRoutes.get("/stored", async (req, res) => {
    const jsonData = await fetch('http://localhost:3015/list');
    const list = await jsonData.json();
    res.json(list);
});

pokeRoutes.get("/owned", async (req, res) => {
    try{
        
        const capturedPokemon = await capturedPokemonModel.find()

        res.status(201).json(capturedPokemon)
    } catch (error) {
        console.log(error)
    }
});

pokeRoutes.get("/get", async (req, res) => {
    const pokemonName = req.query.name;
    const fetchJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await fetchJson.json();
    res.json(pokemonData)
})

pokeRoutes.post("/store", async (req, res) => {
    try{
        
        const { name } = req.body

        const capturedPokemon = new capturedPokemonModel({
            name: name
        })

        await capturedPokemon.save()

        res.status(201).json({
            message: `Pokemon ${capturedPokemon.name} saved.`
        })
    } catch (error) {
        console.log(error)
    }
})

pokeRoutes.delete('/delete', async (req, res) => {
      try{
        const id = req.body.pokemonid

        const capturedPokemon = await capturedPokemonModel.deleteOne({ ObjectId: id })
        res.status(201).json(capturedPokemon)

    } catch (error) {
        console.log(error)
    }

  });


export default pokeRoutes;