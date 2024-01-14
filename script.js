// Elements to use from html doc
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

//To make the Pokemon with number id 1 always shows first
let searchPokemon = 1;

// Connect to the PokeAPI
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = APIResponse.json();
        return data;
    }
    

}

// Visualize Pokemon 
const renderPokemon = async (pokemon) => {

    //Display name before searching
    pokemonName.innerHTML= 'Loading...'
    pokemonNumber.innerHTML= '';

    const data = await fetchPokemon(pokemon);
    
    //Connect the element from the top codes
    if (data) {
        pokemonName.innerHTML= data.name;
        pokemonNumber.innerHTML= data.id;
        pokemonImage.style.display = 'block';
        pokemonImage.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = '';
        searchPokemon =data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML= 'Not found :(';
        pokemonNumber.innerHTML= '';
    }   
}


//So the searchbar can searh name or number id
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

//To make Previous Button works
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

//To make Next Button works
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


//To shows up first Pokemon select
renderPokemon(searchPokemon);