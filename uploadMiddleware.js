const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
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
        await sharp(buffer)
            .resize(400, 400, { // size image 300x300
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return file;
    }

}
module.exports = { upload, Resize }