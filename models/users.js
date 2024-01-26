const mongoose = require('mongoose');


// Créez une collection users qui sera par la suite chargée d’enregistrer les informations suivantes pour chaque utilisateur : name, email et password (String).

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
});

const Users = mongoose.model('Users', userSchema )
module.exports = Users