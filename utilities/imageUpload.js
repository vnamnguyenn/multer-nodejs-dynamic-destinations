const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024 // maximum file size
    }
    ,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg+xml") {
            cb(null, true);
        }
        else {
            cb(null, false);
            const err = new Error('Only .png, .jpg, .jpeg and .svg format allowed!');
            err.name = 'ExtensionError'
            return cb(err);
        }
    }
})

class Resize {
    constructor(directory) {
        this.directory = directory;
    }
    async save(buffer, ext, reSize) {
        const filename = uuidv4() + ext;
        const filepath = path.resolve(`${this.directory}/${filename}`)
        const file = {
            filename: filename,
            filepath: filepath
        }

        await sharp(buffer).resize(400, 400, { fit: sharp.fit.inside, withoutEnlargement: true }).toFile(filepath);

        return file;
    }
    checkExistFolder(directory) {
        try {
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)

            }
            return true;
        } catch (error) {
            console.log("An error occurred.")
            return false;
        }
    }

}
module.exports = { upload, Resize }