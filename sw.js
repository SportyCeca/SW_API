import express from "express";
const app = express();
const PORT = 3030;
app.use(express.json());

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