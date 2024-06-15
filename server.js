const express= require("express");
const morgan= require("morgan");
const cors= require("cors");
const dotenv= require("dotenv");
const conndb=require('./config/conndb');
const useRoute= require('./routes/route')
const transRoute=require('./routes/transRoute')
dotenv.config()
conndb();
 const app=express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use('/api/users',useRoute)
  app.use('/api/transactions',transRoute)
  // app.get('/',(req,res)=>{
  //   res.send('Hello world');
  // })
  const PORT=5020 || process.env.PORT;
  app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
  })