import mongoose, { Schema } from "mongoose";
const userSchema=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password: { type: String, minLength: 6, required: true },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(v)
            {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
            }
        }
    },
    image:{
        type:Buffer,
        data:Buffer,
        contentType:String
    },
    confirmed:{
           defaultValue:false,
          type:Boolean
    },
    agreed:String,
    hiring:String,
    work:String,
    inspiration:String,
    location:String,
    token:String
})

const User=mongoose.model('users',userSchema)
export default User