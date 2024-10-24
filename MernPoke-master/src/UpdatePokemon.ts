// UpdateUser.js (React)

import PokemonData from "../api/src/PokeMongo";
import pokeRoutes from "../api/src/pokemon";


function DataPokemon (id, updatedUser, hp?) { 

    const updateUser = async (id, updatedUser , hp) => {
        try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        });
        const data = await response.json();
        console.log(data); // User updated successfully
        } catch (error) {
        console.error(error);
        }

        PokemonData(data.id, pokedeets);

    };

  const addUser = async (id, addUser) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addUser),
      });
      const data = await response.json();
      console.log(data); // User updated successfully
    } catch (error) {
      console.error(error);
    }
  };

  const addUserExpress = async (id, addUser) => {
  pokeRoutes.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const addUser = req.body;
    // Update the user object in your database or data storage
    // ...
    res.send({ message: 'User updated successfully' });
  });
};


}

  export default DataPokemon;