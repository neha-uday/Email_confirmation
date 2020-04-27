const mongoose=require("mongoose");
mongoose.set('useCreateIndex', true);

    mongoose.connect('mongodb+srv://neha:neha2000@cluster0-9wr2n.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
               console.log("sucessfull connection  of database");}
    else{
            console.log("error emitted",err);
        } 
 });
