require('dotenv').config();
const express= require ('express');
const {Todo,User}= require ('./database');
const {authMiddleware}= require ('./authmiddleware/user')
const morgan= require('morgan');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');

const app=express();
app.use(express.json());
app.use(morgan('dev'));
const PORT= process.env.PORT || 3000 ;

// API endpoints

app.post('/auth/signup',async(req,res)=>{
try {
 const {email,password}=req.body;

 const existingUser= await User.findOne({email});
 if(existingUser){return res.status(400).json({msg:'user already exist!'})};

 const salt= await bcrypt.genSalt(10);
 const hashedPass= await bcrypt.hash(password,salt);

 const newUser= new User({email,password: hashedPass});
 await newUser.save();
 res.status(201).json({msg:'✅User created successfully!'});
} catch (error) {
  res.status(500).json({msg:'bad request!',error: error.message});
}
});

app.post('/auth/signin',async(req,res) => {
try {
  const {email,password}= req.body;
  const user= await User.findOne({ email });
  if(!user){return res.status(400).json({msg:'❌user does not exist'})};

  const isMatch= await bcrypt.compare(password, user.password);
  if(!isMatch){return res.status(400).json({msg:'invalid credentials'})};
  
  const payload= { userId: user._id, email: user.email };
  const token= jwt.sign(
  payload,
  process.env.JWT_USER_PASS,
  { expiresIn: '1d'}
  );
  
  res.status(200).json({msg:'✅signed in!',token,userId: user._id});
} catch (error) {
  res.status(500).json({msg:'❌something went wrong', error: error.message});
}
})

app.get('/',function(req,res){
res.send('Welcome to To-do list API!');
});

app.post('/todos',authMiddleware,async(req,res)=>{
  try {
  const newTodo = new Todo({
  title: req.body.title,
  completed: req.body.completed || false,
  userId: req.user.userId   // ⬅ from the token
});
  const savedTodo= await newTodo.save();
  res.status(200).json({msg:'✅todo saved',savedTodo});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
})

app.get('/todos',authMiddleware,async(req,res)=> {
  try {
  const todos= await Todo.find({userId: req.user.userId});
  res.status(200).json(todos);
  } catch (error) {
   res.status(500).json({msg: error.message});
  }
})

app.put('/todos/:id',authMiddleware,async(req,res)=>{
try {
  const {id}= req.params;
  const {title,completed}= req.body;
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    { title, completed },
    { new: true, runValidators: true }
  );
  if(!updatedTodo){
  return res.status(404).json({msg:'❌todo not found!'})};
  res.status(200).json({msg:'✅todo updated!',updatedTodo});
} catch (error) {
  res.status(500).json({msg:error.message});
}
})

app.delete('/todos/:id',authMiddleware,async(req,res)=>{
  try {
  const {id}= req.params;
  const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user.userId });
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