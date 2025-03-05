console.log("We are connected");
//INDEPENDENT FUNCTIONS

// reload page
function resetPage() {
  setTimeout(() => {
      location.reload();
  }, 500);
}

// assign imgURL to img.src and append to container
const generateImg = (imgUrl) => {
  let img = document.createElement("img");
  // assigns img src attribute the imgURL parameter
  img.src = imgUrl;
  // appends image to image container
  document.getElementById("container").appendChild(img);
};

//-------------------------------------------------------------------------------------------
// INTERDEPENDENT FUNCTIONS

// calls event after form submission
const getPokemons = (evt) => {
  evt.preventDefault();
  randomPokemons(); // Fetch a random Pokémon instead of taking user input
};


const randomPokemons = async () => {
  try {
    // takes in random ID from all available pokemon at:
    // https://pokeapi.co/docs/v2#pokemon-species count=1025
    let randomId = Math.floor(Math.random() * 1025) + 1; // Pokémon IDs range from 1 to 1025
    let requestUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    let response = await fetch(requestUrl);
    let data = await response.json();
    // console.log(data)
    // get imageURL from fetched data
    let imgUrl = data.sprites.front_default;
    generateImg(imgUrl);

    // finds same data type as the randomly pulled up pokemon, calls 
    // function pulling up 5 more random pokemons of same type
    let sameType = data.types[0].type.name
    console.log(sameType)
    randomSameTypePokemons(sameType)
  } catch (err) {
    console.log(err.message);
    alert("improper input");
  }
};


const randomSameTypePokemons = async (type) => {
  try {
    // utlized types api in docs, otherwise
    // mostly used same code as previous function
    let requestUrl = `https://pokeapi.co/api/v2/type/${type}`;
    let response = await fetch(requestUrl);
    let data = await response.json();
    
    // generate list of all pokemon names of same type
    let pokemonNames = [];
    for (let i = 0; i < data.pokemon.length; i++){
      pokemonNames.push(data.pokemon[i].pokemon.name)
    }
    // randomly shuffle pokemonNames and grab first 5 names
    let fiveShuffledNames = pokemonNames.sort(() => 0.5 - Math.random()).slice(0, 5); 

    // appends 5 random images of same time to container
    for (let name of fiveShuffledNames) {
      console.log(type)
      let requestUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
      let response = await fetch(requestUrl);
      let data = await response.json();
      // get imageURL from fetched data
      let imgUrl = data.sprites.front_default;
      generateImg(imgUrl);
    }
  } catch (err) {
    console.log(err.message);
    alert("improper input");
  }
};