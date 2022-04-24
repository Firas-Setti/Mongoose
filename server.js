const express = require('express');
const connectDB = require('./DB/connectDB')
const persons = require('./model/clientModel'); 
const app = express();
connectDB();
const port = process.env.PORT || 5000;
const findPerson = ()=>{
    const Person = new persons({name:'Eya',age:26,favouriteFood:["Samgyetang"]})
    Person.save(function(err){
        if(err) return console.log(err);
    }) 
}
//  Using findPerson();
const findNew = ()=>{
   persons.create({name:'Firas',age:28,favouriteFood:["Djerbian Rice","Udon","Tempura","Yakitori","Takoyaki"]},{name:'Manel',age:25,favouriteFood:["Baguette Farcie","Ramen","Onigiri"]},{name:'Hadhemy',age:26,favouriteFood:["Curry Rice","Okonomiyaki", "Burritos"]},{name:'Ghassen',age:27,favouriteFood:["Spaghetti","Black Sauce","Ramen","Pizza","Takoyaki"]})
}
//  Using findNew();
const findPr = () => {
   persons.findOne({name:'Hadhemy'},(err,data)=>{err?console.log(err):console.log(data)})
}
//  Using findPr();
const findOne=()=>{
    persons.findOne({favoriteFood:['Tempura']},(err,data)=>{err?console.log(err):console.log(data)})
}
// Using findOne()
const findId=()=>{
    persons.findById("61cb483c036223e01b1f38ed",(err,data)=>{err?console.log(err):console.log(data)})
}
// Using findId();
const findEditSave=async()=>{
    const pr=await persons.findById("61cb483c036223e01b1f38ed").exec()
   await  pr.favouriteFood.push('Kimchi')
   await pr.save()
   }
// Using findEditSave();
const findOneAndUpdate = ()=>{
    persons.findOneAndUpdate({name:'Hadhemy'},{age:20},(err,data)=>{err?console.log(err):console.log(data)})
}
// Using findOneAndUpdate();
const findByIdAndRemove = ()=>{
    persons.findByIdAndRemove("61cb4563fc35b8955bdc340f",(err,data)=>{err?console.log(err):console.log(data)})
}
// Using findByIdAndRemove();
const removePerson = ()=>{
    persons.remove({name:"Eya"},(err,data)=>{err?console.log(err):console.log(data)})
}
// Using removePerson();
const ChainQuery=()=>{
    persons.find({favoriteFood:["Burritos"]})
    .sort({name:1 })
    .limit(2)
    .select("-age")
    .exec((err,data)=>{err?console.log(err):console.log(data)})
}
// Using ChainQuery()
app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`This server is running on port number ${port}`);
})