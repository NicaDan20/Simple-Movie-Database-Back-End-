const multer = require('multer')

function initStorage (upload_dest, format) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, upload_dest)
        },
        filename: (req, file, cb) => {
            cb(null, format + file.originalname)
        }
    })
    return storage
}

function initUpload(storage, file_filter, limits) {
    const upload = multer({
        storage: storage,
        fileFilter: file_filter,
        limits: limits
    })
    return upload
}

module.exports = {initStorage, initUpload}