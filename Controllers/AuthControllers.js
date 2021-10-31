const CatchAsync = require('./../utils/asyncError')
const AppError = require('./../utils/appError')
const User = require('./../Models/UserModel')
const jwt  = require('jsonwebtoken')
const {promisify} = require('util');
const crypto = require('crypto')


exports.private= CatchAsync(async (req,res,next) => {
  let token ; 

  if(req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt
  }


  if(!token) {
      return next(new AppError("U must login befoure get access to this path" , 401))
  }
  // 2) check if this token is valid 
  const decode = await promisify(jwt.verify)(token , process.env.TOKEN_SECRET)

  // 3) if user still existe : 
  const correntuser = await User.findById(decode.id)
  if(!correntuser) return next( new AppError('Token unvalid ' , 401))
  if(correntuser.isPasshasChanged(decode.iat)) return next(new AppErreur('User has change the password please re-login' , 401))

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
    // Remove password from output
    user.Password = undefined;
  
    res.status(statusCode).cookie('jwt', token, cookieOptions).json({
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


exports.forgotPassword = CatchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    console.log(resetToken);
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    console.log(resetURL);
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      // await sendEmail({
      //   email: user.email,
      //   subject: 'Your password reset token (valid for 10 min)',
      //   message
      // });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });


  exports.resetPassword = CatchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
  
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.Password = req.body.Password;
    user.ConfirmPassword = req.body.ConfirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
  });