import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        index:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password:{
        type: String,
        required: [true, "Password is required"]
    },

    fullName:{
        type:String,
        required: true,
        index:true,
        trim:true
    },

    phoneNumber:{
        type: Number,
        unique: true,
        minlength: 10,
        maxlength: 15
    },
    verificationToken:{
        type: String,
        default: ''
    },
    refreshToken:{
        type: String,
        default: ''
    },
    emailVerified:{
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateVerificationToken = function(){
    return jwt.sign(
        {
            email:this.email
        },
        process.env.VERIFICATION_TOKEN_SECRET,
        {
            expiresIn:process.env.VERIFICATION_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
)
}

export const User = mongoose.model('User', userSchema);

