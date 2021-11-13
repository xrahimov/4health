import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import UziChild, { validateUziChild } from '../../models/UziChild.js';
import UziParent from '../../models/UziParent.js';

const router = Router();

router.get('/', async (req, res) => {
  const order = req.query.order ? req.query.order : 'desc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const skip = parseInt(req.query.skip);
  const term = req.query.searchTerm;

  if (term !== 'undefined' && term !== '') {
    try {
      const uzichilds = await UziChild.aggregate([
        {
          $search: {
            autocomplete: {
              query: term,
              path: 'title',
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        },
        {
          $limit: 30,
        },
        {
          $match: { isdeleted: false },
        },
        { $sort: { isdeleted: 1 } },
      ]);

      res.json({ uzichilds, postSize: uzichilds.length });
    } catch (error) {
      res.status(500).json({ message: 'Хатолик юз берди!' });
    }
  } else {
    UziChild.find({ isdeleted: false })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .populate('uziparent')
      .exec((err, uzichilds) => {
        if (err) return res.status(500).json({ message: 'Хатолик юз берди!' });
        res.json({ uzichilds, postSize: uzichilds.length });
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const uzichild = await UziChild.findById(req.params.id).populate('uziparent');
    if (!uzichild) return res.status(404).json({ message: 'No uzichilds found.' });

    res.json({ uzichild });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/uziparent/:id', async (req, res) => {
  try {
    const uzichilds = await UziChild.find({ uziparent: req.params.id }).populate('uziparent');

    if (!uzichilds) return res.status(404).json({ message: 'No uzichilds found.' });

    res.json({ uzichilds });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateUziChild(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let uzichild = await UziChild.create({
      title: req.body.title,
      uziparent: req.body.uziparent,
      norm: req.body.norm ? req.body.norm : '',
      edizm: req.body.edizm,
      content: req.body.content,
      uzis: req.body.uzis,
      pageloc: req.body.pageloc,
    });

    uzichild = await uzichild.populate('uziparent').execPopulate();

    await UziParent.findByIdAndUpdate(
      req.body.uziparent,
      {
        $push: { uzichilds: uzichild._id },
      },
      { new: true },
    );

    res.status(200).json({ uzichild });
  } catch (err) {
    err.code === 11000
      ? res.status(500).json({ message: 'Ушбу номли хизмат аллақачон мавжуд.' })
      : res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    let uzichild = await UziChild.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true }).populate(
      'uziparent',
    );

    if (!uzichild) return res.status(404).json({ message: 'No uzichild found.' });

    uzichild = await uzichild.populate('uziparent').execPopulate();

    res.status(200).json({ uzichild });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateUziChild(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const oldUziChild = await UziChild.findById(req.params.id);

    let uzichild = await UziChild.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        price: req.body.price,
        uziparent: req.body.uziparent,
        norm: req.body.norm,
        edizm: req.body.edizm,
        content: req.body.content,
        uzis: req.body.uzis,
        pageloc: req.body.pageloc,
      },
      { new: true },
    );

    if (!uzichild) return res.status(404).json({ message: 'No uzichild found.' });

    if (oldUziChild.uziparent != req.body.uziparent) {
      await UziParent.findByIdAndUpdate(
        req.body.uziparent,
        {
          $push: { uzichilds: uzichild._id },
        },
        { new: true },
      );
      await UziParent.findByIdAndUpdate(
        oldUziChild.uziparent,
        {
          $pull: { uzichilds: oldUziChild._id },
        },
        { new: true },
      );
    }

    uzichild = await uzichild.populate('uziparent').execPopulate();

    res.status(200).json({ uzichild });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
