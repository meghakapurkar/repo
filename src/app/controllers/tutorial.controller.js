const db = require("../model");
const Tutorial = db .tutorials;
const Op = db.Sequelize.Op;

 exports.create =(req , res) => {

 };
 exports.findAll =(req,res) => {

 };
 exports.findOne =( req,res) => {

 };
 exports.update = (req,res) =>{

 };
 exports.deleteAll = (req,res) => {

 };
 exports.findAllPublished =(req,res) =>{

 };
// Validate request
 exports.create = (req,res)=>{
   if(!req.body.title){
     res.status(400).send({
       message:"Content can not be empty!"
     });
     return;
   }

   //  Create tutorial
   const tutorial  = {
     title: req.body.title,
     descripion: req.body.descripion,
     published: req.body.published ? req.body.published :false
   };

   //save tutorial in the database
   Tutorial.create(tutorial)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
       err.message  || "some error ocurred while creating the Tutorial."
     });
   });
 };


 //...............................................................//
 //retrive all tutorials
 exports.findAll=(req,res) => {
   const title = req.query.title;
   var condition = title ? { title: {[Op.like]:`%${title}%`}}: null;

   Tutorial.findAll({where: condition})
   .then (data  => {
     res.send(data);

   })
   .catch(err =>{
     res.status(500).send({
       message:
       err.message||"some error occurred while  retriving tutorials."


     });
   });
 };

 //.............................................................//
 //find a single tutorials with an id

 exports.findOne = (req, res) => {
   const id =req.params.id;
   Tutorial.findByPk(id)
   .then(data =>{
     res.send(data);
   })
   .catch(err =>{
     res.status(500).send({
       message:"Error retriving Tutorial with id ="  +id
     });
   });
 };
 //............................................................//
 //update tutorial by id

 exports.update = (req,res) => {
   const id = req.params.id;
   Tutorial.update(req.body,{
     where: {id:id}
   })
   .then(num =>{
     if (num ==1){
       res.send({
         message:"Tutorial was updated successfully."
       });
     } else{
       res.send({
         message:`Cannot update tutorial with id=${id}.Maybe Tutorial was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Tutorial with id="+id
     });
   });
 };
 //................................................................//
 //Delete a tutorial with the specified id
 exports.delete = (req,res) => {
   const id =req.params.id;
   Tutorial.destroy({
     where:{id:id}
   })
   .then(num =>{
     if(num==1){
       res.send({
         message:"Tutorial was deleted successfully!"
       });
     }else{
       res.send({
         message:`Cannot delete Tutorial with id=${id}.Maybe Tutorial was not found!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message:"Could not delete Tutorial with id=" +id
     });
   });
 }
 //...........................................................................//
 //Delete All  tutorials from database
 exports.deleteAll = (req,res) =>{
   Tutorial.destroy({
     where:{},
     truncate: false
   })
   .then(nums =>{
     res.send({message:`${nums}Tutorialls were deleted successfully!`})
   })
   .catch(err =>{
     res.status(500).send({
       message:
       err.message || "Some error occurred while removing all tutorials."
     });
   });
 };
 //..............................................................................//
 //find all objects by conditon

 exports.findAllPublished = (req,res) => {
   Tutorial.findAll({where:{ published:true}})
   .then(data =>{
     res.send(data);

   })
   .catch(err =>{
     res.status(500).send({
       message:
       err.message|| "Some error occured while retrieving tutorials."
     });
   });
 };
