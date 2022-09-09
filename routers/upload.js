const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { upload, Resize } = require('../uploadMiddleware');


router.get('/', function (req, res) {
    return res.render('index');
})

const cpUpload = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]);

router.post('/create', cpUpload, async function (req, res, err) {
    const imagePath = path.join(__dirname, '../public/images');
    // call class Resize
    const fileUpload = new Resize(imagePath);

    if (Object.keys(req.files).length !== 0) {
        let data = [];
        if (req.files.image) {
            data.push(await fileUpload.save(req.files.image[0].buffer, req.files.image[0].originalname))
        }
        else {
            for (let i = 0; i < req.files.images.length; i++) {
                data.push(await fileUpload.save(req.files.images[i].buffer, req.files.images[i].originalname))
            }
        }
        return res.status(200).json({ status: "success", message: "Thêm ảnh thành công", data: data });
    }

    return res.status(400).json({ status: "error", message: "Vui lòng chọn ảnh tải lên" });
});



module.exports = router;