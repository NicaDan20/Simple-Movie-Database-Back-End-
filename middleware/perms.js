const {UserProfile, Role, Permission, Role_Permission} = require('../models')

const checkPerms = (permission) => {
    return async (req, res, next) => {
        if (req.user) {
            try {
                const user = await findUserWithPermission(req, permission)
                console.log(user.role)
                if (user.role != null) {
                    next()
                } else {
                    res.cookie("_message", "You are not allowed to perform this operation. Please ask an administrator to grant you perms.", { httpOnly: true });
                    res.redirect('back');
                }
                    } catch (err) {
                        console.log(err)
                        res.status(400).redirect('/')
            }
        } else {
            res.cookie("_message", "Please log in.", { httpOnly: true });
            res.redirect('back');
        }
    }
}

async function checkAdmin (req, res, next) {
    if (req.user) {
        try {
            const user = await findUserWithPermission(req, "CAN ACCESS ADMIN PANEL")
            if (user.role != null) {
                res.locals.ISADMIN = true
            } else {
                res.locals.ISADMIN = false
            }
            next()
        } catch (err) {
            res.locals.ISADMIN = false
            console.log(err)
            res.status(404).redirect('back')
        }
    } else {
        res.locals.ISADMIN = false
        next()
    }
}

async function findUserWithPermission (req, permission) {
    let user = await UserProfile.findOne({
        include: {
            association: 'role',
            include: {
                association: 'perms',
                where: { '$permission$': `${permission}`}
            }
        },
        where: {
            id: req.user.id
        }
    })
    return user;
}

module.exports = {checkPerms, checkAdmin}