const express = require('express');
const app = express();
const mongoose = require('mongoose');
const BrandName=require('./model');

app.use(express.json())

mongoose.connect('mongodb+srv://bhavanipassionateart:passionateart@cluster0.fdnwfrk.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('DB connected...')
).catch(err =>console.log(err))


app.post('/addbrands',async (req,res) => {
    const {brandname} =req.body;
    try{
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find());

    }
    catch (err){
        console.log(err.message);
    }
})
app.get('/',(req,res)=>{
    res.send("Hello World!");
});

app.get('/getallbrands' ,async(req,res)=>{
try{
const allData = await BrandName.find();
return res.json(allData);
}
catch(err){
    console.log(err.message);
}
})

app.delete('/deletebrand/:id' ,async(req,res)=>{
    try{
    const Data = await BrandName.findByIdAndDelete(req.params.id);
    return res.json(await BrandName.find());
    }
    catch(err){
        console.log(err.message);
    }
    })

app.listen(3000,() => console.log('server is running...'));

