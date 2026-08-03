import mongoose from "mongoose";

const cnxMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Conexión exitosa a la base de datos"))
        .catch((error) => console.log(error));
};

export default cnxMongoDB;