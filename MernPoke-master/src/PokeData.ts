
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PokeData  = async (pokemonName: any) => {

    
    const fetchJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await fetchJson.json();
   
    return pokemonData;

}

export default PokeData