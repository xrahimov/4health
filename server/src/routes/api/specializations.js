import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Specialization, { validateSpecialization } from '../../models/Specialization.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const specializations = await Specialization.find({ isdeleted: false }).sort({ createdAt: 'desc' });

    res.json({ specializations });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) return res.status(404).json({ message: 'No specializations found.' });
    res.json({ specialization });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateSpecialization(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let specialization = await Specialization.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(200).json({ specialization });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!specialization) return res.status(404).json({ message: 'No message found.' });
    res.status(200).json({ specialization });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateSpecialization(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true },
    );
    if (!specialization) return res.status(404).json({ message: 'No specialization found.' });

    res.status(200).json({ specialization });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
