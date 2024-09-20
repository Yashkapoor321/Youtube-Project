const mongoose = require ("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true    
    },
    email : {
        type :String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullName : {
        type : true,
        required : true,
        trim : true,
        index : true 
    },
    avatar : {             // Cloudinary url
        type : String,
        required : true,
    },
    coverImage : {      // Cloudinary url
        type : String    
    },
    watchHistory : [  {
        type : Schema.Types.objectId,
        ref : "Video"
    }  ],
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String
    }
}, {timestamps : true})


userSchema.pre("save", async function (next) {
    // it prevents save password again and again 
    if(!this.isModified("password")){
        return next()
    }
    //hash Password
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// creating isPasswordCorrect hook with the help of methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName 
        },  
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id
        },  
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model("User", userSchema) 

module.exports =  User;