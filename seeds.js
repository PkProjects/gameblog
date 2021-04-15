
const mongoose = require('mongoose');

const Game = require('./models/game');

mongoose.connect('mongodb://localhost:27017/game', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>{
    console.log("Connected");
})
.catch(err => {
    console.log("Error: " + err);
});

Game.insertMany([
    {title: 'Fortnite', year:2016, score: 3.0, rating: "PG-13", image: "https://cdn2.unrealengine.com/battle-pass-chapter-2-season-6-1920x1080-dc8eb73dc494.jpg", comments: [["peter", "omg so cool"], ["bobby", "I know right"], ["420swag69noscoper", "totally"] ] ,
    summary:"Shooty buildy survival battle royale game"},
    {title: 'WoW', year:2002, score: 7.6, rating: "R", image: "https://upload.wikimedia.org/wikipedia/en/9/91/WoW_Box_Art1.jpg", comments:  [],
    summary:"The original mmo according to people who don't know everquest or ultima online"},
    {title: 'Divinity: Original Sin 2', year:2008, score: 8.2, rating: "PG", image: "https://cdn.akamai.steamstatic.com/steam/apps/435150/capsule_616x353.jpg?t=1607718127", comments:  [],
    summary:"CRPG taking the genre to new heights"},
    {title: 'Civilisation 6', year:2012, score: 6.5, rating: "PG", image: "https://upload.wikimedia.org/wikipedia/en/3/3b/Civilization_VI_cover_art.jpg", comments:  [],
    summary:"It's like age of empires, but turn based and on a map of hexagons "},
    {title: 'Farmville', year:2010, score: 9.9, rating: "R", image: "https://cdn.vox-cdn.com/thumbor/Q8BXCKDV7Elwz8AlVBI6KX5IR4g=/0x0:1870x818/1400x933/filters:focal(786x260:1084x558):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/67480796/farmville.0.jpg", comments: [] ,
    summary:"Your parents probably played this on facebook, and you did too!"},
])
.then( data => {
    console.log("Succes!: " + data);
})
.catch(err => {
    console.log("Nope! : " + err);
})