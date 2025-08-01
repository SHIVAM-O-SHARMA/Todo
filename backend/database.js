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

const Todo= mongoose.model('Todo',todoSchema);

module.exports= {
    Todo
}