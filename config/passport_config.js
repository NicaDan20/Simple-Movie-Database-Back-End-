const LocalStrategy = require('passport-local').Strategy
const {UserAuthentication, UserProfile} = require('../models')

const bcrypt = require('bcrypt')

function init (passport) {

    async function authenticateUser (email, password, cb) {
            const loggingUser = await getUserByEmail (email)
            if (loggingUser==null) {
                return cb (null, false, { message: 'No user with that email'})
            }
            if (loggingUser.isBanned) {
                return cb(null, false, {message: 'This account has been suspended.'})
            } else {
                try {
                    if (await bcrypt.compare(password, loggingUser.password)) {
                        const loggedUser = await getLoggedUser(loggingUser.id)
                        return cb(null, loggedUser)
                    } else {
                        return cb(null, false, { message: 'Incorrect password '})
                    }
                } catch(err) {
                    return cb(err, { message: "Something must have happened!"})
                }    
            }
        }
    

    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, authenticateUser))

    passport.serializeUser((user, cb) => {
        process.nextTick(async function() {
            cb(null, {
                username: user.username,
                uuid: user.uuid,
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