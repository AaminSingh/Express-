import 'dotenv/config'
import express from "express"
import logger from "./logger.js";
import morgan from "morgan";

const app = express()

const port = process.env.PORT || 3000

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {               //"Where should I send my logs?"
      write: (message) => {
        const logObject = {            
                                              //"POST /login 201 20ms"
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
// app.get("/",(req,res)=>{
//     res.send("Hello from Aamin and her tea!")
// })

// app.get("/ice-tea",()=>{
//     res.send("What kind of ice-tea you would prefer?")   
// })

// app.get("/twitter",(req,res)=>
//     res.send("AaminSinghdotcom is my twitter handle, follow me there!")
//})

app.use(express.json())

let teaData = []
let nextId = 1


//add a new tea
app.post('/teas',(req,res)=>{
    logger.info("A post request has been made to add a new tea.")

    const {name,price} = req.body
    const newTea = {id:nextId++,name,price}
    teaData.push(newTea)
    res
      .status(201)
      .send(newTea)
})

//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})


//get a tea with id 
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})


//update tea 
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id))

    if(!tea){
        return res
           .status(404)
           .send("Tea not found")     
    }
    const{name,price} = req.body
    tea.name = name 
    tea.price = price
    res.status(200).send(tea)
})

//delete tea
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if(index == -1){
        return res.status(404).send("tea not found")
    }
    teaData.splice(index,1)
    return res.status(204).send('deleted')
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}...😊`)
})