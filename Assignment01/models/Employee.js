let mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
})

const EmployeeSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    position: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    Salary: Number,
    date_of_joining: Date,
    department:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    created_at: Date,
    updated_at: Date

})

const User = mongoose.model("users",UserSchema)
const Employee = mongoose.model("employees",EmployeeSchema)

module.exports = {User, Employee}