const CatchAsync = require('./../utils/asyncError')
const AppError = require('./../utils/appError')
const User = require('./../Models/UserModel')
const jwt  = require('jsonwebtoken')
const {promisify} = require('util');


exports.private= CatchAsync(async (req,res,next) => {
  let token ; 
  // 1) check if there is a token in req.headers
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
      // console.log(token);
      
  }
  if(!token) {
      return next(new AppError("U must login befoure get access to this path" , 401))
  }
  // 2) check if this token is valid 
  const decode = await promisify(jwt.verify)(token , process.env.TOKEN_SECRET)

  // 3) if user still existe : 
  const correntuser = await User.findById(decode.id)
  if(!correntuser) return next( new AppError('Token unvalid ' , 401))
 // if(correntuser.isPasshasChanged(decode.iat)) return next(new AppErreur('User has change the password please re-login' , 401))

  req.user = correntuser;
  next()
})


const creetoken = (id) =>{
    return jwt.sign({id } ,process.env.TOKEN_SECRET, {
        expiresIn : process.env.TOKEN_TIMER
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = creetoken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.Password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };



exports.SignUp = CatchAsync( async (req,res) => {
        const newUser = await User.create(req.body)

        createSendToken(newUser,200,res)

        
    
})

exports.signin = CatchAsync( async (req,res,next) => {
    const {email , password } = req.body


        if(!email || !password) return next()

            const issetuser = await User.findOne({Email : email}).select('+Password')

            
        if( issetuser && (await issetuser.comparepasswords(issetuser.Password , password))) {

            
            return createSendToken(issetuser,201,res)
     
        }else {
            
            return res.status(400).json({
                status : 'Email or password are incorrect'
            })           
        }
        
    }  )

