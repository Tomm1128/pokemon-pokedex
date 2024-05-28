const randomPokemon = (Math.floor(Math.random() * 100) + 1)

const handleUserInput = (event) => {
  event.preventDefault()
  const userInput = event.target[0].value
  getPokemon(userInput)
}

const getPokemonTypes = (pokemon) => {
  const pokemonTypes = pokemon.types
  let typeArray = []
  pokemonTypes.map(type => typeArray.push(type.type.name))
  return typeArray
}

const displayPokemon = (pokemon) => {
  const pokedexSection = document.getElementById("pokedex")
  const detailsSection = document.getElementById("pokedex-details")
  const typesSection = document.getElementById("types-section")

  pokedexSection.innerHTML = " "
  detailsSection.innerHTML = " "
  typesSection.innerHTML = " "

  const img = document.createElement("img")
  const h2 = document.createElement("h2")
  const h3 = document.createElement("h3")
  const hp = document.createElement("p")
  const heightAndWeight = document.createElement("p")
  const typesList = document.createElement("ul")

  const pokemonSprite = pokemon.sprites.front_default
  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const pokemonHp = pokemon.stats[0].base_stat
  const pokemonHeight = pokemon.height
  const pokemonWeight = pokemon.weight
  const pokemonTypes = getPokemonTypes(pokemon)

  h2.textContent = pokemonName
  h3.textContent = "Types:"
  hp.textContent = `HP: ${pokemonHp}`
  heightAndWeight.textContent = `Height: ${pokemonHeight}'', Weight: ${pokemonWeight} lbs`

  pokemonTypes.forEach((type) => {
    const li = document.createElement("li")
    li.textContent = type
    typesList.appendChild(li)
  })

  img.id = "sprite"
  img.src = pokemonSprite

  pokedexSection.appendChild(img)
  detailsSection.appendChild(h2)
  detailsSection.appendChild(hp)
  detailsSection.appendChild(heightAndWeight)
  typesSection.appendChild(h3)
  typesSection.appendChild(typesList)
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
