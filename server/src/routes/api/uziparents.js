import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import UziParent, { validateUziParent } from '../../models/UziParent.js';

const router = Router();

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const skip = parseInt(req.query.skip);
    const condition = req.query.vrach ? { isdeleted: false, vrach: req.query.vrach } : { isdeleted: false };

    UziParent.find(condition)
      .sort([['_id', 'desc']])
      .skip(skip)
      .limit(limit)
      .populate('uzichilds')
      .populate('vrach')
      .exec((err, uziParents) => {
        if (err) return res.status(500).json({ message: 'Хатолик юз берди!' });

        res.json({ uziParents, postSize: uziParents.length });
      });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/:id', requireJwtAuth, async (req, res) => {
  try {
    const uziparent = await UziParent.findById(req.params.id).populate('vrach');

    if (!uziparent) return res.status(404).json({ message: 'No uziParents found.' });

    res.json({ uziparent });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateUziParent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let uziparent = await UziParent.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      uzichilds: [],
      vrach: req.body.vrach,
    });

    res.status(200).json({ uziparent });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const uziparent = await UziParent.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!uziparent) return res.status(404).json({ message: 'No message found.' });
    res.status(200).json({ uziparent });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateUziParent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const uziparent = await UziParent.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        vrach: req.body.vrach,
      },
      { new: true },
    );
    if (!uziparent) return res.status(404).json({ message: 'No uziparent found.' });

    res.status(200).json({ uziparent });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
