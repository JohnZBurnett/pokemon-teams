const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function(event) {



  function createAndAppendPokemon(trainerObj, newTrainerElement) {
    const pokemonArr = trainerObj.pokemons;
    pokemonArr.forEach( function(pokemonObj) {
      newTrainerElement.append(createPokemonElement(pokemonObj))
    })
    debugger;
  }

  function createPokemonElement(pokemonObj) {

  }
  function createTrainerElement(trainerObj) {
    const newTrainerElement = document.createElement("div");
    formatTrainerElementInformation(trainerObj, newTrainerElement);
    createAndAppendPokemon(trainerObj, newTrainerElement);
    mainTag.append(newTrainerElement);
    debugger;
  }

  function displayTrainer(trainerObj) {
    let trainerElement = createTrainerElement(trainerObj);
  }

  function formatTrainerElementInformation(trainerObj, newTrainerElement) {
    newTrainerElement.className = "card";
    newTrainerElement.dataId = trainerObj.id;
    newTrainerElement.innerHTML += `<p>${trainerObj.name}</p>`
    newTrainerElement.innerHTML += `<button data-trainer-id="${trainerObj.id}">Add Pokemon</button>`
    return newTrainerElement;
  }

  function handleDisplayingTrainers(trainersJson) {
    trainersJson.forEach( function(trainer) { displayTrainer(trainer)});
  }

  function loadAndDisplayData() {
    fetch(TRAINERS_URL).then( function(response) { return response.json() }).then( function(trainersJson) { handleDisplayingTrainers(trainersJson)})
  }
  loadAndDisplayData();

//   <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
})
