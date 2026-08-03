import "dotenv/config";
console.log(process.env.MONGO_URI);
console.log(process.env.PORT);
import express from "express";
import cnxMongoDB from "./database/cnxMongoDB.js";

cnxMongoDB();

const numerologia = express();

numerologia.use(express.json());

numerologia.listen(process.env.PORT, () => {
    console.log(`Servidor: http://localhost:${process.env.PORT}`);
});