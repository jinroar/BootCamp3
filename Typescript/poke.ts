interface getStats { //Store Stats
  name: string;
  hp: number;
  atk: number;
}

function Title(){ // Reccuring heading
    console.clear();
    console.log(`> Pokemon Mema Battle Yippie < \n\n`);
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

const Battle = async () => {                                // Main function
  
  const prompt = require("prompt-sync")();                 // get prompt
  let flag: boolean = true;                               // flag for loop

  async function First_Page(): Promise<string> {     // [Function] - 1st Page | Return 'poke1' as string
   Title() // call heading
    const poke1 = prompt(`Enter your pokemon [ex. charizard]: `);  // [INPUT] 
    if (Number(poke1)) {                                          // Check if Number | Catch fetch error
      return " PRESS [2] and ENTER a VALID POKEMON!!\n"; 
    } else {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1}`);
        const data = await response.json();
      } catch (error) {
        error_pause(1);
        return " PRESS [2] and ENTER a VALID POKEMON!!\n"; // Error return 'notice'
      }
    } return poke1; // 'poke1`
  }
  async function Second_Page(poke1, poke2): Promise<string> { //  [Function] - 2nd Page | Return 'choice' as string
    Title(); // 2nd Page Menu 
    console.log(` > Chosen Pokemon: ${poke1}  \n > Opposing Pokemon: ${poke2} 
        [1.] Choose your opposing pokemon:
        [2.] Change Pokemon
        [3.] Exit`);
    let choice = prompt(` >> `); //  [INPUT]
    return choice;
  }
  async function Fight(poke1): Promise<string> { //  [Function] - 2nd Page >> 1st Choice | Return 'poke2' as string   
    const poke2 = prompt(`Enter your opposing pokemon [ex. charizard]: `); //  [INPUT]
    if (Number(poke2)) {                                                  // Check if Number | Catch fetch error
      error_pause(1);
      return " PRESS [1] and ENTER a VALID POKEMON!!\n";         // Error return 'notice'
    } else {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`);
        const data = await response.json();
      } catch (error) {
        error_pause(1);
        return Second_Page(poke1, "PRESS [1] and ENTER a VALID INPUT!!\n"); // Error return 'notice'
      }
    } return poke2;  // Note: Functions are fragmented for errorhandling
  } 
  // Start of While loop
  while (flag) {
        let poke1 = await First_Page();  // get 'poke1'
        let choice = await Second_Page(poke1, "Not yet entered [PRESS 1. FIGHT]\n"); // get choice for second page

        if (choice == "1") {  //FIGHT FIGHT FIGHT
         let poke2 = await Fight(poke1); // get 'poke2'
             if (poke2 != undefined) { 
            
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1}`); //getHp
                const data = await response.json();
                const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`); //getAtk
                const data2 = await response2.json();
                //setup object to getStats interface

                let pokestats1 = { name: poke1, hp: data.stats[0].base_stat, atk: data.stats[1].base_stat };
                let pokestats2 = { name: poke2, hp: data2.stats[0].base_stat, atk: data2.stats[1].base_stat };

                console.log(`\n\n${poke1} vs ${poke2}  rawrrawrrawr`); //Display stats
                getStats(pokestats1); getStats(pokestats2); 

                if ( pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp) { console.log(`DRAW!!\n\n`);    // Start of Fight Conditions
                } else if ((pokestats1.atk > pokestats2.hp && pokestats2.atk > pokestats1.hp) || 
                (pokestats1.atk == pokestats2.atk && pokestats1.hp == pokestats2.hp)) {
                console.log(`DRAW!!\n\n`);
                } else if (pokestats1.atk > pokestats2.hp) { console.log(` ${poke1} WINS!!\n\n`);
                } else if (pokestats2.atk > pokestats1.hp) { console.log(`${poke2} WINS!!\n\n`);
                } else {console.log(`DRAW!!\n\n`);}                                                       // End of Fight Conditions
            } else { error_pause(1); } // Pause then Back to First Page
                error_pause(0);       // End of Choice 1
            } else if (choice == "2") {  continue;  //Back to First Page 
            } else if (choice == "3") {  console.log(`BYE BYE!!`); process.exit(0); } // Exit
    }// End of While loop
};
Battle();