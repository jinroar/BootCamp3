import * as fs from 'fs';
import input from 'input';

let jsonData = fs.readFileSync('Box.json', 'utf8');
let boxdata = JSON.parse(jsonData);

let getStatus = ["https://bit.ly/draw_gif","https://bit.ly/win_gif,","https://bit.ly/lose_gif"];
const express = require('express');
const app = express();

const { readFile } = require(`fs`).promises;
const prompt = require("prompt-sync")();
const data = boxdata;

interface getStats { //Store Stats
    name: string;
    hp: number;
    atk: number;
}
function getStats(labeledObj: getStats) { //Display Stats
    console.log(`Pokemon: ${labeledObj.name} hp: ${labeledObj.hp} atk: ${labeledObj.atk}`)
}
function error_pause(error: number) { // Pause Program | Press any key to contine | if true=ERROR 
    if (error === 1) { console.log("\n\n[ERROR] \nPlease input with given format"); }
    require("child_process").spawnSync("pause", {
        shell: true,
        stdio: [0, 1, 2],
    });
}

async function askStuff() {
    const port = process.env.PORT || 8080; // Use the port provided by the host or default to 8080
    app.listen(port, () => {
    });
    app.get('/meow.html', async (req, res) => {
        res.send(await readFile('./meow.html', 'utf-8'));
    });
    app.get('/', async (req, res) => { // Define a route to handle incoming requests
        res.send(await readFile('./index.html', 'utf-8'));
    });
    app.get('/PokeBox', (req, res) => {
        res.json(data);
    });

    while (true) {
          console.clear();
          console.log("[PokeBattle V2 Select an Option (Use 🔽 and 🔼 arrow keys then press `SPACEBAR` to mark then ENTER)]");
          const choices = ['Fight', '>Exit<'];
          const colors = await input.checkboxes(choices);

        if (colors == choices[0]) {
            fight();
        } else if (colors == choices[1]) {
            process.exit(0);
        } else {
            console.log("\n" + colors + "is not an option");
        }
    }
}

