const randomPokemon = Math.floor(Math.random() * 100)

const displayPokemon = (pokemon) => {
  const pokemonSection = document.getElementById("pokemon-details")
  // debugger
}

const getPokemon = (id = randomPokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(resp => resp.json())
  .then(displayPokemon)
}

const init = () => {
  getPokemon()
}


document.addEventListener("DOMContentLoaded", init)
