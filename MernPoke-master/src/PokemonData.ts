
  const pokedeets = {

    // data property
    Pokemon1: '',
    Pokemon2: '',

    // accessor property(getter)
    get getPokemon1() {
      return this.Pokemon1;
    },
    //accessor property(setter)
    set setPokemon1(newName) {
      this.Pokemon1 = newName;
    },

        // accessor property(getter)
    get getPokemon2() {
      return this.Pokemon2;
    },
    //accessor property(setter)
    set setPokemon2(newName) {
      this.Pokemon2 = newName;
    }

  };
  export default pokedeets;