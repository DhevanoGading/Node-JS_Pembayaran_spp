const {verify} = require('jsonwebtoken')
const secret = '@!@#$%^&*&^%$#@'

module.exports = {
    tokenAdmin: (req,res,next) => {
        let token = req.get("authorization");

        if(token){
            let wow = token.slice(7)
            verify(wow, secret, (err,decode) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Login first",
                        err
                    })
                }else{
                    let user = decode.result
                    next()
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access denied : unauthorized user"
            })
        }
    }
}