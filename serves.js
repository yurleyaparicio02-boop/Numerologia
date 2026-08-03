import 'dotenv/config';
import express from "express";
import cnxMongoDB from "./date_base/cnxmongo.js";

cnxMongoDB();

const numerologia= express();
numerologia.use(express.json()); 

numerologia.listen(process.env.PORT, () => {
    console.log(`Servidor: http://localhost:${process.env.PORT}`);
});
