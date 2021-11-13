import { Router } from 'express';
import { parser } from '../../middleware/cloudinary.config.js';

const router = Router();

router.post('/', parser.single("file"), async (req, res) => {

  try {
    res.status(200).json({ image: req.file.path });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
