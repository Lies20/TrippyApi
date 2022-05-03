const express = require('express')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel')


app.listen(port,()=>{
    console.log('this port is '+" "+port)
})


const HotelSchema = new mongoose.Schema({
    name : String,
    address : String,
    city : String,
    country : String, 
    stars : Number,
    hasSpa: Boolean,
    hasPool : Boolean,
    priceCategory : Number,
})

const HotelModel = mongoose.model('hotel',HotelSchema);


const restaurantSchema = new mongoose.Schema({
    name : String,
    address : String,
    city : String,
    country : String,
    stars : Number,
    cuisine : String,
    priceCategory : Number,
})

const restaurantModel =  mongoose.model('restaurant',restaurantSchema)

// HotelModel.insertMany([{
//     name : "konoha",
//     address: "34 Bis rue paul eluard",
//     city : "Saint-Denis",
//     country : "France",
//     stars : 4,
//     hasPool: true,
//     hasSpa : true,
//     priceCategory :"3",

// },
// {
//     name : "Midgar",
//     address: "34 rue paul eluard",
//     city : "Stains",
//     country : "France",
//     stars : 2,
//     hasPool: false,
//     hasSpa : true,
//     priceCategory :1,
// },{

//     name : "Pino",
//     address: "4 Bis rue paul eluard",
//     city : "Lorient",
//     country : "France",
//     stars : 1,
//     hasPool: false,
//     hasSpa : false,
//     priceCategory :2,
// }
// ])

// restaurantModel.insertMany([{
//     name : "Chez Lies",
//     address : "3 rue de la victoire",
//     city : "Saint-Denis",
//     country : "Iraq",
//     stars : 3,
//     cuisine : "French",
//     priceCategory : 1,
// },
// {
//     name : "Chez pauline",
//     address : "3 rue de la defaite",
//     city : "poitier",
//     country : "france",
//     stars : 3,
//     cuisine : "Arabic",
//     priceCategory : 1,
// },
// {
//     name : "Chez Laura",
//     address : "4 rue de la chance ",
//     city : "pau",
//     country : "Iraq",
//     stars : 1,
//     cuisine : "Italian",
//     priceCategory : 3,

// }])

app.get('/hotels',function(req, res, next){
    HotelModel.find().then((result)=>{
        // console.log("console log d'hotel",result)
        res.json(result)
    })
})

app.get('/hotels/:id',function(req, res, next){
    const id = req.params.id
    console.log(id)
    HotelModel.find({id}).exec().then((hotel)=>{
        console.log("console log d'hotel dans la route get/Id", hotel)
        res.json(hotel)
    })
})

app.post('/hotels',function(req, res, netx){
    HotelModel.insertMany([{
            name : "ichiraku",
            address: "14 rue de la bagarre",
            city : "osaka",
            country : "Japan",
            stars : 4,
            hasPool: true,
            hasSpa : true,
            priceCategory :"3",
    }])
    res.status(201).json({
        message : "Hotel ajouté"
    })
})

app.put('/hotels/:id',function(req, res, next){
    const id = req.params.id
    const name = req.query.name
    console.log(req.body)
    HotelModel.updateOne({id},{$set :{name : "chez doudou"} })
})