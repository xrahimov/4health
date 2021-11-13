import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Appointment from '../../models/Appointment.js';
import { groupServices } from '../../utils/utils.js';

const router = Router();

router.get('/', async (req, res) => {
  const order = req.query.order ? req.query.order : 'desc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const skip = parseInt(req.query.skip);
  const isfinished = req.query.isfinished;
  const term = req.query.searchTerm;
  const appointmenttype = req.query.appointmenttype;

  if (term !== 'undefined' && term !== '') {
    try {
      const appointments = await Appointment.aggregate([
        {
          $search: {
            autocomplete: {
              query: term,
              path: 'searchfield',
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        },
        {
          $match: {
            $and: [
              { isfinished: isfinished !== 'false' },
              { isdeleted: false },
              { appointmenttype: { $in: appointmenttype.split(',') } },
            ],
          },
        },
        {
          $limit: 30,
        },
        { $sort: { isdeleted: 1 } },
      ]);

      res.json({ appointments, postSize: appointments.length });
    } catch (error) {
      res.status(500).json({ message: 'Хатолик юз берди!' });
    }
  } else {
    Appointment.find({
      isdeleted: false,
      isfinished: isfinished !== 'false',
      appointmenttype: { $in: appointmenttype.split(',') },
    })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, appointments) => {
        if (err) return res.status(500).json({ message: 'Хатолик юз берди!' });
        res.json({ appointments, postSize: appointments.length });
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, isdeleted: false });
    if (!appointment) return res.status(404).json({ message: 'No labresults found.' });

    res.json({ appointment, services: groupServices(appointment) });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const io = req.app.get('socketio');

  Appointment.create({
    patient: req.body.patient,
    patientname: req.body.patientname,
    services: req.body.services,
    uzidoctor: req.body.uzidoctor,
    price: req.body.price,
    searchfield: req.body.searchfield,
    uzis: req.body.uzis,
    appointmenttype: req.body.appointmenttype,
  })
    .then((appointment) => {
      if (appointment.appointmenttype[0] === 'lab') {
        io.emit('new-labappointment', appointment);
      } else {
        io.emit('new-uziappointment', appointment);
      }
      res.status(200).json({ appointment });
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ message: 'Хатолик юз берди!' });
    });
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { isdeleted: true, searchfield: '' },
      { new: true },
    );
    if (!appointment) return res.status(404).json({ message: 'No appointment found.' });

    res.status(200).json({ appointment });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, (req, res) => {
  // const { error } = validateAppointment(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  const io = req.app.get('socketio');

  Appointment.findByIdAndUpdate(
    req.params.id,
    {
      patient: req.body.patient,
      services: req.body.services,
      uzidoctor: req.body.uzidoctor,
      price: req.body.price,
      isfinished: req.body.isfinished,
      searchfield: req.body.searchfield,
      uzis: req.body.uzis,
    },
    { new: true },
  )
    .then((appointment) => {
      !appointment.isdeleted && io.emit('finished-appointment', appointment);

      if (!appointment) return res.status(404).json({ message: 'No appointment found.' });

      res.status(200).json({ appointment });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Хатолик юз берди!' });
    });
});

export default router;
