const express = require('express');
const uploadRouter = express.Router();
const upload = require('../middleware/imageUpload');

uploadRouter.post('/singleFile', upload.single('image'), (req, res) => {
    const file = req.file;
    const { clinicFolder, subFolder } = req.query;

    if (file && clinicFolder && subFolder) {
        return res.send({
            status_code: 200,
            success: {
                message: "Image uploaded",
                code: 200
            }, image: req.file
        });
    }

    return res.status(400).json({
        status_code: 400,
        error: {
            message: "No file chosen or Name attribute is missing",
            code: 400
        }
    });

});

uploadRouter.post('/multipleFiles', upload.array('images'), (req, res) => {
    const files = req.files;
    const { clinicFolder, subFolder } = req.query;
    if (files && files.length !== 0) {
        return res.send({
            status_code: 200,
            success: {
                message: "Images uploaded",
                code: 200
            }, images: req.files
        });
    }

    return res.status(400).json({
        status_code: 400,
        error: {
            message: "No file chosen or Name attribute is missing",
            code: 400
        }
    });
});

module.exports = uploadRouter;