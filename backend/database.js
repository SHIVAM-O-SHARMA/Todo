const mongoose=require ('mongoose');

mongoose.connect(process.env.MongoURL)
.then(()=> console.log('✅connected to database1'))
.catch(err=> console.error('❌ not able to connect to db!',err));

const todoSchema= new mongoose.Schema({
  title:{
  type:String,
  required: [true,'A title must be given!'],
  trim: true,
  minLength: 1     
  },
  completed: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
});

const userSchema= new mongoose.Schema({
  email:{
    type:String,
    required: [true,'e-mail required'],
    lowercase: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, '❌is invalid!']
  },
  password: {
    type: String,
    required: [true,'passkey is needed'],
    trim: true,
    minLength: [4,'Password must be 4 characters long!']
  }
},{
  timestamps: true
});

const Todo= mongoose.model('Todo',todoSchema);
const User= mongoose.model('User',userSchema);

module.exports= {
    Todo,
    User
}