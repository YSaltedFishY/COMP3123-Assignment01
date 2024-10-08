const express = require("express");
const mongoose = require("mongoose")
const employeeModel = require("./models/Employee")
const userRouter = require("./routes/user")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('views'))

app.use('/user', userRouter)

mongoose.connect('mongodb://localhost:27017/Employee')
.then(()=> console.log('connect to MongoDB'))
.catch((err)=>console.error('Could not connect to MongoDB',err));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
})

app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));