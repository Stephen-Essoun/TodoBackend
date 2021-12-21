
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Todomodel from "./Todoschema/todoschema.js" 
import todomodule from "./Todoschema/todoschema.js"

// import { param } from "express/lib/request"
const app=express()

dotenv.config()
app.use(cors())


const port = process.env.PORT||8000
const url = process.env.DB_URL
app.use(express.json())

//Connection method to DataBase
mongoose.connect(url,{useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  ///if database is connected successful
  console.log("DataBase connected successfully")
}).catch((error)=>{
  //if an eror occurs
  console.log(error)
})




// //app.use(express.json) 
// app.get('/',(req,res)=>{
//   res.send("Welcome to my TODO API")
// })

// app.post('/create',(req,res)=>{
//   res.send({
//     message:"To day created successfully"
//   })
// })
// app.get('/users',(req,res)=>{
//   res.send({
//     name:"ana",
//     Age:34
//   })
 
// })
// // 

//  app.get('/followers',(req,res)=>{
//     res.send([
//       {Name:"Ann"},
//       {Name:"Judit"},
//       {Name:"Kessey"},
//       {Name:"Aisha"}
//     ])
//   })
// app.get('/about',(req,res)=>{
//   res.send("Long tym")

//   res.end()
// })
////////////home route
app.get("/",(req,res)=>{
  res.send("Welcome to PMC ToDo API")
})

///create a new todo into fdatabase
app.post("/createTodo",async(req,res)=>{
  const{title,description,isCompleted}=req.body
  const createTodo =await Todomodel.create({
    title,
    description,
    isCompleted
  })
  if(createTodo){
    return res.status(201).json({
      message:"Todo created successfully..."
    })
  }else{
    return res.status(204).json({
      message:"Failed to create a new Todo"
    })
  }
})



//Get all TODO routs
app.get("/todos",async(req,res)=>{
  const todo = await Todomodel.find({});
  if(todo){
    res.status(200).json({
      message:"Fetch all todos from database",
      data:todo
    })
  }else{
    res.status(400).json({
      message:"Failed to fetch todos from database"
    })
  }
})

//update:
app.patch("/updatetodos/:id",async(req,res)=>{
  const {id}=req.params
  const {isCompleted}=req.body
  const updateTodo = await Todomodel.updateOne({isCompleted:isCompleted}).where({_id:id})
 
 if(updateTodo){
   res.status(200).json({message:"Update successful",
 data:updateTodo

  })
 }else{res.status(400).json({mesage:"Couldn't update"})
 }})

 app.delete("/todo/:id",async(req,res)=>{
   const{id}=req.params;
   const deleteTodo = await Todomodel.findByIdAndDelete({_id:id})

   if (deleteTodo){
     res.status(200).json({
       message:"todo deleted",
       data:deleteTodo
     })
   }else{
     res.status(400).json({
       messages:"failed to delete"
     })
   }
 })



app.listen(port,()=>{
  console.log(`Todo server running at ${port}`)
});