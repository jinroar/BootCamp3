import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

interface Pokemon {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  image: string;
}

const App: React.FC = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");
  const [winner, setWinner] = useState<Pokemon | null>(null);
  const [remainingHealth, setRemainingHealth] = useState<number[]>([]); // State to hold remaining health values

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setWinner(null); // Reset winner before new submission

    try {
      const response = await axios.post("http://localhost:5000/submit", {
        names: [name1.toLowerCase(), name2.toLowerCase()],
      });
      const data = response.data.results;
      setPokemonData(data);

      // Calculate remaining health for each Pokémon
      const remainingHealth1 = data[0].hp + data[0].defense - data[1].attack;
      const remainingHealth2 = data[1].hp + data[1].defense - data[0].attack;

      // Store remaining health values
      setRemainingHealth([remainingHealth1, remainingHealth2]);

      // Determine the winner based on remaining health
      if (remainingHealth1 > remainingHealth2) {
        setWinner(data[0]);
      } else if (remainingHealth2 > remainingHealth1) {
        setWinner(data[1]);
      } else {
        setWinner(null); // No winner in case of a tie
      }
    } catch (error) {
      console.error("Error sending data:", error);
      setError("Failed to fetch Pokémon data");
    }
  };

  return (
    <div className="app-container">
      <h1>Pokémon Battle</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={name1}
            onChange={(e) => handleInputChange(e, setName1)}
            placeholder="Enter first Pokémon name"
            className="input-field"
          />
          <input
            type="text"
            value={name2}
            onChange={(e) => handleInputChange(e, setName2)}
            placeholder="Enter second Pokémon name"
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      {pokemonData.length > 0 && (
        <div className="pokemon-container">
          {pokemonData.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <h2>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <p>HP: {pokemon.hp}</p>
              <p>Attack: {pokemon.attack}</p>
              <p>Defense: {pokemon.defense}</p>
            </div>
          ))}
        </div>
      )}

      {winner && (
        <div className="winner-container">
          <h2 className="winner-title">
            {winner.name.charAt(0).toUpperCase() + winner.name.slice(1)} is the
            winner
          </h2>
          <img src={winner.image} alt={winner.name} className="winner-image" />
          <p>Congratulations!</p>
          <p>
            Remaining Health:{" "}
            {winner.name === pokemonData[0].name
              ? remainingHealth[0]
              : remainingHealth[1]}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
