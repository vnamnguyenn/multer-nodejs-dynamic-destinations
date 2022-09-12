const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const imageUpload = require('../middleware/imageUpload');
const upload = require('../utilities/imageUploader');

const uploadEndpoint = process.env.BLOB_CONTAINER_URL;

router.post('/singleFile', upload.single('image'), async (req, res) => {
    const folder = req.body.folder;
    if (req.file) {
        const fileUpload = new imageUpload(uploadEndpoint + folder);
        fileUpload.checkExistFolder(uploadEndpoint + folder)
        let dataItem = await fileUpload.save(req.file);
        return res.status(200).json({ status: "ok", message: "Image upload in successfully", dataItem: dataItem });
    }
    return res.status(400).json({ status: "failed", message: "Please choose file to upload" });
});

router.post('/multipleFiles', upload.array('images'), async (req, res) => {
    const folder = req.body.folder;
    if (req.files.length !== 0) {
        const fileUpload = new imageUpload(uploadEndpoint + folder);
        fileUpload.checkExistFolder(uploadEndpoint + folder)
        let dataItem = [];
        for (let i = 0; i < req.files.length; i++) {
            dataItem.push(await fileUpload.save(req.files[i]))
        }
        return res.status(200).json({ status: "ok", message: "Images upload in successfully", dataItem: dataItem });
    }

    return res.status(400).json({ status: "failed", message: "Please choose file to upload" });
});



module.exports = router;