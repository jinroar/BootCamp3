import { useState } from "react";
import { Pokemon } from "./interfaces/Pokemon";
import AudioPlayer from "react-audio-player";
import "./index.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import defaultGif from "./assets/mysunshine.gif";
import axios from "axios";
import bgm from "./assets/pokeball.mp3";


const Capture = () => {
    const location = useLocation();
    const { pokemon, pokemonid } = location.state;

    console.log(pokemon);

    const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const selectPokemon = async (pokemon: unknown) => {
        //Add Insert To Express

        const fetchJson1 = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const pokemonData1 = await fetchJson1.json();

        setPOkemon1Data(pokemonData1);
    };

    const [caged, setcaged] = useState<boolean>(true);

    const selected = async () => {
        const fetchJson1 = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const pokemonData1 = await fetchJson1.json();
        setPOkemon1Data(pokemonData1);
    };

    const free = async () => {

        const url = `http://localhost:8080/api/pokemon/delete`;

        await axios
            .delete(url, pokemonid)
            .then((response) => {
                console.log(response);
                console.log(pokemonid);
            })
            .catch((error) => {
                console.log(error);
            });
        setResult("FREE")
        setcaged(false)
    }


    const [showHideButton] = useState(false);

    return (
        <div onMouseEnter={selected} className="  overflow-hidden bg-no-repeat bg-cover bg-[url('https://imgs.search.brave.com/rgmlx28x7YV5WVPpvAcEPATc5ZSywCb2B9eQlQc-RLA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ2Lzlm/L2ZkLzQ2OWZmZGYy/OTA4NmYxZjMwYjZm/NTkyZDRlMGRkZTg1/LmdpZg.gif')] max-w-screen w-screen h-screen max-h-screen  grid-cols-4 content-center ...
    text-poke-yellow">
            <AudioPlayer src={bgm} autoPlay={true} volume={0.9} />
            <div className="absolute gap-5 hover:bg-tahiti/25 content-center p-4 rounded-lg font-bold border-b-4 border-l-4 border-t-4 border-white shadow-lg">
                <button className=" gap-5 bg-bubble-gum bg-opacity-90 hover:bg-purple/70 content-center p-4 rounded-lg font-bold border-b-4 border-l-4 border-t-4 border-white shadow-lg">
                    <Link to="/Stored">
                        <img
                            src={"https://img.icons8.com/?size=100&id=15157&format=png&color=000000" || defaultGif}
                            alt="Beautiful Landscape"
                            className="w-[100px] h-[60px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                        />


                    </Link> </button>
            </div>


            <div className="  relative -inset-y-10 left-48    my-8 h-56 grid grid-cols-4 row-auto gap-4 content-center ...">

                <div className="  invisible inset-y-10 left-60  text-center border-poke-yellow border-spacing-2 border-4">



                </div>
                {
                    pokemon1Data &&

                    <Link to="/SearchPokemon" state={pokemon1Data.name} >

                        <div className="border-poke-yellow border-spacing-2 border-4 bg-grey-glass bg-opacity-20 hover:bg-red/25 content-center text-center " onClick={() => selectPokemon(pokemon1Data.name)}>

                            <AudioPlayer src={pokemon1Data.cries.latest} autoPlay={true} volume={0.5} />

                            <div className="relative group  object-center">
                                <div className="bg-bubble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded">
                                    {pokemon1Data?.name.toUpperCase()}   {result && <p className="text-center">( {result} )</p>}
                                </div>

                                <img
                                    src={pokemon1Data.sprites.other.showdown.front_default || defaultGif}
                                    alt="Beautiful Landscape"
                                    className="w-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                                />
                                <img
                                    src={pokemon1Data.sprites.other.showdown.back_default || defaultGif}
                                    alt="Serene Nature"
                                    className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                                />

                                <div className=" object-center border-poke-yellow border-spacing-2 border-t-4 bg-poke-yellow  bg-opacity-20 hover:bg-red/25 content-center text-center ">

                                    <p>
                                        Name: {pokemon1Data?.name.toUpperCase()} <br />
                                        HP: {pokemon1Data.stats.find(e => e.stat.name === "hp")?.base_stat} <br />
                                        Attack: {pokemon1Data.stats.find(e => e.stat.name === "attack")?.base_stat} <br />
                                        Defense: {pokemon1Data.stats.find(e => e.stat.name === "defense")?.base_stat}  <br /><br />
                                        <AudioPlayer src={pokemon1Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')} />
                                    </p>
                                </div>

                            </div>

                        </div>
                    </Link>
                }

            </div>

            {caged && (
                <div className="relative inset-y-32   my-8 text-center border-poke-yellow border-spacing-2 ">
                    <button className="bg-bubble-gum  text-purple font-bold py-2 px-9 rounded" onClick={() => free()}>Free Pokemon?</button>
                </div>
            )
            }

        </div>

    );
};

export default Capture;