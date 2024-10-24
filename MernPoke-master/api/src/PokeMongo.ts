import mongoose from 'mongoose';

const { Schema } = mongoose;

const pokemonSchema = new Schema({
   
    name: String,
  
}, { versionKey: false });
  
const capturedPokemonModel = mongoose.model(
  "caputuredPokemon",
  pokemonSchema,
  "captured_pokemon"
)

export default capturedPokemonModel;
