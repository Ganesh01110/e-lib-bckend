 import mongoose from 'mongoose';
 import {config} from './config'


 const connectdb= async () =>{
     try{

        mongoose.connection.on('connected',()=>{
            console.log("datbase connected successfully");
        })

        mongoose.connection.on('error',(error)=>{
            console.log("error connecting to database",error);
        })

        await mongoose.connect(config.databaseurl as string);

     }catch(error){
           console.error(`failed to connect database `,error);
           process.exit(1);
     }

    
 }

 export default  connectdb;


