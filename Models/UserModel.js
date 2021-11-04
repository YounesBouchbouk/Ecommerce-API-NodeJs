const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    FullName : {
        type : String ,
        require : [true , "User Must Have Full Name "]
    },
    Email : {
        type : String,
        unique : true ,
        lowercase : true,
        validate : [validator.isEmail    , 'Please insert a valid Email adress ' ]
    },
    photo  : {
        type : String , 
        require : [true , 'Please set your image']
    },
    Password : {
        type : String,
        require : [true , 'Password must be valid and greater then 8 caractere'],
        minlength : 8 ,
        select : false
    },
    ConfirmPassword : {
        type : String,
        require : [true , 'Please Set The password Confirm '],
        validate : {
            validator : function(el) {return el == this.Password}
        }

    },
    role : {
        type:String ,
        enum : ["admin" , "user"],
        default : "user"
    },
    CreatedAt : {
        type : Date,
        default : Date.now()
    },
    isPAsswordChanged  :{ type : Date ,default : Date.now() , select : true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }



},{
    toJSON : {virtual : true},
    toObject : {virtual:true}
})


userSchema.pre('save' , async function(next){
    //if password was not changed we ignore  
     if(!this.isModified('Password')) return next()
    try {
        //start crypting the password
        this.Password = await bcrypt.hash(this.Password , 12) 
        //delete the passwordConfirm field
        this.ConfirmPassword = undefined
    } catch (error) {
        console.log(error);
    }
    next()
})

userSchema.pre('save', function(next) {
    if (!this.isModified('Password') || this.isNew) return next();
  
    this.isPAsswordChanged = Date.now() - 1000;
    next();
  });


userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });


userSchema.methods.comparepasswords = async (currentpassword , password) =>{
    console.log(currentpassword , password);
    
    const check = await bcrypt.compare(password,currentpassword)
    
    console.log(check);

    return check

}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  
    return resetToken;
  };


userSchema.methods.isPasshasChanged = function(decodeait){ 

    const changetTime = parseInt(this.isPAsswordChanged.getTime(), 10) / 1000
    if(changetTime  > decodeait  ) return true
    return false
    

}


const User = mongoose.model('User', userSchema)


module.exports = User