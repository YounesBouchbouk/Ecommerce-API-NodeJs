const User = require('./../Models/UserModel')


exports.SignUp =  async (req,res) => {
    try {
        const newUser = await User.create(req.body)

        res.status(200).json({
            status : "Sucussesfuly",
        })

        newUser.Password = undefined ;
        req.user = newUser;
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}

exports.Login = async (req,res) => {
    
}