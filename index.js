const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Game = require('./models/game');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/game', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>{
    console.log("Connected");
})
.catch(err => {
    console.log("Error: " + err);
});


app.use(express.static(__dirname + '/public'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', async (req, res) => {
    const gameData = await Game.find({})
    .then(data => {
        if(data){
            res.render('home.ejs', { data });
        } else {
            console.log("Empty data, oops!");
        }
    })
    .catch(err => {
        console.log("This went wrong: " + err);
    });
});

app.get('/game/add', (req, res) => {
    res.render('addpost.ejs');
});


app.put('/game/edit', async (req, res) => {    
    
    const newData = req.body;

    const currentGame = await Game.findOne({ _id: req.body.gameID });
    currentGame.title = newData.gTitle;
    currentGame.score = newData.gScore;
    currentGame.year = newData.gYear;
    currentGame.rating = newData.gRating;
    currentGame.summary = newData.gSummary;
    currentGame.image = newData.gImage;
    

    const test = await Game.replaceOne( { _id: req.body.gameID}, currentGame)
    .catch(err => {
        console.log("Problems in paradise!" + err);
    });
    res.redirect('/');
});

app.get('/game/edit/:id', async (req, res) => {
    const { id } = req.params;
    const currentGame = await Game.findOne({ _id: id });
    res.render('editpost.ejs', {data: currentGame});
});

app.put('/game/deletecomment', async (req, res) => {
    const gameData = await Game.findOne({_id: req.body.gameID });
 
    gameData.comments.splice(req.body.commentID, 1);

    gameData.save();
    res.render('gamedetails.ejs', {data: gameData});
});

app.get('/game/:id', async (req, res) => {
    const { id } = req.params;
    let gameTitle = id;
    const gameData = await Game.findOne({ _id: gameTitle })
    .then(data => {
        if(data){
            res.render('gamedetails.ejs', { data });
        } else {
            console.log("Empty data, redirecting home!");
            res.render('home.ejs', {});
        }
    })
    .catch(err => {
        console.log("This went wrong: " + err);
    });
});

app.put('/game/:id', async (req, res) => {
    const { id } = req.params;
    let gameTitle = id;
    const gameData = await Game.findOne({ _id: gameTitle });

    gameData.comments.push(req.body.user);
    gameData.comments[gameData.comments.length-1].push(req.body.comment);

    gameData.save();
    res.render('gamedetails.ejs', {data: gameData} );
});

app.put('/game/', async (req, res) => {
    const newData = req.body;

    const newGame = new Game();
    newGame.title = newData.gTitle;
    newGame.score = newData.gScore;
    newGame.year = newData.gYear;
    newGame.rating = newData.gRating;
    newGame.summary = newData.gSummary;
    newGame.image = newData.gImage;
    newGame.save();
});

app.listen(8080, () => {

});