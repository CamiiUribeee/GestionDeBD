import express from "express"
import {createClient} from "redis"
const app = express();
const redis = createClient({url:'redis://localhost:6379'});
redis.connect();
app.get("/save" , async (req,res)=>{
    const json={
        "nombre": "camila",
        "apellido":"uribe"
    }
let a = await redis.set( 'info:03578',
JSON.stringify(json),
 {
EX:120
 }
 )
res.send(a);
})
app.listen(3001,()=>{
console.log("hola")
 })


 app.get("/get", async (req,res)=>{
    const data=await redis.get('info:03578');
    console.log(data);
    const json = JSON.parse(data);
    console.log(json);
    res.send(json);
 })   
