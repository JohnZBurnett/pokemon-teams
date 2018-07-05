const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function(event) {


  mainTag.addEventListener("click", handleAddingOrDeletingPokemon);

  function addPokemonToTeam(event) {
    let trainerElement = event.target.parentElement;
    let payload = {trainer_id: event.target.dataset.trainerId};
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
    fetch(POKEMONS_URL, configObj).then( resp => resp.json() ).then( pokemonJson =>  trainerElement.append(createPokemonElement(pokemonJson)));
  }

  function createPokemonElement(pokemonObj) {
    const newPokemonElement = document.createElement("li");
    const newPokemonButton = document.createElement("button");
    newPokemonElement.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`
    newPokemonButton.className = "release"
    newPokemonButton.dataset.pokemonId = `${pokemonObj.id}`
    newPokemonButton.innerText = "Release";
    newPokemonElement.appendChild(newPokemonButton);
    return newPokemonElement;
    // debugger;

  }
  function createTrainerElement(trainerObj) {
    const newTrainerElement = document.createElement("div");
    formatTrainerElementInformation(trainerObj, newTrainerElement);
    handleAppendingPokemon(trainerObj, newTrainerElement);
    mainTag.append(newTrainerElement);
  }

  function deletePokemonFromDb(event) {
    const configObj = {
      method: 'DELETE'
    };
    fetch(POKEMONS_URL + `/${event.target.dataset.pokemonId}`, configObj)
  }

  function displayTrainer(trainerObj) {
    let trainerElement = createTrainerElement(trainerObj);
  }

  function formatTrainerElementInformation(trainerObj, newTrainerElement) {
    newTrainerElement.className = "card";
    newTrainerElement.dataId = trainerObj.id;
    newTrainerElement.innerHTML += `<p>${trainerObj.name}</p>`
    newTrainerElement.innerHTML += `<button data-trainer-id="${trainerObj.id}">Add Pokemon</button><ul></ul>`
    return newTrainerElement;
  }
  function handleAppendingPokemon(trainerObj, newTrainerElement) {
    const pokemonArr = trainerObj.pokemons;
    pokemonArr.forEach( function(pokemonObj) {
      newTrainerElement.append(createPokemonElement(pokemonObj))
    })
  }

  function handleAddingOrDeletingPokemon(event) {
    if (event.target.className === "release" ) {
      handleDeletingPokemon(event);
    } else if (event.target.innerText === "Add Pokemon") {
        if (event.target.parentElement.querySelectorAll("li").length < 6) {
          addPokemonToTeam(event);
        } else {
          window.alert("You can't add Pokemon to a full team! Release a Pokemon first, or store it at a PokeCenter.")
        }
      }
  }

  function handleDeletingPokemon(event) {
    event.target.parentElement.remove()
    deletePokemonFromDb(event)
  }

  function handleDisplayingTrainers(trainersJson) {
    trainersJson.forEach( function(trainer) { displayTrainer(trainer)});
  }

  function loadAndDisplayData() {
    fetch(TRAINERS_URL).then( function(response) { return response.json() }).then( function(trainersJson) { handleDisplayingTrainers(trainersJson)})
  }
  loadAndDisplayData();
})
