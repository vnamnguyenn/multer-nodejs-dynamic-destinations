const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')
const uploadEndpoint = process.env.BLOB_CONTAINER_URL;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const userId = req.body.folder;
//         const directory = uploadEndpoint;
//         // console.log(userId)
//         // if (!fs.existsSync(directory)) {
//         //     fs.mkdirSync(directory, { recursive: true })
//         // }
//         cb(null, directory)
//     },
//     filename: function (req, file, cb) {
//         console.log(req.body);
//         cb(null, uuidv4() + path.extname(file.originalname));
//     },
// })

const upload = multer({
    // storage: storage
})


module.exports = upload;
