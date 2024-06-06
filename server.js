const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


let games = [
    {
        "title": "Brass: Birmingham",
        "releaseDate": 2018,
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
        "releaseDate": 2015,
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
        "releaseDate": 2017,
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
        "releaseDate": 2021,
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
        "releaseDate": 2017,
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


app.get("/api/games", (req, res) => {
    res.send(games);
});

app.post("/api/games", upload.single("img"), (req, res) => {
    const result = validateInput(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    console.log("valid");
});



app.listen(3001, () => {
    console.log("I'm Listening");
});


const validateInput = (game) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        "releaseDate": Joi.number().min(4).max(4).required(),
        rank: Joi.number().required(),
        price: Joi.number().required()
    });
    return schema.validate(game);
}