import { useState } from "react";
import PinkButton from "./components/PinkButton";
// import { PokemonList } from "./interfaces/PokemonList";
import { Pokemon } from "./interfaces/Pokemon";
import AudioPlayer from "react-audio-player"
import './index.css';

import defaultGif from './assets/mysunshine.gif';
import bgm from "./assets/pick.mp3";
import { Link } from "react-router-dom";




const PickPokemon = () => {

  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);
  const [pokemon3Data, setPOkemon3Data] = useState<Pokemon | null>(null);
  const [pickPokemon, setpickPokemon] = useState<Pokemon | null>(null);

  const randomClick = () => {
    for (let i = 0; i < 20; i++)
      selected();
  };

  const selectPokemon = async (pokemon) => {
    //Add Insert To Mongo DB here

    const fetchJson1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pokedata = await fetchJson1.json();


    console.log(pokemon1Data?.name);

    setPOkemon1Data(pokedata); //take note of this in the future

  };


  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);

  const selected = async () => {

    for (let i = 1; i < 3; i++) {
      const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
          * (max - min + 1)) + min;
      };

      const num1 = randomNumberInRange(0, 1301);
      const num2 = randomNumberInRange(0, 1301);
      const num3 = randomNumberInRange(0, 1301);

      const fetchJson1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num1}`);
      const pokemonData1 = await fetchJson1.json();
      setPOkemon1Data(pokemonData1);

      const fetchJson2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num2}`);
      const pokemonData2 = await fetchJson2.json();
      setPOkemon2Data(pokemonData2);

      const fetchJson3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num3}`);
      const pokemonData3 = await fetchJson3.json();
      setPOkemon3Data(pokemonData3);

    }


  }

  const fight = () => {

    const pkmn1Hp =
      ((pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0) +
        (pokemon1Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0)) -
      (pokemon2Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0);

    console.log(pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0);
    console.log(pokemon1Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0);
    console.log(pokemon2Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0);

    setPkmn1Hp(pkmn1Hp);

    const pkmn2Hp =
      ((pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0) +
        (pokemon2Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0)) -
      (pokemon1Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0);
    setPkmn2Hp(pkmn2Hp);

    setHasFightResults(true);
  }

  function pokebattle() {
    for (let i = 0; i < 1; i++) {
      console.log(i);
      fight();
    }
  }

  const [showHideButton] = useState(false);



  return (
    <div className=" overflow-hidden bg-no-repeat bg-cover bg-[url('https://wallpaperaccess.com/full/8406757.gif')] max-w-screen w-screen h-screen max-h-screen  grid-cols-4 content-center ...
        text-poke-yellow">
      <AudioPlayer src={bgm} loop={true} autoPlay={true} volume={0.9} />
      <button className="absolute inset-y-0  w-70 h-10  text-center  border-poke-yellow border-spacing-2 border-4">
        <Link to="/About">Back to Menu</Link> </button>

      <div className="  text-center relative inset-y-2 left-52  my-8 h-56 grid grid-cols-4 row-auto gap-4 content-center ...">
        {
          pokemon1Data &&
          <div className="border-poke-yellow border-spacing-2 border-4 bg-grey-glass bg-opacity-20 hover:bg-tahiti/25 content-center" onClick={() => selectPokemon(pokemon1Data.name)}>
            <Link to="/SearchPokemon" state={pokemon1Data.name} >
              <div className="relative group conte">
                <div className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded">
                  {pokemon1Data?.name.toUpperCase()}
                </div>

                <img
                  src={pokemon1Data.sprites.other.showdown.front_default || defaultGif}
                  alt="Beautiful Landscape"
                  className=" centeerw-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                />
                <img
                  src={pokemon1Data.sprites.other.showdown.back_default || defaultGif}
                  alt="Serene Nature"
                  className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
                <div className="border-poke-yellow border-spacing-2 border-t-4 bg-poke-yellow  bg-opacity-20 hover:bg-tahiti/25 content-center text-center ">

                  <p>
                    Name: {pokemon1Data?.name.toUpperCase()} <br />
                    HP: {pokemon1Data.stats.find(e => e.stat.name === "hp")?.base_stat} <br />
                    Attack: {pokemon1Data.stats.find(e => e.stat.name === "attack")?.base_stat} <br />
                    Defense: {pokemon1Data.stats.find(e => e.stat.name === "defense")?.base_stat}  <br /><br />
                    <AudioPlayer src={pokemon1Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')} />
                  </p>
                </div>
              </div>
            </Link>
          </div>
        }

        {
          pokemon2Data &&
          <div className="border-poke-yellow border-spacing-2 border-4 bg-grey-glass bg-opacity-20 hover:bg-tahiti/25 content-center" onClick={() => selectPokemon(pokemon2Data.name)}>
            <Link to="/SearchPokemon" state={pokemon2Data.name} >
              <div className="relative group conte">
                <div className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded">
                  {pokemon2Data?.name.toUpperCase()}
                </div>

                <img
                  src={pokemon2Data.sprites.other.showdown.front_default || defaultGif}
                  alt="Beautiful Landscape"
                  className=" centeerw-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                />
                <img
                  src={pokemon2Data.sprites.other.showdown.back_default || defaultGif}
                  alt="Serene Nature"
                  className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
                <div className="border-poke-yellow border-spacing-2 border-t-4 bg-poke-yellow  bg-opacity-20 hover:bg-tahiti/25 content-center text-center ">

                  <p>
                    Name: {pokemon2Data?.name.toUpperCase()} <br />
                    HP: {pokemon2Data.stats.find(e => e.stat.name === "hp")?.base_stat} <br />
                    Attack: {pokemon2Data.stats.find(e => e.stat.name === "attack")?.base_stat} <br />
                    Defense: {pokemon2Data.stats.find(e => e.stat.name === "defense")?.base_stat}  <br /><br />
                    <AudioPlayer src={pokemon2Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')} />
                  </p>
                </div>
              </div>
            </Link>
          </div>
        }
        {
          pokemon3Data &&
          <div className="border-poke-yellow border-spacing-2 border-4 bg-grey-glass bg-opacity-20 hover:bg-tahiti/25 content-center" onClick={() => selectPokemon(pokemon3Data.name)}>
            <Link to="/SearchPokemon" state={pokemon3Data.name} >
              <div className="relative group conte">
                <div className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded">
                  {pokemon3Data?.name.toUpperCase()}
                </div>

                <img
                  src={pokemon3Data.sprites.other.showdown.front_default || defaultGif}
                  alt="Beautiful Landscape"
                  className=" centeerw-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                />
                <img
                  src={pokemon3Data.sprites.other.showdown.back_default || defaultGif}
                  alt="Serene Nature"
                  className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
                <div className="border-poke-yellow border-spacing-2 border-t-4 bg-poke-yellow  bg-opacity-20 hover:bg-tahiti/25 content-center text-center ">

                  <p>
                    Name: {pokemon3Data?.name.toUpperCase()} <br />
                    HP: {pokemon3Data.stats.find(e => e.stat.name === "hp")?.base_stat} <br />
                    Attack: {pokemon3Data.stats.find(e => e.stat.name === "attack")?.base_stat} <br />
                    Defense: {pokemon3Data.stats.find(e => e.stat.name === "defense")?.base_stat}  <br /><br />
                    <AudioPlayer src={pokemon3Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')} />
                  </p>
                </div>
              </div>
            </Link>
          </div>
        }
      </div>

      {showHideButton ? (
        <div >
          <PinkButton buttonClick={() => { selected(); pokebattle(); }} label="💥FIGHT💥" /><br />
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

        <div className="invisible">Press the fight button again to refresh.</div>
      </div>


      <div className=" relative inset-y-20   my-8 text-center spacing-2 ">

        <button className="bg-bubble-gum  text-purple font-bold py-2 px-96 rounded" onMouseEnter={randomClick}>Hover to Randomize</button>

      </div>


    </div>

  )
}
//{randomClick()}
export default PickPokemon;