const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { admin, JwtSecretKey } = require('../utils/db')

module.exports = function(passport) {
    passport.use(
        'jwt',
        new JwtStrategy({
            secretOrKey: JwtSecretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }, async function(jwt_payload, cb){
            console.log('jwt cb')
            const user = await admin.findOne({email: jwt_payload.email})

            if(!user){
                return cb(err, false)
            }
            if(user){
                console.log('emp: ', user)
                return cb(null, user)
            }
            else{
                return cb(null, false)
            }
        })
    )
}