const express =require ('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose')
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todoappmern",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log("Db connected succesfully")})
.catch(console.error);



const Todo=require('./model/Todo');


app.get('/todos',async (req,res)=>{
   const todos=await Todo.find();

   res.json(todos);
})

app.post('/todo/new',(req,res)=>{
    const todo=new Todo({
        text:req.body.text
    })
    todo.save();
    res.json(todo);
})

app.delete("/todo/delete/:id",async(req,res)=>{
    const result=await Todo.findByIdAndDelete(req.params.id);
    
    res.json(result);
    
    })


    app.get('/todo/complete/:id', async (req, res) => {
        try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            todo.complete = !todo.complete;
            await todo.save();
            res.json(todo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Listening on server  ${PORT}`)
})