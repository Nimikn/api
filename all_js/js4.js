let url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
let form = document.querySelector("form");
let div = document.getElementById("div");
console.log(div);
let order = true;
let object = "id";
let allpoks = [];
let request = new XMLHttpRequest();
request.open("GET", url);
request.send();
request.responseType = "json";
request.onload = function(){
    let pokemons = request.response.results;
    pokemons.forEach(pokemon => {
        let promise = new Promise( function (resolve, reject) {
            let pokerequest = new XMLHttpRequest();
            pokerequest.open("GET", pokemon.url);
            pokerequest.send();
            pokerequest.responseType = "json";
            pokerequest.onload = function(){
                if(pokerequest.status == 200){
                    resolve(pokerequest.response);
                }
                else {
                    reject(pokerequest.statusText);
                }
            }
            pokerequest.onerror = function(){
                reject(pokerequest.statusText);
            }
        });
        promise.then(function(pokemon) {
            allpoks.push(pokemon);
            drawpok(pokemon);
        });
    });
}
function drawpok(pokemon){

    div.innerHTML += `
    <div id="pokemon">
        <p>№${pokemon.id}<p>
        <p>${pokemon.name}<p>
        <img src="${pokemon.sprites.front_default}">
    </div>
    `;
}
form.addEventListener("change", function(event){
    let value = event.target.value;
    switch (value){
        case "id":
            object = "id";
            break;
            
        case "hp":
            object = "hp";
            break;
            
        case "attack":
            object = "attack";
            break;
            
        case "shield":
            object = "shield";
            break;
        case "big":
            order = true;    
            break;

        case "small":
            order = -order;
            break;
    };
    sort(object, order);
    sort();
});
function sort(item){
    div.innerHTML = ``;
    switch(object){
        case "id":
            allpoks = allpoks.sort(function(first, second){
                if(first.id > second.id){
                    return order;
                };
                if(first.id < second.id){
                    return -order;
                }
            });
        break;
        case "hp":
            allpoks = allpoks.sort(function(first, second){
                if(first.stats[0].base_stat > second.stats[0].base_stat){
                return order;
                };
                if(first.stats[0].base_stat < second.stats[0].base_stat){
                    return -order;
                }
            });
        break;
        case "attack":
            allpoks = allpoks.sort(function(first, second){
                if(first.stats[1].base_stat > second.stats[1].base_stat){
                    return order;
                };
                if(first.stats[1].base_stat < second.stats[1].base_stat){
                    return -order;
                }
            });
        break;
        case "shield":
            allpoks = allpoks.sort(function(first, second){
                if(first.stats[2].base_stat > second.stats[2].base_stat){
                    return order;
                };
                if(first.stats[2].base_stat < second.stats[2].base_stat){
                    return -order;
                }
            });
        break;
    }
    if(!order){
        allpoks.reverse;
    }
    allpoks.forEach((pokemon)=>{
        drawpok(pokemon);
    });

}