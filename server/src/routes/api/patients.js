import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Patient, { validatePatient } from '../../models/Patient.js';

const router = Router();

router.get('/', async (req, res) => {
  const order = req.query.order ? req.query.order : 'desc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const skip = parseInt(req.query.skip);
  const term = req.query.searchTerm;

  if (term !== 'undefined' && term !== '') {
    try {
      const patients = await Patient.aggregate([
        {
          $search: {
            autocomplete: {
              query: term,
              path: 'firstname',
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

      res.json({ patients, postSize: patients.length });
    } catch (error) {
      res.status(500).json({ message: 'Хатолик юз берди!' });
    }
  } else {
    Patient.find({ isdeleted: false })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, patients) => {
        if (err) return res.status(500).json({ message: 'Хатолик юз берди!' });
        res.json({ patients, postSize: patients.length });
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'No patient found.' });
    patient = await patient.populate('appointments').execPopulate();

    res.json({ patient });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validatePatient(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let patient = await Patient.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      fathername: req.body.fathername,
      birthday: req.body.birthday,
      phonenumber: req.body.phonenumber,
      gender: req.body.gender,
    });

    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    let patient = await Patient.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!patient) return res.status(404).json({ message: 'No patient found.' });
    patient = await patient.populate('appointments').execPopulate();

    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validatePatient(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fathername: req.body.fathername,
        birthday: req.body.birthday,
        phonenumber: req.body.phonenumber,
        gender: req.body.gender,
        appointments: req.body.appointments,
      },
      { new: true },
    );
    if (!patient) return res.status(404).json({ message: 'No patient found.' });
    patient = await patient.populate('appointments').execPopulate();

    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
