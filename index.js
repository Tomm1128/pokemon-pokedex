const randomPokemon = Math.floor(Math.random() * 100)

const displayPokemon = (pokemon) => {
  const pokemonSection = document.getElementById("pokedex")
  const img = document.createElement("img")
  const h3 = document.createElement("h3")
  const p = document.createElement("p")
  const span = document.createElement("span")

  const pokemonSprite = pokemon.sprites.front_default
  const pokemonName = pokemon.name

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
