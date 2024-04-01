const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json())

let todos=[]

function findIndex(arr, id){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id===id){
            return i
        }
    }
    return -1;
}

function removeAtIndex(arr, index){
    let newArray = []
    for(let i=0;i<arr.length;i++){
        if(i!==index){
            newArray.push(arr[i])
        }
    }
    return newArray
}

app.get('/todos',(req,res) =>{
    res.json(todos)
})

app.post('/todos', (req,res)=>{
    const newTodo = {
        id: Math.floor(Math.random()*100000),
        title: req.body.title,
        description: req.body.description
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

app.delete('/todos/:id', (req,res)=>{
    const ind = findIndex(todos, parseInt(req.params.id))
    if(ind === -1){
        res.status(404).send();
    }
    else{
        todos = removeAtIndex(todos, ind);
        res.status(200).send()
    }
})

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use((req,res,next)=>{
    res.status(404).send()
});



app.listen(3000)