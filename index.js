const randomPokemon = Math.floor(Math.random() * 100)

const displayPokemon = (pokemon) => {
  const pokemonSection = document.getElementById("pokedex")
  const pokemonSprite = pokemon.sprites.front_default
  const img = document.createElement("img")
  img.id = "sprite"
  img.src = pokemonSprite
  pokemonSection.appendChild(img)
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
