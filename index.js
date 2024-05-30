const randomPokemon = (Math.floor(Math.random() * 100) + 1)
let count
let currentTeam = []
// let currentPokemon
let teamSection

const handleCry = (cryObj) => {
  const audioPlayer = document.getElementById("audio-player")
  if (cryObj.legacy){
    audioPlayer.src = cryObj.legacy
  } else {
    audioPlayer.src = cryObj.latest
  }
  audioPlayer.play()
}

const handleDelete = (event) => {
  const pokemonSlot = event.target.parentElement
  const currentPokemon = currentTeam.find((pokemon) => pokemonSlot.childNodes[1].textContent === pokemon.name)
  const id = currentPokemon.id

  fetch(`http://localhost:3000/pokemon-team/${id}`, {
      method: "Delete",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(_data => {
      pokemonSlot.textContent = ""
      updateTeamOrder()
    })
    .catch(error => {
      console.error('Error deleting resource:', error);
    })
}

const updateTeamOrder = () => {
  const teamSlots = [...document.getElementsByClassName("team-slots")]
  const slots = Array.from(teamSection.children)
  const newTeamOrder = slots.filter((slot) => slot.childElementCount > 1)

  newTeamOrder.forEach((slot, index) => {
    const id = slot.id
    if(slot.childElementCount > 1){
      fetch(`http://localhost:3000/pokemon-team/${id}`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          position: index + 1
        })
      })
      .catch(console.log)
    }
  })
  teamSlots.forEach((slot) => {
    slot.textContent = ""
  })
  getTeam()
}

const handleDragStart = (event) => {
  event.dataTransfer.setData('text/html', event.target.id)
  event.dataTransfer.effectAllowed = "move"
}

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

const handleDrop = (event) => {
  event.preventDefault();
  const draggedSlotId = event.dataTransfer.getData('text/html')
  const draggedTeamSlot = document.getElementById(draggedSlotId)
  const targetTeamSlot = event.target

  if (targetTeamSlot.classList.contains('team-slots') && targetTeamSlot !== draggedTeamSlot) {

    const draggedClone = draggedTeamSlot.cloneNode(true)
    const targetClone = targetTeamSlot.cloneNode(true)

    teamSection.replaceChild(targetClone, draggedTeamSlot)
    teamSection.replaceChild(draggedClone, targetTeamSlot)

    draggedClone.addEventListener('dragstart', handleDragStart)
    targetClone.addEventListener('dragstart', handleDragStart)
    draggedClone.addEventListener('dragover', handleDragOver)
    targetClone.addEventListener('dragover', handleDragOver)
    draggedClone.addEventListener('drop', handleDrop)
    targetClone.addEventListener('drop', handleDrop)

    updateTeamOrder()

    draggedClone.id = targetTeamSlot.id
    targetClone.id = draggedTeamSlot.id
  }
}

const displayTeam = (pokemon) => {
  const teamSlots = [...document.getElementsByClassName("team-slots")]
  const currentSlot = teamSlots.find((slot) => Number(slot.id) === pokemon.position)
  const sprite = document.createElement("img")
  const name = document.createElement("h3")
  const deleteButton = document.createElement("button")

  sprite.src = pokemon.sprite
  sprite.className = "team-sprite"
  name.textContent = pokemon.name
  deleteButton.className = "remove-from-team"
  deleteButton.textContent = "X"

  currentSlot.appendChild(sprite)
  currentSlot.appendChild(name)
  currentSlot.appendChild(deleteButton)

  deleteButton.addEventListener("click", handleDelete)

  currentSlot.addEventListener("dragstart", handleDragStart)

  currentSlot.addEventListener('dragover', handleDragOver)

  currentSlot.addEventListener("drop", handleDrop)

  currentTeam.push(pokemon)
}

const handleFavorite = (pokemon) => {
  const teamSlots = [...document.getElementsByClassName("team-slots")]
  const currentSlot = teamSlots.find((slot) => slot.childElementCount < 1)
  if (currentSlot !== undefined){
    pokemon.id = currentSlot.id
    pokemon.position = Number(currentSlot.id)

    fetch(`http://localhost:3000/pokemon-team`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    .then(resp => resp.json())
    .then(displayTeam)
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
  typesSection.textContent = " "
  nameSection.textContent = " "


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
  img.addEventListener("click", (_event) => handleCry(pokemon.cry))
}

const createPokemon = (pokemon) => {
  const newPokemon = {
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    types: getPokemonTypes(pokemon),
    hp: pokemon.stats[0].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    sprite: pokemon.sprites.front_default,
    cry: pokemon.cries,
  }
  // currentPokemon = pokemon
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

const handleSearch = () => {
  const pokemonSearchForm = document.getElementById("pokemon-search")
  pokemonSearchForm.addEventListener("submit", handleUserInput)
}

const init = () => {
  teamSection = document.getElementById("pokemon-team")
  getPokemon()
  getTeam()
  handleSearch()
}


document.addEventListener("DOMContentLoaded", init)
