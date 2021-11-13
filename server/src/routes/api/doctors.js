import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Doctor, { validateDoctor } from '../../models/Doctor.js';
import Eid from '../../models/Eid.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isdeleted: false }).sort({ createdAt: 'desc' })
      // .populate('appointments')
      // .populate('servicetypes');

    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'No doctor found.' });
    // doctor = await doctor.populate('appointments').populate('servicetypes').execPopulate();

    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateDoctor(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const eid = await Eid.findOne()

  await Eid.findByIdAndUpdate(eid._id, { eid: eid.eid + 1 })

  try {
    let doctor = await Doctor.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      eid: eid.eid + 1,
      fathername: req.body.fathername,
      birthday: req.body.birthday,
      image: req.body.image,
      phonenumber: req.body.phonenumber,
      gender: req.body.gender,
      servicetypes: req.body.servicetypes,
    });

    res.status(200).json({ doctor });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    let doctor = await Doctor.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!doctor) return res.status(404).json({ message: 'No doctor found.' });
    // doctor = await doctor.populate('appointments').populate('servicetypes').execPopulate();

    res.status(200).json({ doctor });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateDoctor(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {

    let doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fathername: req.body.fathername,
        birthday: req.body.birthday,
        phonenumber: req.body.phonenumber,
        gender: req.body.gender,
        appointments: req.body.appointments,
        servicetypes: req.body.servicetypes,
      },
      { new: true },
    );
    if (!doctor) return res.status(404).json({ message: 'No doctor found.' });

    res.status(200).json({ doctor });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

export default router;