async function fight() {
    let check = true;
    let result = "";
    const poke1 = prompt(`Enter your pokemon [ex. charizard]: `)
    const poke2 = prompt(`Enter your opposing pokemon [ex. charizard]: `); //  [INPUT]

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1}`); //getHp
        const data = await response.json();
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`); //getAtk
        const data2 = await response2.json();
    } catch (err) {
        console.log(err)
        check = false;
    }
    if (check) {
        console.log(`\n\n💥 FIGHT FIGHT !!💥\n`); //  [INPUT]  
        console.log(`\t ${poke1}\n\t   V.S. \n\t ${poke2}`); //  [INPUT]  
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`);
            const data = await response.json();
        } catch (error) {
            error_pause(1);
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1}`); //getHp
        const data = await response.json();
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`); //getAtk
        const data2 = await response2.json();

        let status = "";
        let pokestats1 = { name: poke1, hp: data.stats[0].base_stat, atk: data.stats[1].base_stat };
        let pokestats2 = { name: poke2, hp: data2.stats[0].base_stat, atk: data2.stats[1].base_stat };

        console.log(`\n\n${poke1} vs ${poke2}  rawrrawrrawr`); //Display stats
        getStats(pokestats1); getStats(pokestats2);
        
        // Fight Conditions
        if (pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp) {
            status = getStatus[0];  console.log(`DRAW!!!\n\n`); result = `DRAW`;
        } else if ((pokestats1.atk > pokestats2.hp && pokestats2.atk > pokestats1.hp) ||
            (pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp)) {
            status = getStatus[0];  console.log(`DRAW!!!\n\n`); result = `DRAW`;
        } else if (pokestats1.atk > pokestats2.hp) {
            status = getStatus[1];  console.log(` ${poke1} WINS!!\n\n`); result = `YOU WIN!! 😎 ${poke1.toUpperCase()}`;
        } else if (pokestats2.atk > pokestats1.hp) {
            status = getStatus[2];  console.log(`${poke2} WINS!!\n\n`); result = `You lost 😭 to ${poke2.toUpperCase()}`;
        } else if ( (pokestats1.hp-pokestats2.atk)<(pokestats2.hp-pokestats1.atk)) {
            status = getStatus[2];  console.log(`${poke2} WINS!!\n\n`); result = `You lost 😭 to ${poke2.toUpperCase()}`;
        } else if ( (pokestats2.hp-pokestats1.atk)<(pokestats1.hp-pokestats2.atk)) {
            status = getStatus[1];  console.log(`${poke1} WINS!!\n\n`);result = `YOU WIN!! 😎 ${poke1.toUpperCase()}`;
        } else {
            console.log(`DRAW!! Both Fainted \n\n`);
            status = getStatus[0]; console.log(`DRAW!!!\n\n`); result = `DRAW`;
        }
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1}`);
            const poke1_data = await response.json();
            let image = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${poke1_data.id}.gif`;

            const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`);
            const poke2_data = await response2.json();
            let image2 = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${poke2_data.id}.gif`;

            app.get(`/meow.html/${poke1}`, async (req, res) => {
                res.send(`
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>${(poke1_data.name).toString().toUpperCase()}</title>
                  <style>
                    body {  background-image: url('https://c4.wallpaperflare.com/wallpaper/996/1000/959/pokemon-wallpaper-preview.jpg');}
                          p  { font-size: 24px; background-color: rgba(218, 247, 166, 0.6); text-align: center;  border-radius: 25px; }
                          h1 { background-color: rgba(255, 255, 255, 0.7); text-align: center;  border-radius: 25px; }
                          h2 { background-color: rgba(255, 255, 255, 0.5); padding: 10px;  border-radius: 25px;}
                          .image-container { display: flex; justify-content: space-between; /* or space-around, or center */}
                          .image-container img { width: 50%;}
                 </style>
                  </head>
                  <body> 
                  <div class="image-container">
                        <div margin: 700px; border: 1px solid #4CAF50; style="text-align: center; background-color: rgba(20, 67, 66, 0.5); padding: 10px;">
                            <div width: 75%;  border: 10px solid #4CAF50; style="text-align: center; background-color: rgba(0, 255, 242, 0.2); padding: 10px;">
                                    <image class="animated-gif" src="${image}"/></div>
                             <div style="background-color: rgba(20, 67, 66, 0.5); padding: 10px;" style="text-align: center; style="display: grid; grid-template-columns: 1fr 1fr;">
                                  <h1>${(poke1_data.name).toString().toUpperCase()}</h1>
                                  <h2>Stats:</h2> 
                                <p>HP: ${poke1_data.stats[0].base_stat}</p>
                              <p>ATK: ${poke1_data.stats[1].base_stat}</p>
                             <audio controls autoplay> <source src="${poke1_data.cries.latest}" type="audio/ogg">  Your browser does not support the audio element. </audio>
                           </div>
                        </div>
                        <div margin: 700px; border: 1px solid #4CAF50; style="text-align: center; background-color: rgba(132, 255, 0, 0.5); padding: 10px;">
                                 <div width: 75%;  border: 10px solid #4CAF50; style="text-align: center; background-color: rgba(, 0.2); padding: 10px;">
                                     <img src="${status}"width="625" height="300"/></div>
                                 <div style="background-color: rgba(211, 255, 0, 0.5); padding: 10px;" style="text-align: center; style="display: grid; grid-template-columns: 1fr 1fr;">
                                   <p  style="font-size: 26px;" >Pokemon Battle Results</p>
                                <h1>${result}</h1>
                            <object type="application/x-shockwave-flash" width="30" height="25" data="https://www.youtube.com/v/hhh7wc0MtYY?version=2&autoplay=1&loop=1&theme=dark">
                            <param name="movie" value="https://www.youtube.com/v/hhh7wc0MtYY?version=2&autoplay=1&loop=1&theme=dark" /><param name="wmode" value="transparent" /></object>
                           </div>
                        </div>
                        <div margin: 700px; border: 1px solid #4CAF50; style="text-align: center; background-color: rgba(255, 194, 165 , 0.5); padding: 10px;">
                               <div width: 75%;  border: 10px solid #4CAF50; style="text-align: center; background-color: rgba(0, 255, 242, 0.2); padding: 10px;">
                                    <image class="animated-gif" src="${image2}"/></div>
                               <div style="background-color: rgba(209, 157, 183, 0.5); padding: 10px;" style="text-align: center; style="display: grid; grid-template-columns: 1fr 1fr;">
                                    <h1>${(poke2_data.name).toString().toUpperCase()}</h1>
                                  <h2>Stats:</h2> 
                            <p>HP: ${poke2_data.stats[0].base_stat}</p>
                          <p>ATK: ${poke2_data.stats[1].base_stat}</p>
                         <audio controls autoplay><source src="${poke2_data.cries.latest}" type="audio/ogg">   Your browser does not support the audio element. </audio>
                        </div>
                      </div>
                    </div>
                </body>
                </html>  `);
            });
            boxdata.push({
                "pkm1": {
                    "name": poke1_data.name,
                    "hp": poke1_data.stats[0].base_stat,
                    "attack": poke1_data.stats[1].base_stat
                },
                "pkm2": {
                    "name": poke2_data.name,
                    "hp": poke2_data.stats[0].base_stat,
                    "attack": poke2_data.stats[1].base_stat
                },
                "results": result
            });
            console.log(`Your Pokemon(HTML) will be on this link: http://localhost:8080/meow.html/${poke1}`);
            console.log(`Your Pokemon(JSON) will be on this link: http://localhost:8080/PokeBox`);
            console.log('\nCtrl+click desired link(s) \nThen 👇👇👇👇👇👇');
        } catch (error) { 
            error_pause(1); 
        }
    } else {
       console.log("\nEnter pokemon name correctly")
    }  error_pause(0);
} 
askStuff();