const randomPokemon = (Math.floor(Math.random() * 100) + 1)
let count
let currentTeam = []
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

const updateTeamOrder = () => {
  currentTeam.forEach((pokemon) => {
    const id = pokemon.id
    fetch(`http://localhost:3000/pokemon-team/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        position: pokemon.position
      })
    })
    .then(resp => resp.json())
    .then(pokemon => {
      displayTeam(pokemon)
    })
    .catch(console.log)
  })
}

const handleTeamOrder = (oldSlot, newSlot) => {
  currentTeam.map((pokemon) => {
    if (pokemon.position === Number(oldSlot)){
      pokemon.position = Number(newSlot)
    } else if (pokemon.position === Number(newSlot)){
      pokemon.position = Number(oldSlot)
    }
  })
  updateTeamOrder()
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
      const extractedId = Number(currentPokemon.id)
      const deletedPokemon = currentTeam.find((pokemon) => Number(pokemon.id) === extractedId)
      const pokemonId = Number(deletedPokemon.id) - 1
      currentTeam.splice(pokemonId, 1)
      handleTeamOrder()
    })
    .catch(error => {
      console.error('Error deleting resource:', error);
    })
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

    draggedClone.id = targetTeamSlot.id
    targetClone.id = draggedTeamSlot.id

    draggedClone.addEventListener('dragstart', handleDragStart)
    targetClone.addEventListener('dragstart', handleDragStart)
    draggedClone.addEventListener('dragover', handleDragOver)
    targetClone.addEventListener('dragover', handleDragOver)
    draggedClone.addEventListener('drop', handleDrop)
    targetClone.addEventListener('drop', handleDrop)

    handleTeamOrder(targetClone.id, draggedClone.id)
  }
}

const displayTeam = (pokemon) => {
  const teamSlots = [...document.getElementsByClassName("team-slots")]
  const currentSlot = teamSlots.find((slot) => Number(slot.id) === pokemon.position)

  currentSlot.textContent = ""
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
}

const handleFavorite = (pokemon) => {
  const teamSlots = [...document.getElementsByClassName("team-slots")]
  const currentSlot = teamSlots.find((slot) => slot.childElementCount < 1)
  let lastId
  debugger

  if (currentSlot !== undefined){

    if (currentSlot.id === "1"){
      lastId = 0
    } else {
      const lastPokemon = currentTeam.reduce((max, current) => {
        return current.id > max.id ? current : max;
      })
      lastId = Number(lastPokemon.id)
    }

    const newId = lastId + 1
    pokemon.id = newId.toString()
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
    .then(pokemon => {
      displayTeam(pokemon)
      currentTeam.push(pokemon)
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

const updatePokedex = (pokemon) => {
  const pokedexSection = document.getElementById("pokedex")
  pokedexSection.innerHTML = " "
  const img = document.createElement("img")
  img.id = "sprite"
  img.src = pokemon.sprite
  pokedexSection.appendChild(img)
  img.addEventListener("click", (_event) => handleCry(pokemon.cry))
}

const updateDetails = (pokemon) => {
  const detailsSection = document.getElementById("details-section")
  detailsSection.innerHTML = " "
  const hp = document.createElement("p")
  const heightAndWeight = document.createElement("p")
  hp.textContent = `HP: ${pokemon.hp}`
  heightAndWeight.textContent = `Height: ${pokemon.height}'', Weight: ${pokemon.weight} lbs`
  detailsSection.appendChild(hp)
  detailsSection.appendChild(heightAndWeight)
}

const updateName = (pokemon) => {
  const nameSection = document.getElementById("name-section")
  nameSection.textContent = " "

}

const displayPokemon = (pokemon) => {
  updatePokedex(pokemon)
  updateDetails(pokemon)
  const nameSection = document.getElementById("name-section")
  const typesSection = document.getElementById("types-section")
  const pokedexEntry = document.getElementById("pokedex-entry")

  typesSection.textContent = " "
  nameSection.textContent = " "

  const h2 = document.createElement("h2")
  const h3 = document.createElement("h3")
  const typesList = document.createElement("ul")
  const favoriteButton = document.createElement("button")

  const pokemonTypes = pokemon.types

  h2.textContent = pokemon.name
  h3.textContent = "Types:"
  favoriteButton.textContent = "Add to Team"
  favoriteButton.id = "favorite-pokemon"

  pokemonTypes.forEach((type) => {
    const li = document.createElement("li")
    li.textContent = type
    typesList.appendChild(li)
  })

  nameSection.appendChild(h2)
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
    sprite: pokemon.sprites.front_default,
    cry: pokemon.cries,
  }
  displayPokemon(newPokemon)
}

const getTeam = () => {
  fetch(`http://localhost:3000/pokemon-team`)
  .then(resp => resp.json())
  .then(team => {
    currentTeam = team
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
