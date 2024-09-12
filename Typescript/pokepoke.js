async function getPokeInfo(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}
 
async function getPokeData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
 
async function pokedex() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=50';
    const pokeList = await getPokeInfo(url);
 
    for (const pokemon of pokeList) {
        const pokemonUrl = pokemon.url;
        const pokemonDetails = await getPokeData(pokemonUrl);
 
        console.log(`◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙\n`)
        console.log(` #${pokemonDetails.id} ${pokemonDetails.name}`);
        console.log("Types:");
        for (let i = 0; i < pokemonDetails.types.length; i++) {
            console.log(`${i + 1}. ${pokemonDetails.types[i].type.name}`);
        }
 
        console.log("Moves:");
        for (let i = 0; i < pokemonDetails.moves.length; i++) {
            const moveUrl = pokemonDetails.moves[i].move.url;
            const moveDetails = await getPokeData(moveUrl);
            console.log(`${i + 1}. ${moveDetails.name},`);
            console.log( ` Accuracy: ${moveDetails.accuracy}`);
            for (const entry of moveDetails.flavor_text_entries) {
                if (entry.language.name === 'en') {
                    console.log(`  Descriptions: ${entry.flavor_text}\n`);
                    break;
                }
            }
            console.log(`\n◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ \n\n`)
        }
        console.log();
    }
}
 
pokedex();
 