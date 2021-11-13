import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Service, { validateService } from '../../models/Service.js';

const router = Router();

router.get('/', async (req, res) => {
  const order = req.query.order ? req.query.order : 'desc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const skip = parseInt(req.query.skip);
  const term = req.query.searchTerm;

  if (term !== 'undefined' && term !== '') {
    try {
      const services = await Service.aggregate([
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

      res.json({ services, postSize: services.length });
    } catch (error) {
      res.status(500).json({ message: 'Хатолик юз берди!' });
    }
  } else {
    Service.find({ isdeleted: false })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, services) => {
        if (err) return res.status(500).json({ message: 'Хатолик юз берди!' });
        res.json({ services, postSize: services.length });
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'No services found.' });

    res.json({ service });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/servicetype/:id', async (req, res) => {
  try {
    const services = await Service.find({ 'servicetype._id': req.params.id });

    if (!services) return res.status(404).json({ message: 'No services found.' });

    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateService(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const service = await Service.create({
      title: req.body.title,
      price: req.body.price,
      servicetype: req.body.servicetype,
      norm: req.body.norm ? req.body.norm : '',
      edizm: req.body.edizm ? req.body.edizm : '',
    });

    res.status(200).json({ service });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    let service = await Service.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!service) return res.status(404).json({ message: 'No service found.' });
    service = await service.populate('servicetype').execPopulate();

    res.status(200).json({ service });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateService(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        price: req.body.price,
        servicetype: req.body.servicetype,
        norm: req.body.norm,
        edizm: req.body.edizm,
      },
      { new: true },
    );
    if (!service) return res.status(404).json({ message: 'No service found.' });
    service = await service.populate('servicetype').execPopulate();

    res.status(200).json({ service });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
