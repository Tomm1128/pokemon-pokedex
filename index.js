const randomPokemon = (Math.floor(Math.random() * 100) + 1)

const displayTeam = (pokemon) => {

  const teamSection = document.getElementById("pokemon-team")
  const teamSlots = [...document.getElementsByClassName("team-slots")]

  const currentSlot = teamSlots.find((slots) => slots.childElementCount < 2)
  const sprite = document.createElement("img")
  const name = document.createElement("h3")
  const deleteButton = document.createElement("button")

  sprite.src = pokemon.sprite
  sprite.className = "team-sprite"
  name.textContent = pokemon.name
  deleteButton.className = "remove-from-team"
  deleteButton.textContent = "X"
  currentSlot.id = pokemon.id

  currentSlot.appendChild(sprite)
  currentSlot.appendChild(name)
  currentSlot.appendChild(deleteButton)
}

const handleFavorite = (pokemon) => {
  const teamSlots = [...document.getElementsByClassName("team-slots")]
  const currentSlot = teamSlots.find((slots) => slots.id === "")
  let count
  if (count <= 6){
    count = Number(currentSlot.previousElementSibling.id) + 1
    pokemon.id = count

    fetch(`http://localhost:3000/pokemon-team`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
  }
  else {
    alert ("Team is full")
  }
}

const handleUserInput = (event) => {
  event.preventDefault()
  const userInput = event.target[0].value
  getPokemon(userInput)
}

const getPokemonTypes = (pokemon) => {
  const pokemonTypes = pokemon.types
  return pokemonTypes.map(type => type.type.name)
}

const displayPokemon = (pokemon) => {
  const pokedexSection = document.getElementById("pokedex")
  const detailsSection = document.getElementById("details-section")
  const nameSection = document.getElementById("name-section")
  const typesSection = document.getElementById("types-section")
  const pokedexEntry = document.getElementById("pokedex-entry")

  pokedexSection.innerHTML = " "
  detailsSection.innerHTML = " "

  const img = document.createElement("img")
  const h2 = document.createElement("h2")
  const h3 = document.createElement("h3")
  const hp = document.createElement("p")
  const heightAndWeight = document.createElement("p")
  const typesList = document.createElement("ul")
  const favoriteButton = document.createElement("button")

  const pokemonSprite = pokemon.sprite
  const pokemonName = pokemon.name
  const pokemonHp = pokemon.hp
  const pokemonHeight = pokemon.height
  const pokemonWeight = pokemon.weight
  const pokemonTypes = pokemon.types

  h2.textContent = pokemonName
  h3.textContent = "Types:"
  hp.textContent = `HP: ${pokemonHp}`
  heightAndWeight.textContent = `Height: ${pokemonHeight}'', Weight: ${pokemonWeight} lbs`
  favoriteButton.textContent = "Add to Team"
  favoriteButton.id = "favorite-pokemon"

  pokemonTypes.forEach((type) => {
    const li = document.createElement("li")
    li.textContent = type
    typesList.appendChild(li)
  })

  img.id = "sprite"
  img.src = pokemonSprite

  pokedexSection.appendChild(img)
  nameSection.appendChild(h2)
  detailsSection.appendChild(hp)
  detailsSection.appendChild(heightAndWeight)
  pokedexEntry.appendChild(favoriteButton)
  typesSection.appendChild(h3)
  typesSection.appendChild(typesList)

  favoriteButton.addEventListener("click", (_event) => handleFavorite(pokemon))
}

const createPokemon = (pokemon) => {
  const newPokemon = {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    types: getPokemonTypes(pokemon),
    hp: pokemon.stats[0].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    sprite: pokemon.sprites.front_default
  }
  displayPokemon(newPokemon)
}

const getTeam = () => {
  fetch(`http://localhost:3000/pokemon-team`)
  .then(resp => resp.json())
  .then(team => {
    team.forEach(pokemon => displayTeam(pokemon) )
  })
}

const getPokemon = (id = randomPokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(resp => resp.json())
  .then(createPokemon)
}

const init = () => {
  const pokemonSearchForm = document.getElementById("pokemon-search")
  getPokemon()
  getTeam()

  pokemonSearchForm.addEventListener("submit", handleUserInput)
}


document.addEventListener("DOMContentLoaded", init)
