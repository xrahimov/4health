import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import LabResult, { validateLabResult } from '../../models/LabResult.js';
import pdf from 'html-pdf';
import pdfTemplate from '../../utils/labresult.js';
import { pdfOptions } from '../../utils/utils.js'
import path from 'path';

const router = Router();
const __dirname = path.resolve();

router.get('/fetch-pdf', (req, res) => {
  res.status(200).sendFile(`${__dirname}/labresult.pdf`);
});

router.get('/', async (req, res) => {
  try {
    const labresults = await LabResult.find({ isdeleted: false })
      .sort({ createdAt: 'desc' })
      .populate('servicetype')
      .populate('service');

    res.json({ labresults });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const labresult = await LabResult.findOne({ _id: req.params.id, isdeleted: false })
      .populate('servicetype')
      .populate('service')
      .populate('patient');

    if (!labresult) return res.status(404).json({ message: 'No labresults found.' });

    res.json({ labresult });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateLabResult(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let labresult = await LabResult.create({
      result: req.body.result,
      patient: req.body.patient,
      servicetype: req.body.servicetype,
      service: req.body.service,
    });
    labresult = await labresult.populate('servicetype').populate('service').populate('patient').execPopulate();

    res.status(200).json({ labresult });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    let labresult = await LabResult.findByIdAndUpdate(req.params.id, { isdeleted: true }, { new: true });
    if (!labresult) return res.status(404).json({ message: 'No labresult found.' });
    labresult = await labresult.populate('servicetype').populate('service').populate('patient').execPopulate();

    res.status(200).json({ labresult });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateLabResult(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let labresult = await LabResult.findByIdAndUpdate(
      req.params.id,
      {
        result: req.body.result,
        patient: req.body.patient,
        servicetype: req.body.servicetype,
        service: req.body.service,
      },
      { new: true },
    );
    if (!labresult) return res.status(404).json({ message: 'No labresult found.' });
    labresult = await labresult.populate('servicetype').populate('service').populate('patient').execPopulate();

    res.status(200).json({ labresult });
  } catch (err) {
    res.status(500).json({ message: 'Хатолик юз берди!' });
  }
});

router.post('/create-pdf', requireJwtAuth, (req, res) => {
  pdf.create(pdfTemplate(req.body), pdfOptions()).toFile('labresult.pdf', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create pdf.' });
    }

    return res.status(200).json({ message: 'Created a new pdf.' });
  });
});

export default router;
