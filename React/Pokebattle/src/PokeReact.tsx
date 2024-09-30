import {useEffect, useState} from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/Pokemon";
import AudioPlayer from "react-audio-player"
import './index.css';

import { PokemonList } from "./interfaces/PokemonList";

function PokeReact  () {

  const [pokemonName1, setPokemonName1] = useState<string>("");
  const [pokemonName2, setPokemonName2] = useState<string>("");
  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);

  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);

  useEffect(()=> {
    listPokemon();
  }, [])

  const listPokemon = async () => {
    const fetchJson = await fetch("http://localhost:8080/api/pokemon/list");
    const listData = await fetchJson.json();
    setPokemonList(listData);
  }

  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);

  const selected = async () => {
 
      const fetchJson1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName1}`);
      const pokemonData1 = await fetchJson1.json();
      setPOkemon1Data(pokemonData1);
    
      const fetchJson2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName2}`);
      const pokemonData2 = await fetchJson2.json();
      setPOkemon2Data(pokemonData2);
  }

  const fight = ()=> {
    const pkmn1Hp = 
       ((pokemon1Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 ) + 
       (pokemon1Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 )) - 
       (pokemon2Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);

      console.log(pokemon1Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 );
      console.log(pokemon1Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 );
      console.log(pokemon2Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);

    setPkmn1Hp(pkmn1Hp);

    const pkmn2Hp = 
       ((pokemon2Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 ) +
       (pokemon2Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 )) - 
       (pokemon1Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);
    setPkmn2Hp(pkmn2Hp);
    
    setHasFightResults(true);
  }

  function pokebattle (){
    for(let i = 0;i<1;i++){
    console.log(i);
    fight();
    }
  }



  const [showHideButton, setShowHideButton] = useState(false);

  const handleClick = () => {
    setShowHideButton(true);
    
  };

  return (
      <div className="image-container">
      {
          pokemon1Data && 
          <div className="bbox1">
          <div className="box1">
          <div className="ibox1">
          <div className="imgbox1">
            <img className="gif" src={pokemon1Data.sprites.other.showdown.front_default}/>
           </div>
            <p>
              Name: {pokemon1Data?.name.toUpperCase()} <br/>
              HP: {pokemon1Data.stats.find(e=>e.stat.name==="hp")?.base_stat} <br/>
              Attack: {pokemon1Data.stats.find(e=>e.stat.name==="attack")?.base_stat} <br/>
              Defense: {pokemon1Data.stats.find(e=>e.stat.name==="defense")?.base_stat}  <br/><br/>
            <AudioPlayer src={pokemon1Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')}/>
            </p>
          </div>
          </div>
          </div>
        }
        {
          pokemon2Data && 
          <div className="bbox2">
          <div className="box2">
               <div className="ibox2">
               <div className="imgbox2">
            <img className="gif" src={pokemon2Data.sprites.other.showdown.front_default}/>
          </div>
            <p>
              Name: {pokemon2Data?.name.toUpperCase()} <br/>
              HP: {pokemon2Data.stats.find(e=>e.stat.name==="hp")?.base_stat} <br/>
              Attack: {pokemon2Data.stats.find(e=>e.stat.name==="attack")?.base_stat} <br/>
              Defense: {pokemon2Data.stats.find(e=>e.stat.name==="defense")?.base_stat} <br/><br/>
              <AudioPlayer src={pokemon2Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')}/>
            </p>
            </div>
            </div>
            </div>
        }

    
     <div className="sbox1">
      <input className="tbox" type="" placeholder="Pokemon" value={pokemonName1} onChange={(e)=>{setPokemonName1(e.target.value);  handleClick(); } }/>
      {
          pokemonList && (
            <>
              <select className="tbox2" 
                onChange={(e)=>{setPokemonName1(e.target.value); handleClick(); }}
              >
                {
                  pokemonList.results.map((pokemon)=>{ 
                    return <option value={pokemon.name}>
                      {pokemon.name}
                    </option>
                  })
                }
              </select>
            </>
          )
        }
</div>
        <div className="sbox2">
      <input className="tbox" type="" placeholder="Pokemon" value={pokemonName2} onChange={(e)=>{setPokemonName2(e.target.value); selected();}}/>
      {
          pokemonList && (
            <>
              <select className="tbox2" 
                onChange={(e)=>{setPokemonName2(e.target.value); handleClick(); }}
              >
                {
                  pokemonList.results.map((pokemon)=>{
                    return <option value={pokemon.name}>
                      {pokemon.name}
                    </option>
                  })
                }
              </select>
            </>
          )
      }
      </div>


      {showHideButton ? (
           <div >
           <PinkButton buttonClick={() => {selected(); pokebattle(); }} label="💥FIGHT💥"/><br/>
           </div>
      ) : null}



      <div className="box5">       
      <div className="fight">        
      {
          hasFightResults && (
            <>
         <strong className="fight"> 🔥 {pokemon1Data?.name.toUpperCase()}: {pkmn1Hp} 🔥</strong>   <br></br>
         <strong className="fight"> 🔥 vs 🔥</strong> <br></br>
         <strong className="fight"> 🔥 {pokemon2Data?.name.toUpperCase()}: {pkmn2Hp} 🔥</strong> <br></br>
            </>
          )
      }
    </div>
   
    <div className="hide">Press the fight button again to refresh.</div>
      </div>
     =
    </div>

  )
}

export default PokeReact;