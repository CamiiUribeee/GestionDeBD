import { Router } from "express"; //acá solo estoy importando un modúlo

const router = Router();

router.get("/apuesta", (req, res)=>{
    res.send("Hola apuesta");

})

export default router; 