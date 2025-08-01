require('dotenv').config();
const express= require ('express');
const {Todo}= require ('./database');

const app=express();
app.use(express.json());
const PORT= process.env.PORT || 3000 ;

// API endpoints

app.get('/',function(req,res){
res.send('Welcome to To-do list API!');
});

app.post('/todos',async(req,res)=>{
  try {
    const newTodo= new Todo({
    title: req.body.title,
    completed: req.body.completed || false
  })
  const savedTodo= await newTodo.save();
  res.status(200).json({msg:'✅todo saved',savedTodo});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
})

app.get('/todos',async(req,res)=> {
  try {
  const todos= await Todo.find({});
  res.status(200).json(todos);
  } catch (error) {
   res.status(500).json({msg: error.message});
  }
})

app.put('/todos/:id',async(req,res)=>{
try {
  const {id}= req.params;
  const {title,completed}= req.body;
  const updatedTodo= await Todo.findByIdAndUpdate(id,{title,completed},{new:true, runValidators: true});
  if(!updatedTodo){
  return res.status(404).json({msg:'❌todo not found!'})};
  res.status(200).json({msg:'✅todo updated!',updatedTodo});
} catch (error) {
  res.status(500).json({msg:error.message});
}
})

app.delete('/todos/:id',async(req,res)=>{
  try {
  const {id}= req.params;
  const deletedTodo= await Todo.findByIdAndDelete(id);
  if(!deletedTodo){
    return res.status(404).json({msg:'❌todo not found!'})
  };
  res.status(200).json({msg:'✅todo deleted!',deletedTodo});
  } catch (error) {
    res.status(500).json({msg:error.message});
  }
})

app.listen(PORT, () => {
console.log(`🚀Server running on port ${PORT}`)
});