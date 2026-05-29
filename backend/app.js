import express from "express";
import cors from "cors";
const app = express();
const PORT = 3030;
app.use(express.json());
app.use(cors());

const api_url = "https://swapi.info/api/people";
app.get("/characters", async (req, res) => {
    try {
        const response = await fetch(api_url);
        if (!response.ok){
            return res.status(500).json({
                message: "Fetch hiba."
            });
        }

        const data = await response.json();
        
        const characters = data.map((character, index) => ({
            id: index + 1,
            name: character.name,
            gender: character.gender,
            birthYear: character.birth_year,
            height: character.height,
            hairColor: character.hair_color,
            eyeColor: character.eye_color,
            skinColor: character.skin_color,
            image: "/assets/bckgrnd.jpg"
        }));
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({
            message: "Szerver hiba."
        });
    }
});

app.get("/characters/:id", async (req, res) => {

    try {
        const id = +req.params.id;
        const response = await fetch(api_url);
        const data = await response.json();
        const character = data[id - 1];
        if (!character) {
            return res.status(404).json({
                message: "Sajnálom, de úgy tűnik, a keresett karakter nem létezik. Talán az archívum hiányos."
            });
        }
        const result = {
            id: id,
            name: character.name,
            gender: character.gender,
            birthYear: character.birth_year,
            height: character.height,
            hairColor: character.hair_color,
            eyeColor: character.eye_color,
            skinColor: character.skin_color,
            image: "/assets/bckgrnd.jpg"
        };
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Szerver hiba."
        });
    }
});

app.get("/search", async (req, res) => {
    try {
        const name = req.query.name;
        const response = await fetch(api_url);
        const data = await response.json();
        const characters = data
            .map((character, index) => ({
                id: index + 1,
                name: character.name,
                gender: character.gender,
                birthYear: character.birth_year,
                height: character.height,
                hairColor: character.hair_color,
                eyeColor: character.eye_color,
                skinColor: character.skin_color,
                image: "/assets/bckgrnd.jpg"
            }))
            .filter(character =>
                character.name.toLowerCase().includes(name.toLowerCase())
            );
        if (characters.length === 0) {
            return res.status(404).json({
                message: "Nincs találat."
            });
        }
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({
            message: "Szerver hiba."
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});