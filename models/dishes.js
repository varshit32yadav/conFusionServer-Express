//constructuing Schema and the corresponding model .
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;  //we will use this in defining schema as currency is needed to tell dishes price

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'        //reference is made to User schema model to retrieve the user name
    }
}, {
    timestamps: true
});




const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
}, {
    timestamps: true    //mongoose will automatically add 2 timestamps i.e. created timestamp and updated timestamp.
});


var Dishes = mongoose.model('Dish', dishSchema); //plural of Dishes is automatically handled by mongoose

module.exports = Dishes;
