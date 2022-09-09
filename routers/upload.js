const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { upload, Resize } = require('../utilities/imageUpload');

const uploadEndpoint = process.env.BLOB_CONTAINER_URL || path.join(__dirname, `../public/images`);

router.get('/', function (req, res) {
    return res.render('index');
})

router.post('/singleFile', upload.single('image'), async (req, res) => {
    const folder = req.body.folder || '/cms/'
    const directory = uploadEndpoint + folder;

    if (req.file) {
        const fileUpload = new Resize(directory);
        if (fileUpload.checkExistFolder(directory)) {
            let dataItem = await fileUpload.save(req.file.buffer, path.extname(req.file.originalname));
            return res.status(200).json({ status: "ok", message: "Image upload in successfully", dataItem: dataItem });
        }

        return res.status(200).json({ status: "failed", message: "Directory does not exist", });
    }

    return res.status(400).json({ status: "failed", message: "Please choose file to upload" });
});

router.post('/multipleFiles', upload.array('images'), async (req, res) => {
    const fileUpload = new Resize(directory);
    if (req.files.length !== 0) {
        let dataItem = [];
        for (let i = 0; i < req.files.length; i++) {
            dataItem.push(await fileUpload.save(req.files[i].buffer, path.extname(req.files[i].originalname)))
        }
        return res.status(200).json({ status: "ok", message: "Images upload in successfully", dataItem: dataItem });
    }

    return res.status(400).json({ status: "failed", message: "Please choose file to upload" });
});



module.exports = router;