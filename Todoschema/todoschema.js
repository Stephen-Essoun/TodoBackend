import mongoose from 'mongoose'

const {Schema,model} = mongoose

const todoSchema = Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type :String,
        require:false
    },
    isCompleted:{
        type:Boolean,default:false
    },
    date:{
        type:Date,default:Date.now
    }
})
const todomodule = model("todo_schema",todoSchema)
export default todomodule