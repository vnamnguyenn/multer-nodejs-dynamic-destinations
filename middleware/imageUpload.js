const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')

const uploadEndpoint = process.env.BLOB_CONTAINER_URL || path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const today = new Date();
        let { clinicFolder, subFolder } = req.query;
        clinicFolder = uploadEndpoint + '/' + clinicFolder;
        subFolder = clinicFolder + '/' + subFolder;
        const yearFolder = subFolder + '/' + today.toLocaleDateString('vi-VN', { year: "numeric" });
        const monthFolder = yearFolder + '/' + today.toLocaleDateString('vi-VN', { month: "2-digit" });

        if (Object.keys(req.query).length === 2 && !fs.existsSync(clinicFolder)) {
            fs.mkdirSync(clinicFolder)
        }

        if (Object.keys(req.query).length === 2 && !fs.existsSync(subFolder)) {
            fs.mkdirSync(subFolder)
        }

        if (Object.keys(req.query).length === 2 && !fs.existsSync(yearFolder)) {
            fs.mkdirSync(yearFolder)
        }

        if (Object.keys(req.query).length === 2 && !fs.existsSync(monthFolder)) {
            fs.mkdirSync(monthFolder)
        }

        if (Object.keys(req.query).length === 2) {
            cb(null, monthFolder);
        }
        else {
            cb(new Error(`'clinicFolder' or 'subFolder' params is missing`));
        }
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })
module.exports = upload