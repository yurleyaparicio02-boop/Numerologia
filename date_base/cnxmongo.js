import mongoose from"mongoose";
const cnxMongoDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/astrologia")
    .then(()=> console.log("conexion exitosa a la base de datos"));
};

export default cnxMongoDB;