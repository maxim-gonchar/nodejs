const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const db = 'mongodb+srv://maksymh:Sn2bpNBR2hi9guJR@maksymcluster.wkkagec.mongodb.net/?retryWrites=true&w=majority&appName=MaksymCluster'

const authRouter = require('./routes/auth')
const tasksRouter = require('./routes/tasks')

app.use(express.json())
app.use(authRouter)
app.use(tasksRouter)

const start = async()=>{
    try{
        await mongoose.connect(db)
        app.listen(PORT,()=> console.log(`Listening port ${PORT}`))
    } catch(e){
        console.log(e)
    }

}

start()