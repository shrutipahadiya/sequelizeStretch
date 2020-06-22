const db = require('./dbConfig');
const Sequelize = require('sequelize');

//YOUR CODE GOES HERE

const Receipe = db.define('Receipe',{
    name:{
        type:Sequelize.STRING,
        defaultValue:'cereal',
        validate: {
            notEmpty: true,
          }
    },
    cooktime:{
        min:1,
        max:60,
    },
    vegan:{
        type:Sequelize.BOOLEAN,
    },
    foodgroup:{
        type:Sequelize.ENUM,
        values:['vegetable','meat','dairy','grain','fruit','coffee'],
    }
});


Receipe.create = Receipe.create

//--------------------
module.exports = Recipe;
