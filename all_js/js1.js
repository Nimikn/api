let xhr = new XMLHttpRequest();
xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/25/");
xhr.send();
xhr.responseType = 'json';
let tx = document.getElementById("tx");
let sub = document.getElementById("sub");
let puk = document.getElementById("puk");
let div = document.createElement("div");
div.className = "bug"
puk.prepend(div);
console.log(xhr)
puk.addEventListener("submit", function(event){
    event.preventDefault();
    let pok = tx.value;
    let pokemon = new XMLHttpRequest();
    pokemon.open("GET",`https://pokeapi.co/api/v2/pokemon/${pok}/`);
    pokemon.responseType = "json";
    pokemon.send();
    pokemon.onload = function(){
        div.innerHTML = `
        <p>${pokemon.response.name[0].toUpperCase() + pokemon.response.name.slice(1)} №${pokemon.response.id}</p>
        <img src="${pokemon.response.sprites.front_female}">
        `
        console.log(pokemon);
    }
    
})





    // let response = pokemon.response;
    // let forms = response.forms;
    // let g = forms[0];
    // let name = g.name;
    // p.textContent = name;








    // let response = pokemon.response;
    // let sprites = pokemon.response.sprites;
    // let pokemonimg = sprites.back_default;
    // let name = pokemon.move.name;
    // p.textContent = name;
    // img.src = pokemonimg;
    // div.prepend(p);
    // div.prepend(img);
    // puk.prepend(div);