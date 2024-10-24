
import { useState, useEffect } from "react";
//import { PokemonList } from "../interfaces/PokemonList";
import { Link } from "react-router-dom";
import defaultGif from "../assets/mysunshine.gif";
import bgm from "../assets/stored.mp3";
import AudioPlayer from "react-audio-player";

const Stored = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      fetch("http://localhost:8080/api/pokemon/owned")
        .then((response) => response.json())
        .then((data) => setEmployees(data));
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="  overflow-auto   bg-cover w-screen bg-[url('https://media1.tenor.com/m/uEPkDfFH6osAAAAC/moutian-pixel.gif')]  h-screen max-h-screen ...
    text-poke-yellow">
      <div>
      <AudioPlayer src={bgm}  loop={true} autoPlay={true} volume={0.9} />
        <div className="gap-5 hover:bg-tahiti/25 content-center p-4 rounded-lg font-bold border-b-4 border-l-4 border-t-4 border-white shadow-lg">
          <button className=" gap-5 bg-bubble-gum bg-opacity-90 hover:bg-tahiti/25 content-center p-4 rounded-lg font-bold border-b-4 border-l-4 border-t-4 border-white shadow-lg">
            <Link to="/About">
              <img
                src={"https://img.icons8.com/?size=100&id=15157&format=png&color=000000" || defaultGif}
                alt="Beautiful Landscape"
                className="w-[100px] h-[60px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
              />


            </Link> </button>
        </div>

        <div  className=" relative   grid grid-cols-5 grid-flow-row gap-4">
          {
            employees.map((employee) => (
              
              <Link to="/Capture" state={{ pokemon: employee.name , pokemonid: employee._id} }>

                  <div  className="   border-4">
                  <div className="relative group">
                    <div className="bg-bubble-gum   hover:drop-shadow-xl text-purple font-bold py-2 px-4 rounded">
                      {employee.name.toUpperCase()}
                    </div>

                    <img
                      src={"https://media.tenor.com/WkesrjxP9rAAAAAi/pokemon-pikachu.gif" || defaultGif}
                      alt="Beautiful Landscape"
                      className="w-[150px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                    />
                    <img
                      src={"https://media1.tenor.com/m/lbh-EKElPukAAAAC/pokemon-go.gif"}
                      alt="Serene Nature"
                      className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                    />
                    <div className=" bg-opacity-20 hover:bg-red/25 content-center text-center ">
                      <p>
                      Pokemon Capture id: {employee._id}
                      </p>
                    </div>

                  </div>

                  </div>
                
              </Link>
            ))
          }

        </div>

      </div>
    </div>

  );
};

export default Stored;