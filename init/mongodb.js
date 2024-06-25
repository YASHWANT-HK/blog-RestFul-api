const mongoose = require("mongoose");
const { connectionUrl } = require("../config/kyes");

const connectMongodb = async() => {
    try{
        // await mongoose.connect("mongodb+srv://BitsGateIntern2024:ModelExchange2024@modelexchange-cluster.hmlwcyd.mongodb.net/?retryWrites=true&w=majority&appName=ModelExchange-cluster");
        await mongoose.connect(connectionUrl);
        console.log("Database connection successful");
    }catch(error){
        console.log(error);
    }
};

module.exports = connectMongodb;