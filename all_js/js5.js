let url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
let form = document.querySelector("form");
let main = document.querySelector("main");
let order = true;
let object = "id";
let allpoks = [];
let allPromises = [];
let request = new XMLHttpRequest();
request.open("GET", url);
request.send();
request.responseType = "json";
request.onload = function(){
    let pokemons = request.response.results;
    pokemons.forEach(pokemon => {
        console.log(1);
        let promise = new Promise(function(resolve, reject){
            let pokerequest = new XMLHttpRequest();
            pokerequest.open("GET", pokemon.url);
            pokerequest.responseType = "json";
            pokerequest.send();
            pokerequest.onload = function(){
                if (pokerequest.status === 200){
                    resolve(pokerequest.response);
                }
                else{
                    reject(pokerequest.statusText);
                }
            }
            pokerequest.onerror = function(){
                reject(pokerequest.statusText);
            }
        });
        promise.then(function (pokemon){
            allpoks.push(pokemon);
            drawpok(pokemon);
        });
    });
}

function drawpok(pokemon){
    main.innerHTML += `
    <div id="pokemon">
        <p>№${pokemon.id}<p>
        <p>${pokemon.name}<p>
        <div id="items">
            <p id="itemhp">${pokemon.stats[0].base_stat}</p>
            <p class="itemataack">${pokemon.stats[1].base_stat}</p>
            <p class="itemdefense">${pokemon.stats[2].base_stat}</p>
            <p class="itemdefense">${pokemon.stats[5].base_stat}</p>
        </div>
    </div>
    `
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    if(event.target.name.value){
        allpoks = allpoks.filter(function(pokemon){
            return pokemon.name.indexOf(event.target.value.toLowerCase()) !== -1;
        });
    }
    if(event.target.minattack.value > 5){
        allpoks = allpoks.filter(function (pokemon){
            return pokemon.stats[1].base_stat >= event.target.minattack.value;
        });
    }
    if(event.target.maxattack.value < 130){
        allpoks = allpoks.filter(function (pokemon){
            return pokemon.stats[1].base_stat <= event.target.maxattack.value;
        });
    }
    if(event.target.mindefense.value > 5){
        allpoks = allpoks.filter(function (pokemon){
            return pokemon.stats[2].base_stat >= event.target.mindefense.value;
        });
    }
    if(event.target.maxdefense.value < 180){
        allpoks = allpoks.filter(function (pokemon){
            return pokemon.stats[2].base_stat <= event.target.maxdefense.value;
        });
    }
})
