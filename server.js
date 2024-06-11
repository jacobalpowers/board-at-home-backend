const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//Mongoose to connnect to MongoDB
mongoose
    .connect("mongodb+srv://japowers:RUD1IMizJvcIr6Q4@data.wtiy9yq.mongodb.net/")
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("Could not connect to mongodb...", err));

const gameSchema = new mongoose.Schema({
    title: String,
    rank: Number,
    releaseDate: Number,
    price: Number,
    image: String,
});

const Game = mongoose.model("Game", gameSchema);


//Return total database of games
const getGames = async (res) => {
    const games = await Game.find();
    res.send(games);
}

//Image Handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });


//Get Base Website
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


//Get all games
app.get("/api/games", (req, res) => {
    getGames(res);
});

//Get a specific game
app.get("/api/games/:id", async (req, res) => {
    //res.send(games.find((g) => g._id === parseInt(req.params.id)));
    const game = await Game.findOne({_id: id });
    res.send(game);
});

//Add a new game to the database
app.post("/api/games", upload.single("image"), async (req, res) => {
    const result = validateInput(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const game = new Game({
        title: req.body.title,
        rank: req.body.rank,
        releaseDate: req.body.releaseDate,
        price: req.body.price,
    });

    if (req.file) {
        game.image = req.file.filename;
    }

    const newGame = await game.save();
    res.send(newGame);
});

//Edit game
app.put("/api/games/:id", upload.single("image"), (req, res) => {
    let game = games.find((g) => g._id === parseInt(req.params.id));
    if (!game) res.status(400).send("Game with given id was not found");

    const result = validateInput(req.body);
    

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    game.title = req.body.title;
    game.releaseDate = req.body.releaseDate;
    game.rank = req.body.rank;
    game.price = req.body.price;

    if (req.file) {
    game.image = req.file.filename;
    }

    res.send(game);
});

app.delete("/api/games/:id", async (req, res) => {
    const game = await Game.findByIdAndDelete(req.params.id);
    res.send(game);
});


app.listen(3001, () => {
    console.log("I'm Listening");
});


const validateInput = (game) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        releaseDate: Joi.number().min(1000).required(),
        rank: Joi.number().required(),
        price: Joi.number().required()
    });
    return schema.validate(game);
}