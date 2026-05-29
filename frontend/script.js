const cardsContainer = document.getElementById("cardsContainer");
const searchgmb = document.getElementById("searchgomb");
const input = document.getElementById("searchin");
const API_URL = "http://localhost:3030/characters";

async function loadCharacters(){
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("Hiba a karakterek betöltésekor");
        }
        const data = await response.json();
        displayCharacters(data);
    }catch(error){
        console.error(error);
        cardsContainer.innerHTML = "<h2>Hiba a karakterek betöltésekor</h2>";
    }
}
function displayCharacters(characters){
    cardsContainer.innerHTML = "";
    characters.forEach(character => {
        cardsContainer.innerHTML += `
            <div class="card">
                <img src="bckgrnd.jpg">
                <div class="card-content">
                    <h2>${character.name}</h2>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Birth Year:</strong> ${character.birthYear}</p>
                    <p><strong>Height:</strong> ${character.height}</p>
                    <p><strong>Hair Color:</strong> ${character.hairColor}</p>
                    <p><strong>Eye Color:</strong> ${character.eyeColor}</p>
                </div>
            </div>
        `;
    });
}

async function searchCharacter(){
    const name = input.value.trim();
    // if(name === ""){
    //     loadCharacters();
    //     return;
    // }
    try{
const response = await fetch(`http://localhost:3030/search?name=${name}`);
        if(!response.ok){
            cardsContainer.innerHTML = "<h2>Karakter nem található</h2>";
            return;
        }
        const data = await response.json();
        displayCharacters(data);

    }catch(error){
        console.error(error);
        cardsContainer.innerHTML = "<h2>Szerver hiba</h2>";
    }
}
searchgmb.addEventListener("click", searchCharacter);
loadCharacters();