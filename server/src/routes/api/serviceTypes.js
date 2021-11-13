import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import ServiceType, { validateServiceType } from '../../models/ServiceType.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 900;
    let skip = parseInt(req.query.skip);

    ServiceType.find({ isdeleted: false })
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit)
      .exec((err, servicetypes) => {
        if (err) return res.status(500).json({ message: 'Хатолик юз берди!' });

        res.json({ servicetypes, postSize: servicetypes.length });
      });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const servicetype = await ServiceType.findById(req.params.id);

    if (!servicetype) return res.status(404).json({ message: 'No servicetypes found.' });

    res.json({ servicetype });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateServiceType(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let servicetype = await ServiceType.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });

    res.status(200).json({ servicetype });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const servicetype = await ServiceType.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!servicetype) return res.status(404).json({ message: 'No message found.' });
    res.status(200).json({ servicetype });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateServiceType(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const servicetype = await ServiceType.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description, price: req.body.price },
      { new: true },
    );
    if (!servicetype) return res.status(404).json({ message: 'No servicetype found.' });

    res.status(200).json({ servicetype });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
