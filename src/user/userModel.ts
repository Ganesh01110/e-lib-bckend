import mongoose from 'mongoose';
import {User} from "./userTypes";



const userSchema = new mongoose.Schema<User>({
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        unique:true,
        required:true
    }, 
    password:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

// it will create users model in db it can be override as [mongoose.model('User',userSchema,givenname)]
export default mongoose.model<User>('User',userSchema)