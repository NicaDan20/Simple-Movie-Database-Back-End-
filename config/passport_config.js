const LocalStrategy = require('passport-local').Strategy
const {UserAuthentication, UserProfile} = require('../models')

function init (passport) {

    async function authenticateUser (email, password, cb) {
            const loggingUser = await getUserByEmail (email)
            if (loggingUser==null) {
                return cb (null, false, { message: 'No user with that email'})
            }
            try {
                if (password === loggingUser.password) {
                    const loggedUser = await getLoggedUser(loggingUser.id)
                    return cb(null, loggedUser)
                } else {
                    return cb(null, false, { message: 'Incorrect password '})
                }
            } catch(err) {
                return cb(err, { message: "Something must have happened!"})
            }
        }
    

    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, authenticateUser))

    passport.serializeUser((user, cb) => {
        process.nextTick(async function() {
            cb(null, {
                id: user.id
            })
        })
    })
        
    passport.deserializeUser((user, cb) => {
        process.nextTick(function() {
            return cb(null, user)
        })
    })

}

async function getUserByEmail(email) {
    let user = await UserAuthentication.findOne({
        where: {
            email: email
        }
    })
    return user    
}

async function getUserById (id) {
    let user = await UserAuthentication.findOne({
        where: {
            id: id
        }
    })
    return user    
}

async function getLoggedUser(id) {
    let user = await UserProfile.findOne({
        where: {
            authId: id
        }
    })
    return user
}

module.exports = init