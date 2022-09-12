const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

class imageUpload {

    constructor(directory) {
        this.directory = directory;
    }

    async save(files) {
        const name = uuidv4();
        const extension = path.extname(files.originalname);
        const filename = name + extension;
        const url = path.resolve(`${this.directory}/${filename}`)

        const image = {
            name: name,
            extension: extension,
            filename: filename,
            url: url,
            date: new Date()
        }

        await sharp(files.buffer).toFile(url);

        return image;
    }

    checkExistFolder(directory) {
        try {
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)
                console.log('folder not exist')
            }
        } catch (error) {
            console.log('error', error)
            return false;
        }
    }
}
module.exports = imageUpload