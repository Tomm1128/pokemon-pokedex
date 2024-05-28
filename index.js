const randomPokemon = Math.floor(Math.random() * 100)

const displayPokemon = (pokemon) => {
  const pokemonSection = document.getElementById("pokedex")
  const img = document.createElement("img")

  const pokemonSprite = pokemon.sprites.front_default

  img.id = "sprite"
  img.src = pokemonSprite

  pokemonSection.appendChild(img)
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
