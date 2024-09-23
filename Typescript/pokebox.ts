import * as fs from 'fs';
import input from 'input';

const express = require('express');
const app = express();
const { readFile } = require(`fs`).promises;
const prompt = require("prompt-sync")();

//Read Json and parse
let jsonData = fs.readFileSync('Box.json', 'utf8');
let boxdata = JSON.parse(jsonData);

//data to JSON
const data = boxdata;

function getApi() {
  //PORT
  const port = process.env.PORT || 8080; // Use the port provided by the host or default to 8080
  app.listen(port, () => {
  });

  app.get('/meow.html', async (req, res) => {
    res.send(await readFile('./meow.html', 'utf-8'));
  });

  // Define a route to handle incoming requests
  app.get('/', async (req, res) => {
    res.send(await readFile('./index.html', 'utf-8'));
  });

  // Middleware to parse JSON requests
  app.use(express.json());

  // Create (POST) a new item
  app.post('/PokeBox', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
  }); // Body: { "id": "New Item" }

  //Read (GET) all PokeBox
  app.get('/PokeBox', (req, res) => {
    res.json(data);
  });
}
askStuff();

async function askStuff() {
  getApi();
  console.log(`Server is up at http://localhost:8080`)
  while (true) {
    console.clear();
    console.log("[PokeBox Select an Option (Use 🔽 and 🔼 arrow keys then press `SPACEBAR` to mark then ENTER)]");
    const choices = ['[1]Store', '[2]View', '[3]Find', '[4]>Exit<'];
    const colors = await input.checkboxes(choices);
    if (colors == choices[0]) {
      await store();
    } else if (colors == choices[1]) {
      await view();
    } else if (colors == choices[2]) {
      await find();
    } else if (colors == choices[3]) {
      // boxdata = {}; // Clear the Box, Delete this to keep data
      // fs.writeFileSync('./Box.json', JSON.stringify(boxdata, null, 2)); // Clear the Box, Delete this to keep data
      // process.exit(0);
    } else {
      console.log("\n" + colors + "is not an option");
    }
  }
 
}

function pause(err?) { // Pause Program | Press any key to contine 
  if(err==1){ console.log("\nNo Pokemon Found 😢...\nreturning to menu");}
  require("child_process").spawnSync("pause", {
    shell: true,
    stdio: [0, 1, 2],
  });
}

async function store() {  //Add a Pokemon
  console.clear();
  console.log('\n\nThis stores your pokemon to viewbox')
  const poke = prompt(`Enter your pokemon [ex. charizard]: `);  // [INPUT] 

  if (Number(poke)) {                                          // Check if Number | Catch fetch error
    return "ENTER a VALID POKEMON!!\n";
  } else {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const data = await response.json();

      //store moves in array
      let move = [];
      for (let j = 0; j < data.moves.length; j++) {
        move.push(data.moves[j].move.name)
      }
      const pokemonImageResponse = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`);
      const imageData = await pokemonImageResponse.arrayBuffer();
      const imageBase64 = Buffer.from(imageData).toString('base64');

      boxdata.push({ // Add to Box.json | Reflected in locahost immediately 
        id: data.id,
        name: data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
        image: imageBase64,
        moves: move,
        sound: data.cries.latest
      });

      // Update JSON File
      const updatedJson = JSON.stringify(boxdata, null, 2);
      fs.writeFileSync('Box.json', updatedJson);
    } catch (error) {
      pause(1);
    }
  }
  pause();
}

function view() { // Shows the link to the API
  console.log('Follow the link to the API: http://localhost:8080/PokeBox \nThen >>>')
  pause();
}

async function find() {  // Finds pokemon name, will not accept number
  console.log('This finds your pokemon')
  const poke = prompt(`Enter your pokemon [ex. charizard]: `);  // [INPUT] 

  if (Number(poke)) {                                          // Check if Number | Catch fetch error
    return "ENTER a VALID POKEMON, No numbers!!\n";
  } else {
    try {

      // http://localhost:8080/PokeBox/raichu
      // Read (GET) a specific item by ID
      app.get('/PokeBox/:name', (req, res) => {
        const item = data.find((item) => item.name === poke);
        if (!item) {
          res.status(404).json({ error: 'Item not found' });
        } else {
          res.json(item);
          console.log(poke+" Found!!");
        }
      });      
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const img = await response.json();

      let image = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${img.id}.gif`;

      // http://localhost:8080/meow.html/raichu
      // Read (GET) a specific item by ID
      app.get(`/meow.html/${poke}`, async (req, res) => {
        const item = data.find((item) => item.name === poke);
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${(img.name).toString().toUpperCase()}</title>
        <style>
          body {  background-image: url('https://c4.wallpaperflare.com/wallpaper/996/1000/959/pokemon-wallpaper-preview.jpg');}
                    img.animated-gif{width: 300pxx; height: 400px;}
                p  { background-color: rgba(218, 247, 166, 0.6); text-align: center; }
                h1 { background-color: rgba(255, 255, 255, 0.7); text-align: center; }
                h2 { background-color: rgba(255, 255, 255, 0.5); padding: 10px;}
       </style>
        </head>
        <body> 
              <div margin: 700px; border: 1px solid #4CAF50; style="text-align: center; background-color: rgba(20, 67, 66, 0.5); padding: 10px;">
              <div width: 75%;  border: 10px solid #4CAF50; style="text-align: center; background-color: rgba(255, 255, 255, 0.2); padding: 10px;">
               <img class="animated-gif" src="${image}"/></div>
               <div style="background-color: rgba(255, 194, 165, 0.5); padding: 10px;" style="text-align: center; style="display: grid; grid-template-columns: 1fr 1fr;">
              <h1>${(img.name).toString().toUpperCase()}</h1>
              <audio controls autoplay>
                <source src="${item.sound}" type="audio/ogg">
                Your browser does not support the audio element.
              </audio>
              <h2>Moves:</h2> 
              <p>${item.moves.join('\n ').toUpperCase()}</p>
                 </div>
              </div>
      </body>
      </html>
            `);
      });
      console.log(`\nYour Pokemon(JSON) is available on this link: http://localhost:8080/PokeBox/${poke}`);
      console.log(`Your Pokemon(HTML) is available on this link: http://localhost:8080/meow.html/${poke}`); 
      console.log('\nCtrl+click desired link(s) \nThen 👇👇👇👇👇👇')
    } catch (error) {
      pause(1);
    }
  }
  pause();
}