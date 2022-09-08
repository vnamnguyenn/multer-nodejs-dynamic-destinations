const express = require('express');
const app = express();
const router = express.Router();
const upload = require('./uploadMiddleware')
const Resize = require('./resize')
const path = require('path');
router.get('/', async function (req, res) {
    await res.render('index');
});

router.post('/create', upload.single('image'), async function (req, res) {
    // folder upload
    const imagePath = path.join(__dirname, '/public/images');
    // call class Resize
    const fileUpload = new Resize(imagePath);
    console.log(req.file)
    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' });
    }
    const filename = await fileUpload.save(req.file.buffer);

    return res.status(200).json({ name: filename });
});

module.exports = router;