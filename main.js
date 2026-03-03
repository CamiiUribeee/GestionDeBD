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
    res.send(a);0
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


//metodos update y delete: 

app.get("/update", async(redis,res) => {
    const edad=20;
    const data = await redis.get('info:03578');
    if(!data){
        return res.json({'sucess': false, 'data':[], 'msg':'Not found'}, 404)
    }
    let json = JSON.parse(data);
    //agrego la key:
    json.edad=edad;
    const response= await redis.set('info:03578', JSON.stringify(json), {EX:300});
    const r = await redis.get('info:03578');
    res.json({"sucess": response ==='OK', data:r, msg:response},200)
})


app.get('/hset', async(req,res)=>{
    const response = await redis.hSet('info:192214', {
        'name': 'camila',
        'lastname': 'uribe',
        'age':20
    });
    await redis.expire('info:192214', 300)
    res.send(response)
})

//borrar argumento por argumento 
app.get("/delete", async (req,res)=>{
    //const data = await redis.del('info:192214')
    const data = await redis.hDel('info:192214', 'age')
    const data2 = await redis.hSet('info:192214', 'company', 'ufpso')
    const response = await redis.hGetAll('info:192214');
    res.send(response)
})






app.get('/getHash', async(req,res)=>{
    const response = await redis.hGetAll('info:192214');
    const ttl = await redis.ttl('info:192214')
    res.json({sucess: true, data:response, ttl})
})

