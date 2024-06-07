import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Coneccion MongoDB 👍");
    } catch (error) {
        console.log("Error conectando a MongoDB", error.message);
    }
}

export default connectToMongoDB;