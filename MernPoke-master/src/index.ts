// import express, { Request, Response} from 'express';
// import { config } from 'dotenv';
// import connectToDB from './mongo';
// const app = express();
// config();

// const port = process.env.ALT_PORT || "3015";


// app.get("/list", async (req: Request, res: Response) => {
//   const db = await connectToDB(process.env.uri || "");
//   try {
//     if (db) {
//       const testapp = db.db("test");
//       const pokemon = testapp.collection("pokemons");
//       const pokemonCOllection = await pokemon.find().toArray();
//       res.json(pokemonCOllection);
//     }
//   } finally {
//     db?.close();
//   }
// });


// app.listen(port, ()=>{
//   console.log(`http://localhost:${port}/list`)
// })



import { MongoClient } from 'mongodb';

async function getAllItems() {
    const uri = 'your_mongodb_connection_string';
    const client = new MongoClient(uri, {});

    try {
        await client.connect();
        const database = client.db('pokemon-mini-game');
        const collection = database.collection('captured_pokemon');

        const items = await collection.find({}).toArray();
        console.log(items);
    } finally {
        await client.close();
    }
}

getAllItems().catch(console.error);
