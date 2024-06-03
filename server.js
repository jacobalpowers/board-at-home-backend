const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let games = [
    {
        "title": "Brass: Birmingham",
        "release-date": 2018,
        "rank": 1,
        "price": 79.99,
        "image": "brassBirmingham.jpg",
        "playtime": "60-120 Min",
        "avgRating": 8.6,
        "numPlayers": "2-4",
        "age": 14,
        "website": "https://roxley.com/products/brass-birmingham-deluxe-edition",
        "designer": "Gavan Brown, Matt Tolman, Martin Wallace",
        "artists": "Gavan Brown, Lina Cossette, David Forest, Damien Mammoliti, Matt Tolman"
    },{
        "title": "Pandemic Legacy: Season 1",
        "release-date": 2015,
        "rank": 2,
        "price": 89.99,
        "image": "pandemicLegacy.webp",
        "playtime": "60 Min",
        "avgRating": 8.5,
        "numPlayers": "2-4",
        "age": 13,
        "website": "https://www.zmangames.com/en/products/pandemic-legacy-season-1/",
        "designer": "Rob Daviau, Matt Leacock",
        "artists": "Chris Quilliams"
    },{
        "title": "Gloomhaven",
        "release-date": 2017,
        "rank": 3,
        "price": 159.99,
        "image": "gloomhaven.webp",
        "playtime": "60-120 Min",
        "avgRating": 8.6,
        "numPlayers": "1-4",
        "age": 14,
        "website": "https://cephalofair.com/products/gloomhaven",
        "designer": "Isaac Childres",
        "artists": "Alexandr Elichev, Josh T. McDowell, Alvaro Nebot"
    },
    {
        "title": "Ark Nova",
        "release-date": 2021,
        "rank": 4,
        "price": 74.99,
        "image": "arkNova.webp",
        "playtime": "90-150 Min",
        "avgRating": 8.5,
        "numPlayers": "1-4",
        "age": 14,
        "website": "https://capstone-games.com/board-games/ark-nova/",
        "designer": "Mathias Wigge",
        "artists": "Steffen Bieker, Loïc Billiau, Dennis Lohausen, Christof Tisch"
    },
    {
        "title": "Twilight Imperium: Fourth Edition",
        "release-date": 2017,
        "rank": 5,
        "price": 164.99,
        "image": "twilightImperium.webp",
        "playtime": "90-150 Min",
        "avgRating": 8.5,
        "numPlayers": "1-4",
        "age": 14,
        "website": "https://capstone-games.com/board-games/ark-nova/",
        "designer": "Dane Beltrami, Corey Konieczka, Christian T. Petersen",
        "artists": "Scott Schomburg"
    }
];


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/games", (req, res) => {
    res.send(games);
});

app.listen(3001, () => {
    console.log("I'm Listening");
});