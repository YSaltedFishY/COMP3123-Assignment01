const express = require("express");
const mongoose = require("mongoose")
const employeeModel = require("./models/Employee")
const userRouter = require("./routes/user")
const empRouter = require("./routes/employee")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('views'))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', empRouter);

mongoose.connect('mongodb+srv://Admin:pDiGDgich3CcFvBw@cluster0.2tyy8.mongodb.net/Assignment01?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('connect to MongoDB'))
.catch((err)=>console.error('Could not connect to MongoDB',err));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
})

app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));