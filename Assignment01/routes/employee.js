const express = require('express');
const router = express.Router();
const path = require('path');
const { Employee, User } = require('../models/Employee');

router.get('/', (req,res)=>{
    res.send('<h>Employee home page</h>');
});

router.get('/employees', async (req,res)=>{
    const employees = await Employee.find({},
         "firstname lastname email position salary date_of_joining department created_at updated_at");
    try{
        res.send(employees)
    }catch(err){
        console.log("Error: " + err)
        res.status(500).send(err)
    }
});

router.post('/employees', async (req,res) =>{
    const {firstname, lastname, email, position, salary, department, date_of_joining} = req.body;

    try{
        let dupEmail = await Employee.findOne({email});
        if(dupEmail){
            return res.status(400).json({message: 'Email has been taken'});
        }

        const newEmployee = new Employee({
            firstname, lastname, email, position, salary, department, date_of_joining, 
            created_at: new Date(), 
            updated_at: new Date()
        });
        await newEmployee.save();

        res.json({message: "Employee created successfully.",
            "employee_id": newEmployee._id
        })

    }catch(e){
        console.error(e);
        res.status(500).json({error: 'Fail to add new employee'})
    }

});

router.get('/employees/:eid', async (req,res)=>{
    const emp_id = req.params.eid;

    try{
        const employee = await Employee.findById(emp_id);
        if(!employee){
            return res.status(404).json({message: 'Employee not found'});
        }

        res.status(200).json(employee);
    }catch(e){
        console.error("Error finding employee: ", e);
        res.status(500).json({
            message: "Find Employee ERROR",
            error: e.message
        });
    }

});

router.put('employees/:eid', async (req,res)=>{
    const emp_id = req.params.eid;
    const emp_update = req.body;
    try{
        const infoUpdate = await Employee.findByIdAndUpdate(
            emp_id,
            {$set: emp_update},
            {new: true, runValidators: true}
        );

        if(!infoUpdate){
            return res.status(404).json({message: 'Employee not found'});
        }

        res.status(200).json({
            message: `Employee ID ${emp_id} has been updated!`,
            infoUpdate
        });
    }catch(e){
        console.error("Employee update error:",e);
        res.status(500).json({ message: "Employee update error: ", error: e.message });
    }

});

router.delete('/employees/:eid', async (req,res)=>{
    const emp_id = req.params.eid;

    try{
        emp_delete = await Employee.findByIdAndDelete(emp_id);
        if(!emp_delete){
            return res.status(404).json({message: 'Employee not found'});
        }
        
        res.status(200).json({message: `Employee has been deleted`,
            emp_delete
        });
    }catch(e){
        console.error("Delete employee error:",e);
        res.status(500).json({ message: "Delete employee error", error: e.message });
    }
});

module.exports = router;