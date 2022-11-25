let url = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";
let select = document.querySelector("select");
let list = document.querySelector("ul");
let chose = document.getElementById("chose");
let but1 = document.getElementById("bt1");
let buttons = document.getElementById("buttons");
let limit = 5;
let offset = 0;
makelist(url);
select.addEventListener("change", function(event){
    limit = event.target.value;
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    list.innerHTML = "";
    makelist(url);
})
function makelist(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.responseType = "json"
    request.onload = function(){
        chose.style.display = "none";
        let pokelist = request.response.results;
        pokelist.forEach(pokemon => {
            buttons.style.display = "flex";
            list.innerHTML += `
                <li onclick="show('${pokemon.url}')">${pokemon.name}</li>
            `;
        });
    }
}
function show(pokemonurl) {
    console.log(pokemonurl)
    let pokerequest = new XMLHttpRequest();
    pokerequest.open("GET", pokemonurl);
    pokerequest.send();
    pokerequest.responseType = "json";
    pokerequest.onload = function () {
        let response = pokerequest.response;
        list.innerHTML = "";
        chose.style.display = "flex";
        buttons.style.display = "none";
        chose.innerHTML = `
            <button onclick="makelist('${url}')" id="back">Back</button>
            <p>${response.name} №${response.id}</p>
            <img src="${response.sprites.front_default}">
        `
    }
}
function previous() {
    offset -= limit;
    if(offset <= 0){
        document.getElementById("bt1").style.display = "none";
    };
    if (limit >= 1154) {
        document.getElementById("bt2").style.display = "none";
    }
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    list.innerHTML = "";
    makelist(url);
}

function next() {
    offset += limit;
    if(offset > 0){
        document.getElementById("bt1").style.display = "flex";
    };
    if(limit < 1154){
        document.getElementById("bt2").style.display = "flex";
    }
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    list.innerHTML = "";
    makelist(url);
}