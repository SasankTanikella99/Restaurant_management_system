const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic
    try {
        consol.log("Received authentication", username, password)
        const user = await person.find({username, password})
        if(!user){
            return done(null, false, {message: "Authentication failed"})
        }
        const isPassword = await user.comparePassword(password)
        if(isPassword){
            return done(null, user)
        }else{
            return done(null, false, {message: "Authentication failed"});
        }
    } catch (error) {
        return done(error)
    }
}));

module.exports = passport