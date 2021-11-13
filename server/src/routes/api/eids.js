import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Eid, { validateEid } from '../../models/Eid.js';

const router = Router();

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    const eids = await Eid.find().sort({ createdAt: 'desc' });

    res.json({ eids });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/:id', requireJwtAuth, async (req, res) => {
  try {
    const eid = await Eid.findById(req.params.id);
    if (!eid) return res.status(404).json({ message: 'No message found.' });
    res.json({ eid: eid.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateEid(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let eid = await Eid.create({
      eid: req.body.eid,
    });

    res.status(200).json({ eid: eid.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

// router.delete('/:id', requireJwtAuth, async (req, res) => {
//   try {
//     const tempMessage = await Eid.findById(req.params.id).populate('user');
//     if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
//       return res.status(400).json({ message: 'Not the message owner or admin.' });

//     const message = await Eid.findByIdAndRemove(req.params.id).populate('user');
//     if (!message) return res.status(404).json({ message: 'No message found.' });
//     res.status(200).json({ message });
//   } catch (err) {
//     res.status(500).json({ message: 'Хатолик юз берди!' });
//   }
// });

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateEid(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {

    let eid = await Eid.findByIdAndUpdate(
      req.params.id,
      { eid: req.body.eid },
      { new: true },
    );
    if (!eid) return res.status(404).json({ message: 'No message found.' });

    res.status(200).json({ eid });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
