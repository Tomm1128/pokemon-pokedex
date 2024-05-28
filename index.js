const randomPokemon = Math.floor(Math.random() * 100)

const handleUserInput = (event) => {
  event.preventDefault()
  const userInput = event.target[0].value
  getPokemon(userInput)
}

const displayPokemon = (pokemon) => {
  const pokedexSection = document.getElementById("pokedex")
  const detailsSection = document.getElementById("pokedex-details")

  pokedexSection.innerHTML = " "
  detailsSection.innerHTML = " "

  const img = document.createElement("img")
  const h2 = document.createElement("h2")
  const p = document.createElement("p")
  const span = document.createElement("span")

  const pokemonSprite = pokemon.sprites.front_default
  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

  h2.textContent = pokemonName

  img.id = "sprite"
  img.src = pokemonSprite

  pokedexSection.appendChild(img)
  detailsSection.appendChild(h2)
}

const getPokemon = (id = randomPokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(resp => resp.json())
  .then(displayPokemon)
}

const init = () => {
  const pokemonSearchForm = document.getElementById("pokemon-search")
  getPokemon()

  pokemonSearchForm.addEventListener("submit", handleUserInput)
}


document.addEventListener("DOMContentLoaded", init)
