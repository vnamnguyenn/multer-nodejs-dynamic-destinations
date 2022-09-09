const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');

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
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer, ext, reSize) {
        const filename = `${uuidv4()}.png`;
        const filepath = path.resolve(`${this.folder}/${filename}`)
        const file = {
            filename: filename,
            filepath: filepath
        }

        await sharp(buffer).resize(400, 400, { fit: sharp.fit.inside, withoutEnlargement: true }).toFile(filepath);

        return file;
    }

}
module.exports = { upload, Resize }