const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { upload, Resize } = require('./uploadMiddleware');


router.get('/', function (req, res) {
    return res.render('index');
})

router.post('/create', upload.single('uploadImages'), async function (req, res) {
    const imagePath = path.join(__dirname, '/public/images');
    // call class Resize
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        return res.status(401).json({ error: 'chưa có tệp tin nào được chọn, vui lòng thử lại' });
    }

    console.log(req.file)

    const data = await fileUpload.save(req.file.buffer, req.file.originalname);
    return res.status(200).json(data);
});

module.exports = router;