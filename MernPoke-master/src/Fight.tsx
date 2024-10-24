import { useEffect, useState } from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/Pokemon";
import { Moves } from "./interfaces/Moves";
import AudioPlayer from "react-audio-player";
import "./index.css";
import { useLocation } from "react-router-dom";
import defaultGif from "./assets/mysunshine.gif";
import bgm from "./assets/wild-pokemon.mp3";
const memapower = "😭";
import { Link } from "react-router-dom";
import axios from "axios";
import ProgressBar from "./components/progress-bar.component";

const Fight = () => {
  const location = useLocation();
  const { pokemon1, pokemon2 } = location.state;

  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);

  const [move1, setMove1] = useState<Moves | null>(null);
  const [move2, setMove2] = useState<Moves | null>(null);
  const [move3, setMove3] = useState<Moves | null>(null);
  const [move4, setMove4] = useState<Moves | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);
  const [defaultHp1, setdefaultHp1] = useState(0);
  const [defaultHp2, setdefaultHp2] = useState(0);

  const [capture, setCapture] = useState<boolean>(false);
  const [fainted, setFainted] = useState<boolean>(false);

  const [stored, setStored] = useState<boolean>(false);

  const lvl = 1;


  function getRandomElFromArray(arrayLenght) {
    return Math.floor(Math.random() * arrayLenght);
  }

  const showMove = async (pokemon: typeof pokemon2Data) => {
    const move1 =
      pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url;
    const data1 = await fetch(`${move1}`);
    const show1 = await data1.json();

    const move2 =
      pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url;
    const data2 = await fetch(`${move2}`);
    const show2 = await data2.json();

    const move3 =
      pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url;
    const data3 = await fetch(`${move3}`);
    const show3 = await data3.json();

    const move4 =
      pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url;
    const data4 = await fetch(`${move4}`);
    const show4 = await data4.json();

    setMove1(show1);
    setMove2(show2);
    setMove3(show3);
    setMove4(show4);
  };

  const selected = async () => {
    const fetchJson1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon2}`
    );
    const pokemonData1 = await fetchJson1.json();
    setPOkemon1Data(pokemonData1);
    setPkmn1Hp((pokemon1Data?.stats[0].base_stat || 0) * lvl);
    setdefaultHp1((pokemon1Data?.stats[0].base_stat || 0) * lvl);

    const fetchJson2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon1}`
    );
    const pokemonData2 = await fetchJson2.json();
    setPOkemon2Data(pokemonData2);
    setPkmn2Hp((pokemon2Data?.stats[0].base_stat || 0) * lvl);
    setdefaultHp2((pokemon2Data?.stats[0].base_stat || 0) * lvl);
  };

  const hule = async (pokemon1Data: Pokemon | null, pokemon2Data: Pokemon | null) => {
    const calculateProbability = async () => {
      const probability =  (100 - (50*(pkmn1Hp/defaultHp1)));

      const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
          * (max - min + 1)) + min;
      };
 
       const capture = randomNumberInRange(1, 100);

      console.log("Capture Rate: " +capture)
      console.log("Probability Rate: " +probability)

      if (capture <= probability) {
        setResult("🎉Captured!! YIPPIEE 🎉");

        const url = `http://localhost:8080/api/pokemon/store`;

        const capturedPokemon = {
          name: pokemon1Data?.name,
        };
        const starterPokemon = {
          name: pokemon2Data?.name,
        };
        await axios
          .post(url, capturedPokemon)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(url, starterPokemon)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });


        setStored(true);
        setCapture(false);
      } else {
        setResult("Escaped!! 😭");
        setStored(true);
        setCapture(false);
      }
    };

    calculateProbability();
  };

  const [showHideButton, setShowHideButton] = useState(false);

  const handleClick = () => {
    setShowHideButton(true);
  };

  const enemy = async (pokemon: typeof pokemon2Data) => {
    const move1 =
      pokemon?.moves[getRandomElFromArray(pokemon.moves.length)].move.url;
    const data1 = await fetch(`${move1}`);
    const move = await data1.json();

    if (pkmn2Hp <= 0) {
      setPkmn2Hp(0);
      addItem(`[ ${pokemon2Data?.name} Fainted!! ]`);
      setFainted(true);
      setCapture(false);

    } else { //for level 10 default modifier
      const damage = Math.trunc(
        ((((2 * lvl) / 5) + 2) * (((move?.power || 0) * ((pokemon1Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0) /
          (pokemon2Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0))) / 50)
          + 2)
      );

      const deduct = pkmn2Hp - damage;

      console.log(
        pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0
      );

      console.log(move?.power || 0);
      console.log(deduct);

      addItem(
        "--------------------------------------------------------------------"
      );
      addItem(
        `${pokemon1Data?.name
        } " used " ${move?.name.toUpperCase()}  with a power of  ${damage}`
      );
      addItem(pokemon2Data?.name + " remaining HP: " + deduct);

      setPkmn2Hp(deduct);
    }
  };

  const payt = (move, target) => {
    setCapture(true);

    if (0 >= pkmn2Hp) {
      setCapture(false);
    }

    if (0 >= pkmn1Hp) {
      setPkmn1Hp(0);
      addItem(`[ ${pokemon1Data?.name} Fainted!! ]`);
    } else {
      if (target === 1) {

        const damage = Math.trunc(
          ((((2 * lvl) / 5) + 2) * (((move?.power || 0) * ((pokemon2Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0) /
            (pokemon1Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0))) / 50)
            + 2)
        );

      const deduct = pkmn1Hp - damage;

        console.log(pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0);

        console.log(move?.power || 0);
        console.log(deduct);

        addItem("--------------------------------------------------------------------");
        addItem(`${pokemon2Data?.name} used  ${move?.name.toUpperCase()} with a power of  ${damage}`);
        addItem(pokemon1Data?.name + " remaining HP: " + deduct);

        setPkmn1Hp(deduct);

      }
    }


    enemy(pokemon1Data);


  };

  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  useEffect(() => {
  }, []);



  return (
    <div
      className="  bg-no-repeat bg-cover overflow-hidden  bg-[url('https://i.pinimg.com/originals/08/d9/ef/08d9ef7723de602edefa8af825d9a1e2.gif')]   
           max-w-screen w-screen h-screen max-h-screen  grid-cols-4 content-center ...
          text-poke-yellow"
    >
      <AudioPlayer src={bgm} autoPlay={true} volume={0.9} />


      <div className=" grid grid-cols-3 gap-4 content-center ...">

        <div className=" gap-4  bg-grey-glass bg-opacity-20 w-[520px] h-[330px] overflow-auto border-poke-yellow border-spacing-2  ">
          <button
            className=" bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center p-2 rounded-lg font-bold border-b-4 border-l-4 border-t-4 border-white shadow-lg"
            onMouseEnter={handleClick}
            onClick={() => {
              selected()
            }}
          >
            Set Stage
          </button>
          <button
            className=" bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center p-2 rounded-lg font-bold border-b-4 border-l-4 border-t-4 border-white shadow-lg"
            onMouseEnter={handleClick}
            onClick={() => {
              showMove(pokemon2Data);
            }}
          >
            🔀 Generate Move Set
          </button>

          <br></br>
          <>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        </div>


        <div >
          {stored && (
            <div className="elative group content-center text-center grid justify-center items-center">
              {result && <p className="text-center">{result}</p>}

              <button className=" bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center p-2 rounded-lg font-bold border--4 border-l-4 border-r-4 border-white shadow-lg">
                <Link to="/Stored"> Stored Pokemon </Link>
              </button>

            </div>
          )}
          {capture && (
            <>
              <div className="content-center text-center grid justify-center items-center">
                <strong className="border-4">
                  {" "}
                  🔥 {pokemon1Data?.name.toUpperCase()} Current HP: {pkmn1Hp} 🔥
                </strong>{" "}
                <br></br>

                <strong className="fight">
                  {" "}
                  🏀🎱⚾🏐⚽ Capture Rate: {(100 - (50*(pkmn1Hp/defaultHp1))).toFixed(2)}% 🏀🎱⚾🏐⚽

                </strong>{" "}
                <br></br>


                <img
                  src="https://media1.tenor.com/m/lbh-EKElPukAAAAC/pokemon-go.gif"
                  alt="Serene Nature"
                  className="w-[200px] h-[120px] transition-opacity duration-30 ease-in-out opacity-0 hover:opacity-100"
                />
              </div>

              {showHideButton ? (
                <div className=" inset-x-36 relative md:place-content-start grid grid-cols-2 grid-flow-row gap-4 ">
                  <PinkButton
                    buttonClick={() => {
                      hule(pokemon1Data, pokemon2Data);
                    }}
                    label="💥CAPTURE???💥"
                  />
                  <br />
                </div>
              ) : null}



            </>
          )}

        </div>

        <div>

          <div className="">
            {pokemon1Data && (
              <div className="w-[400px] h-[350px]  md:place-content-end">
                <AudioPlayer src={pokemon1Data.cries.latest} autoPlay={true} volume={0.5} />
                <img
                  className=" drop-shadow-2xl size-44"
                  src={
                    pokemon1Data.sprites.other.showdown.front_default ||
                    defaultGif
                  }
                />
                <p>
                  Name: {pokemon1Data?.name.toUpperCase()} <br />
                  <span className=" bg-gray-200 h-4 rounded w-full animate-pulse text-gray-600">
                    HP: {pkmn1Hp}/{defaultHp1}
                  </span>{" "}
                  <br />
                  <ProgressBar bgcolor={"#6a1b9a"} completed={pkmn1Hp} hp={defaultHp1} />
                  <br />
                </p>
              </div>
            )}
          </div>

        </div>

        <div>
          {
            fainted && (
              <div><br></br>
                <button className=" text-2xl bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center p-28 rounded-lg font-bold border-2 border-white ">
                  <Link to="/About"> Fainted Back to Menu</Link>
                </button><br></br><br></br><br></br>

              </div>
            )

          }
          {pokemon2Data && (
            <div className="w-[500px] h-[300px] grid place-content-start md:place-content-end ">
              <AudioPlayer src={pokemon2Data.cries.latest} autoPlay={true} volume={0.5} />
              <img
                className="drop-shadow-2xl size-60"
                alt="https://media1.tenor.com/m/gnZcXcBonfUAAAAC/you-are-my-sunshine-lebron.gif"
                src={
                  pokemon2Data.sprites.other.showdown.back_default ||
                  defaultGif
                }
              />

              <p>
                Name: {pokemon2Data?.name.toUpperCase()} <br />

                <span className=" bg-gray-200 h-4 rounded w-full animate-pulse text-gray-600">
                  HP: {pkmn2Hp}/{defaultHp2}

                </span>{" "}
                <br />
                <ProgressBar bgcolor={"#6a1b9a"} completed={pkmn2Hp} hp={defaultHp2} />
              </p>
            </div>
          )}


        </div>

        <div>


          <div className=" inset-x-36 relative md:place-content-start w-[700px] h-[150px] grid grid-cols-2 grid-flow-row gap-4 ">
            {move1 && (
              <div
                className="
              
              border-spacing-2  bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center
                
                p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        "
                onClick={() => payt(move1, 1)}
              >
                <h1 className="text-3xl font-bold mb-4">{move1.name}</h1>
                <p className="text-lg">Raw Damage: {move1.power || memapower}</p>
              </div>
            )}


            {move2 && (
              <div
                className="
              
              border-spacing-2  bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center
                
                p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        "
                onClick={() => payt(move2, 1)}
              >
                <h1 className="text-3xl font-bold mb-4">{move2.name}</h1>
                <p className="text-lg">Raw Damage: {move2.power || memapower}</p>
              </div>
            )}


            {move3 && (
              <div
                className="
              
              border-spacing-2  bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center
                
                p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        "
                onClick={() => payt(move3, 1)}
              >
                <h1 className="text-3xl font-bold mb-4">{move3.name}</h1>
                <p className="text-lg">
                  Raw Damage: {move3.power || memapower}
                </p>
              </div>
            )}
            {move4 && (
              <div
                className="
              
              border-spacing-2  bg-bubble-gum bg-opacity-20 hover:bg-tahiti/25 content-center
                
                p-8 rounded-lg
                        border-2 border-white shadow-lg  
                        "
                onClick={() => payt(move4, 1)}
              >
                <h1 className="text-3xl font-bold mb-4">{move4.name}</h1>
                <p className="text-lg">
                  Raw Damage: {move4.power || memapower}
                </p>
              </div>
            )}

          </div>

        </div>



      </div>
    </div>
  );
};

export default Fight;