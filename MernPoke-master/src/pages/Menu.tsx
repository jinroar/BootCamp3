//Menu.js 
import { Link } from "react-router-dom";
import AudioPlayer from "react-audio-player";
import bgm from "../assets/menu.mp3";

const Menu = () => {
  return (
    <div className="w-screen h-screen bg-metal object-center overflow-hidden">
      <div className="w-screen bg-metal text-tahiti text-center ">
      <AudioPlayer src={bgm}  loop={true} autoPlay={true} volume={0.9} />
        <div className="text-poke-yellow font-bold text-9xl text-center">
        
          <h1>Pokemon GeMi</h1>
        </div>
      </div>

      <div className=" inset-x-80 relative md:place-content-start grid grid-cols-4 grid-flow-col gap-4 ">
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Beautiful Landscape"
          className=" w-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Serene Nature"
          className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        />
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Beautiful Landscape"
          className="w-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Serene Nature"
          className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>



      <div className=" relative  w-screen bg-red text-poke-yellow text-center">

        <div className="  shadow-2xl font-bold text-5xl h-56 grid grid-cols-1 gap-x-28 place-content-center ... ">

          <button className=" shadow-2xl  h-20  hover:border-tahiti border-spacing-2 top-36 border-4 ... bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4" >

            {/* Endpoint to route to Home component */}
            <Link to="/PickPokemon">Play</Link>
          </button>

          <button className="  shadow-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link to="/Stored"> Stored Pokemon </Link>
          </button>

        </div>

      </div>
      <div className=" relative inset-x-80  grid grid-cols-4 gap-4 ">
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Beautiful Landscape"
          className=" w-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Serene Nature"
          className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        />
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Beautiful Landscape"
          className="w-[100px] h-[120px] transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={"https://media.tenor.com/Csfm8xOrdJcAAAAj/fatality.gif"}
          alt="Serene Nature"
          className="w-[200px] h-[120px] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>
    </div>
  )
}

export default Menu;